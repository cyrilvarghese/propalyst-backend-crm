'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadResponse } from '@/types/lead';
import { CriteriaSection } from './criteria-section';
import { MatchedPropertiesTable } from './matched-properties-table';
import { MarketIntelligenceSection } from './market-intelligence-section';

interface ResultsSectionProps {
  lead: LeadResponse;
  tabsOnly?: boolean;
}

/**
 * ResultsSection Component
 *
 * Displays the results after matches have been found
 * Includes:
 * - Criteria section (available criteria and missing fields)
 * - Matched Properties tab with property listings by source
 * - Market Intelligence tab with distribution charts and locality analysis
 *
 * If tabsOnly is true, only displays the tabs (Matched Properties and Market Intelligence)
 */
export function ResultsSection({ lead, tabsOnly = false }: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Criteria Section - Shows extracted criteria and missing fields */}
      {!tabsOnly && <CriteriaSection lead={lead} />}

      {/* Tabs for Matched Properties and Market Intelligence */}
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="flex flex-row gap-2 justify-start bg-muted p-1 h-auto">
          <TabsTrigger value="properties" className="px-3 py-1.5">
            <span className="text-sm">Matched Properties</span>
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="px-3 py-1.5">
            <span className="text-sm">Market Intelligence</span>
          </TabsTrigger>
        </TabsList>

        {/* Matched Properties Tab - Shows properties filtered by source */}
        <TabsContent value="properties" className="space-y-6 mt-6">
          <MatchedPropertiesTable properties={lead.matched_properties} />
        </TabsContent>

        {/* Market Intelligence Tab - Shows distribution charts and locality analysis */}
        <TabsContent value="intelligence" className="space-y-6 mt-6">
          <MarketIntelligenceSection lead={lead} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
