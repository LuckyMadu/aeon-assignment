import { Share } from 'react-native';
import {
  buildReceiptShareMessage,
  shareTransactionReceipt,
} from '../shareReceipt';
import { Transaction } from '../../types/transaction';

describe('shareReceipt', () => {
  const sampleTransaction: Transaction = {
    refId: '123ABC',
    transferDate: '2024-10-15T12:34:56Z',
    recipientName: 'John Doe',
    transferName: 'Salary Payment',
    amount: 1500.0,
    isCredit: true,
    category: 'salary',
    status: 'successful',
    monthYear: 'October 2024',
  };

  it('builds a structured receipt message with all critical banking metadata', () => {
    const message = buildReceiptShareMessage(sampleTransaction);

    expect(message).toContain('AEON BANK BERHAD');
    expect(message).toContain('Digital Transfer Receipt');
    expect(message).toContain('Reference ID: 123ABC');
    expect(message).toContain('Recipient / Party: John Doe');
    expect(message).toContain('Transfer Name: Salary Payment');
    expect(message).toContain('Amount: +RM 1,500.00');
    expect(message).toContain('Status: SUCCESSFUL');
  });

  it('calls native Share.share with formatted title and message', async () => {
    const shareMock = jest
      .spyOn(Share, 'share')
      .mockResolvedValue({ action: Share.sharedAction });

    const result = await shareTransactionReceipt(sampleTransaction);

    expect(shareMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('123ABC'),
        message: expect.stringContaining('123ABC'),
      }),
      expect.any(Object),
    );
    expect(result).toBe(true);
  });
});
