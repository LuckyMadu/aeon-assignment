import { formatDisplayDate, formatDisplayDateTime } from '../dateFormatter';

describe('dateFormatter', () => {
  const mockUtcIso = '2024-10-15T12:34:56Z';

  it('formats display date correctly', () => {
    const formatted = formatDisplayDate(mockUtcIso);
    expect(formatted).toMatch(/15 Oct 2024/);
  });

  it('formats display date and time with AM/PM', () => {
    const formatted = formatDisplayDateTime(mockUtcIso);
    expect(formatted).toMatch(/15 Oct 2024/);
    expect(formatted).toMatch(/(AM|PM)/);
  });

  it('returns raw string gracefully on invalid date', () => {
    expect(formatDisplayDate('invalid-date')).toBe('invalid-date');
    expect(formatDisplayDateTime('invalid-date')).toBe('invalid-date');
  });
});
