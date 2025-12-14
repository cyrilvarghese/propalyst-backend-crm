'use client';

import { Sparkles } from 'lucide-react';

/**
 * EmptyMatchesState Component
 *
 * Displays an empty state message when no matches have been found yet
 * Encourages user to click "Find Matches" button
 */
export function EmptyMatchesState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-card rounded-lg border">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
          <Sparkles className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-muted-foreground">No Matches Yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Click "Find Matches" above to analyze your requirement and find matching properties
        </p>
      </div>
    </div>
  );
}
