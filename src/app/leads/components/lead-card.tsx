'use client';

import { Badge } from '@/components/ui/badge';
import { LeadResponse } from '@/types/lead';

interface LeadCardProps {
  lead: LeadResponse;
  onClick?: () => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

/**
 * LeadCard Component
 *
 * Compact card displaying key lead information with visual hierarchy
 * Shows: Budget, BHK, Location, Type, Matched Properties count, Created date
 */
export function LeadCard({ lead, onClick }: LeadCardProps) {
  const prop = lead.extracted_criteria.property;
  const reqType = prop.req_type === 'demand_buy' ? 'Buy' :
                  prop.req_type === 'demand_rent' ? 'Rent' : 'Supply';

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-lg border p-4 hover:shadow-md hover:border-primary transition-all cursor-pointer"
    >
      {/* Top Section: Budget and Type Badge */}
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            ₹{prop.budget_max || '?'}Cr
          </span>
          <span className="text-sm text-muted-foreground">
            {prop.bhk}-BHK {prop.property_type || 'Property'}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          {reqType}
        </Badge>
      </div>

      {/* Location and Area */}
      <div className="flex items-center gap-2 mb-2 text-sm">
        <span className="text-base">📍</span>
        <span className="font-medium text-primary">{prop.location}</span>
        <span className="text-muted-foreground">
          {prop.area_sqft_max ? `${prop.area_sqft_max} sq.ft` : ''}
        </span>
      </div>

      {/* Bottom Section: Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
        <div className="flex gap-4">
          <div>
            <span className="font-medium text-foreground">{lead.matched_properties.length}</span>
            <span> Matched</span>
          </div>
          <div>
            <span className="font-medium text-foreground">{formatDate(lead.created_at)}</span>
          </div>
        </div>
        {lead.missing_criteria.length > 0 && (
          <div className="text-amber-600">⚠️ {lead.missing_criteria.length}</div>
        )}
      </div>
    </div>
  );
}
