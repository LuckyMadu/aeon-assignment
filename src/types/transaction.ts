/**
 * Transaction Domain & DTO Types matching AEON Bank BE specifications.
 */

export interface RawTransactionDto {
  refId: string;
  transferDate: string; // ISO 8601 UTC e.g. "2024-10-15T12:34:56Z"
  recipientName: string;
  transferName: string;
  amount: number; // Positive = incoming / credit, Negative = outgoing / refund / debit
}

export interface TransactionsApiResponse {
  data: RawTransactionDto[];
}

export type TransactionCategory =
  | 'salary'
  | 'invoice'
  | 'refund'
  | 'bonus'
  | 'deposit'
  | 'profit'
  | 'transfer'
  | 'other';

export type TransactionStatus = 'successful' | 'pending' | 'failed';

export interface Transaction extends RawTransactionDto {
  isCredit: boolean;
  category: TransactionCategory;
  status: TransactionStatus;
  monthYear: string; // e.g. "October 2024" for grouping
}

export type TransactionFilterType = 'ALL' | 'INCOMING' | 'OUTGOING';
