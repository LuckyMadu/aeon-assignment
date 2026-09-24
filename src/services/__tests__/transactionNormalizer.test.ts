import {
  deriveCategory,
  getMonthYearGroup,
  normalizeTransaction,
  normalizeAndSortTransactions,
} from '../transactionNormalizer';
import { RawTransactionDto } from '../../types/transaction';

describe('transactionNormalizer', () => {
  it('correctly derives category based on keywords', () => {
    expect(deriveCategory('Salary Payment')).toBe('salary');
    expect(deriveCategory('Consulting Invoice Payment')).toBe('invoice');
    expect(deriveCategory('Refund for return')).toBe('refund');
    expect(deriveCategory('Year End Bonus Payment')).toBe('bonus');
    expect(deriveCategory('Fixed Deposit Profit')).toBe('profit');
    expect(deriveCategory('DuitNow Transfer Out')).toBe('transfer');
    expect(deriveCategory('Unknown Transaction')).toBe('other');
  });

  it('extracts month and year group from UTC ISO string', () => {
    expect(getMonthYearGroup('2024-10-15T12:34:56Z')).toBe('October 2024');
    expect(getMonthYearGroup('2024-09-21T09:12:45Z')).toBe('September 2024');
    expect(getMonthYearGroup('2024-08-30T11:47:22Z')).toBe('August 2024');
  });

  it('normalizes single DTO into enriched domain Transaction', () => {
    const dto: RawTransactionDto = {
      refId: '789GHI',
      transferDate: '2024-10-05T16:18:30Z',
      recipientName: 'Robert Brown',
      transferName: 'Refund',
      amount: -500.0,
    };

    const normalized = normalizeTransaction(dto);

    expect(normalized.refId).toBe('789GHI');
    expect(normalized.isCredit).toBe(false);
    expect(normalized.category).toBe('refund');
    expect(normalized.status).toBe('successful');
    expect(normalized.monthYear).toBe('October 2024');
  });

  it('sorts normalized transactions newest first', () => {
    const dtos: RawTransactionDto[] = [
      {
        refId: 'OLD',
        transferDate: '2024-08-01T00:00:00Z',
        recipientName: 'A',
        transferName: 'Transfer',
        amount: 100,
      },
      {
        refId: 'NEWEST',
        transferDate: '2024-10-25T00:00:00Z',
        recipientName: 'B',
        transferName: 'Salary',
        amount: 200,
      },
      {
        refId: 'MID',
        transferDate: '2024-09-15T00:00:00Z',
        recipientName: 'C',
        transferName: 'Invoice',
        amount: 300,
      },
    ];

    const sorted = normalizeAndSortTransactions(dtos);

    expect(sorted[0].refId).toBe('NEWEST');
    expect(sorted[1].refId).toBe('MID');
    expect(sorted[2].refId).toBe('OLD');
  });
});
