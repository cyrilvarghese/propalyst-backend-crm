'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, Mic } from 'lucide-react';
import { formatDate } from '@/utils/date';

interface RequirementInputProps {
  value: string;
  onChange: (value: string) => void;
  onFindMatches: () => void;
  isLoading?: boolean;
  lastUpdatedAt?: string;
  createdAt?: string;
}

/**
 * RequirementInput Component
 *
 * Displays a textarea for users to enter/edit property requirements
 * with a "Find Matches" button to trigger match finding
 */

export function RequirementInput({
  value,
  onChange,
  onFindMatches,
  isLoading = false,
  lastUpdatedAt,
  createdAt,
}: RequirementInputProps) {
  const dateToShow = lastUpdatedAt || createdAt;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Requirements</h1>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold block">Property Requirement</label>
            {dateToShow && (
              <span className="text-xs text-muted-foreground">
                Last Updated - {formatDate(dateToShow)}
              </span>
            )}
          </div>
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-3 pb-10 bg-muted border rounded-lg text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
              rows={5}
              placeholder="Describe your property requirements..."
            />
            <Mic className="absolute bottom-4 right-3 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          </div>
          <Button
            onClick={onFindMatches}
            disabled={isLoading || !value || !value.trim()}
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isLoading ? 'Finding Matches...' : 'Find Matches'}
          </Button>
        </div>
      </div>
    </div>
  );
}
