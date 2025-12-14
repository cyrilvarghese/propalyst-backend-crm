'use client';

import { Badge } from '@/components/ui/badge';
import { LeadResponse } from '@/types/lead';

interface CriteriaSectionProps {
  lead: LeadResponse;
}

/**
 * CriteriaSection Component
 *
 * Displays all extracted criteria from the lead, organized into:
 * - Available: Criteria that were successfully extracted from the requirement
 * - Missing: Criteria fields that weren't mentioned in the requirement
 */
export function CriteriaSection({ lead }: CriteriaSectionProps) {
  /**
   * Extract all non-null criteria from property, proximity, and user_journey
   */
  const getAvailableCriteria = () => {
    const prop = lead.extracted_criteria.property;
    const proximity = lead.extracted_criteria.proximity;
    const userJourney = lead.extracted_criteria.user_journey;
    const criteria: Array<{ label: string; type: string }> = [];

    // Property criteria
    if (prop.bhk) criteria.push({ label: `${prop.bhk} BHK`, type: 'success' });
    if (prop.location) criteria.push({ label: prop.location, type: 'success' });
    if (prop.budget_max) criteria.push({ label: `₹${prop.budget_max}Cr`, type: 'success' });
    if (prop.budget_min) criteria.push({ label: `Min ₹${prop.budget_min}Cr`, type: 'success' });
    if (prop.area_sqft_max) criteria.push({ label: `${prop.area_sqft_max} sq.ft`, type: 'success' });
    if (prop.area_sqft_min) criteria.push({ label: `Min ${prop.area_sqft_min} sq.ft`, type: 'success' });
    if (prop.property_type) criteria.push({ label: prop.property_type, type: 'success' });
    if (prop.property_age) criteria.push({ label: `${prop.property_age} construction`, type: 'success' });
    if (prop.property_status) criteria.push({ label: prop.property_status, type: 'success' });
    if (prop.furnishing_status) criteria.push({ label: prop.furnishing_status, type: 'success' });
    if (prop.req_type) criteria.push({ label: prop.req_type, type: 'success' });

    // Proximity criteria
    if (proximity?.near_school) criteria.push({ label: 'Near School', type: 'success' });
    if (proximity?.near_airport) criteria.push({ label: 'Near Airport', type: 'success' });
    if (proximity?.near_hospital) criteria.push({ label: 'Near Hospital', type: 'success' });
    if (proximity?.near_shopping_mall) criteria.push({ label: 'Near Shopping Mall', type: 'success' });

    // User Journey criteria
    if (userJourney?.possession_timeline) criteria.push({ label: `Possession: ${userJourney.possession_timeline}`, type: 'success' });
    if (userJourney?.time_in_market) criteria.push({ label: `In Market: ${userJourney.time_in_market}`, type: 'success' });
    if (userJourney?.agents_contacted) criteria.push({ label: `${userJourney.agents_contacted} agents contacted`, type: 'success' });

    return criteria;
  };

  const availableCriteria = getAvailableCriteria();

  return (
    <div className="bg-card rounded-lg border h-full p-6">
      <h2 className="text-lg font-semibold mb-4">Criteria</h2>

      <div className="flex flex-row gap-6">
        {/* Available Criteria */}
        <div className="flex-1 w-1/2">
          <p className="text-sm text-muted-foreground mb-2">Available</p>
          <div className="flex flex-wrap gap-2">
            {availableCriteria.map((criteria, idx) => (
              <Badge key={idx} variant="secondary" className="bg-green-50 pb-1 text-green-700 border border-green-200 hover:bg-green-100">
                ✓ {criteria.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Missing Criteria */}
        {lead.missing_criteria.length > 0 && (
          <div className="flex-1 w-1/2">
            <p className="text-sm text-muted-foreground mb-2">Missing</p>
            <div className="flex flex-wrap gap-2">
              {lead.missing_criteria.map((criteria, idx) => (
                <Badge key={idx} variant="secondary" className="bg-red-50 pb-1 text-red-700 border border-red-200 hover:bg-red-100">
                  ✗ {criteria}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
