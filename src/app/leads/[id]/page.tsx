'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LeadResponse } from '@/types/lead';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { RequirementInput } from '../components/requirement-input';
import { EmptyMatchesState } from '../components/empty-matches-state';
import { ResultsSection } from '../components/results-section';
import { CriteriaSection } from '../components/criteria-section';
import { LeadService } from '@/services/lead.service';

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<LeadResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requirement, setRequirement] = useState('');
  const [matchesFound, setMatchesFound] = useState(false);
  const [findingMatches, setFindingMatches] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);

        // Handle "new" lead - blank state for creating new requirement
        if (leadId === 'new') {
          setLead(null); // No lead data for new requirement
          setRequirement(''); // Empty requirement input
          setMatchesFound(false); // No matches until user clicks Find Matches
          setError(null);
          return;
        }

        // Fetch lead from API
        const foundLead = await LeadService.getLead(leadId);
        setLead(foundLead);
        setRequirement(foundLead.query);
        setMatchesFound(true); // Lead data exists, so matches are already found
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch lead');
        setLead(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);

  /**
   * Handle "Find Matches" button click
   * Calls API to create a lead with the requirement and fetch matching properties
   */
  const handleFindMatches = async () => {
    if (!requirement.trim()) {
      alert('Please enter a requirement');
      return;
    }

    try {
      setFindingMatches(true);

      // Call API to create lead and find matches
      const leadData = await LeadService.createLead({ query: requirement });
      setLead(leadData);
      setMatchesFound(true);
    } catch (error) {
      console.error('Error finding matches:', error);
      alert('Failed to find matches. Please try again.');
    } finally {
      setFindingMatches(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {/* Error State */}
              {error && (
                <div className="p-4 bg-red-50 text-red-800 rounded-lg">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                </div>
              ) : lead !== undefined ? (
                <>
                  {/* Requirement Input and Criteria Section Side by Side */}
                  <div className="flex flex-row gap-6">
                    {/* Requirement Input Section - Left side */}
                    <div className="flex-1 w-1/2">
                      <RequirementInput
                        value={requirement}
                        onChange={setRequirement}
                        onFindMatches={handleFindMatches}
                        isLoading={findingMatches}
                        lastUpdatedAt={lead?.updated_at}
                        createdAt={lead?.created_at}
                      />
                    </div>

                    {/* Criteria Section - Right side */}
                    {matchesFound && lead ? (
                      <div className="flex-1 w-1/2">
                        <CriteriaSection lead={lead} />
                      </div>
                    ) : (
                      !findingMatches && <div className="flex-1" />
                    )}
                  </div>

                  {/* Matched Properties and Market Intelligence Tabs - Full width below */}
                  {matchesFound && lead ? (
                    <ResultsSection lead={lead} tabsOnly={true} />
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider >
  );
}
