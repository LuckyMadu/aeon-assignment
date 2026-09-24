import {
  RawTransactionDto,
  Transaction,
  TransactionCategory,
} from '../types/transaction';

/**
 * Categorizes a transaction based on transfer name keywords.
 */
export function deriveCategory(transferName: string): TransactionCategory {
  const normalized = transferName.toLowerCase();
  if (normalized.includes('salary')) return 'salary';
  if (normalized.includes('invoice')) return 'invoice';
  if (normalized.includes('refund')) return 'refund';
  if (normalized.includes('bonus')) return 'bonus';
  if (normalized.includes('profit')) return 'profit';
  if (normalized.includes('deposit')) return 'deposit';
  if (normalized.includes('transfer')) return 'transfer';
  return 'other';
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Formats a UTC ISO date string into Month and Year (e.g. "October 2024")
 * for clean grouping in FlashList.
 */
export function getMonthYearGroup(isoDateString: string): string {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return 'Other';
    const month = MONTH_NAMES[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${month} ${year}`;
  } catch {
    return 'Other';
  }
}

/**
 * Normalizes a raw backend DTO into a typed client Transaction model.
 */
export function normalizeTransaction(dto: RawTransactionDto): Transaction {
  const isCredit = dto.amount >= 0;
  const category = deriveCategory(dto.transferName);
  const monthYear = getMonthYearGroup(dto.transferDate);

  return {
    ...dto,
    isCredit,
    category,
    status: 'successful',
    monthYear,
  };
}

/**
 * Normalizes an array of raw transactions and sorts them in descending
 * chronological order (latest transactions first).
 */
export function normalizeAndSortTransactions(
  dtos: RawTransactionDto[],
): Transaction[] {
  return dtos
    .map(normalizeTransaction)
    .sort(
      (a, b) =>
        new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime(),
    );
}
