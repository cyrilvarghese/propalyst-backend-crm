/**
 * Timezone utility functions for IST (GMT+5:30)
 *
 * NOTE: Server sends timestamps in GMT (UTC+0).
 * IST is GMT+5:30, so we ADD 5:30 hours (19800000 ms) to convert GMT to IST
 */

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 5:30 hours in milliseconds

/**
 * Format date to show relative time in IST (e.g., "2 days ago")
 * Compensates for server timezone offset of +5:30
 */
export function formatRelativeDate(dateString: string): string {
  try {
    // Add 5:30 hours to convert GMT to IST
    const date = new Date(new Date(dateString).getTime() + IST_OFFSET_MS);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  } catch {
    return '-';
  }
}

/**
 * Format date as MM/DD/YYYY in IST timezone
 * Compensates for server timezone offset of +5:30
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    // Add 5:30 hours to convert GMT to IST
    const date = new Date(new Date(dateString).getTime() + IST_OFFSET_MS);

    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '-';
  }
}

/**
 * Format date with time in IST timezone
 * Compensates for server timezone offset of +5:30
 */
export function formatDateWithTime(dateString: string): string {
  try {
    // Add 5:30 hours to convert GMT to IST
    const date = new Date(new Date(dateString).getTime() + IST_OFFSET_MS);

    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '-';
  }
}
