import { formatCurrency } from '../currencyFormatter';

describe('formatCurrency', () => {
  it('formats positive numbers as Malaysian Ringgit', () => {
    expect(formatCurrency(1500)).toBe('RM 1,500.00');
    expect(formatCurrency(2300.75)).toBe('RM 2,300.75');
    expect(formatCurrency(0)).toBe('RM 0.00');
  });

  it('formats negative amounts correctly without double minuses (e.g. refunds)', () => {
    expect(formatCurrency(-500)).toBe('-RM 500.00');
    expect(formatCurrency(-89.9)).toBe('-RM 89.90');
  });

  it('handles includeSign: true for credit and debit distinction', () => {
    expect(formatCurrency(1500, { includeSign: true })).toBe('+RM 1,500.00');
    expect(formatCurrency(-500, { includeSign: true })).toBe('-RM 500.00');
  });

  it('handles large numbers with multiple comma separators', () => {
    expect(formatCurrency(1234567.89)).toBe('RM 1,234,567.89');
  });

  it('returns fallback for NaN', () => {
    expect(formatCurrency(NaN)).toBe('RM 0.00');
  });
});
