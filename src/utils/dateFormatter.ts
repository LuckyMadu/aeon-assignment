const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Formats a UTC ISO string into readable banking date: e.g. "15 Oct 2024, 08:34 PM".
 */
export function formatDisplayDateTime(isoDateString: string): string {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return isoDateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = SHORT_MONTHS[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour is 12 AM
    const formattedHours = String(hours).padStart(2, '0');

    return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
  } catch {
    return isoDateString;
  }
}

/**
 * Formats a UTC ISO string into a concise date: e.g. "15 Oct 2024".
 */
export function formatDisplayDate(isoDateString: string): string {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return isoDateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = SHORT_MONTHS[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch {
    return isoDateString;
  }
}
