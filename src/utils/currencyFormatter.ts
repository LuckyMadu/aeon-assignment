/**
 * Formats numbers into Malaysian Ringgit (MYR / RM) currency format.
 * Adheres to Bank Negara Malaysia standard banking displays.
 */

export interface FormatCurrencyOptions {
  includeSign?: boolean; // When true, prepend '+' for credit and '-' for debit
  currencyCode?: string; // Default 'RM'
}

export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {},
): string {
  const { includeSign = false, currencyCode = 'RM' } = options;

  if (isNaN(amount)) {
    return `${currencyCode} 0.00`;
  }

  const isNegative = amount < 0;
  const absoluteValue = Math.abs(amount);

  // Format with thousands separator and two decimal places
  const parts = absoluteValue.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1];

  const formattedAmount = `${currencyCode} ${integerPart}.${decimalPart}`;

  if (includeSign) {
    if (isNegative) {
      return `-${formattedAmount}`;
    }
    return `+${formattedAmount}`;
  }

  return isNegative ? `-${formattedAmount}` : formattedAmount;
}
