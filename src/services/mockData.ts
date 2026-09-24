import { TransactionsApiResponse } from '../types/transaction';

/**
 * Exact mock response specified in AEON Bank Mobile Engineer Assessment PDF,
 * supplemented with realistic Islamic digital banking transactions mentioned
 * in the problem statement (fixed deposit profit, utility payment, DuitNow transfer).
 */
export const MOCK_TRANSACTIONS_RESPONSE: TransactionsApiResponse = {
  data: [
    // 1. Exact PDF prompt transaction 1
    {
      refId: '123ABC',
      transferDate: '2024-10-15T12:34:56Z',
      recipientName: 'John Doe',
      transferName: 'Salary Payment',
      amount: 1500.0,
    },
    // 2. Exact PDF prompt transaction 2
    {
      refId: '456DEF',
      transferDate: '2024-09-21T09:12:45Z',
      recipientName: 'Jane Smith',
      transferName: 'Invoice Payment',
      amount: 2300.75,
    },
    // 3. Exact PDF prompt transaction 3 (Refund - negative amount)
    {
      refId: '789GHI',
      transferDate: '2024-10-05T16:18:30Z',
      recipientName: 'Robert Brown',
      transferName: 'Refund',
      amount: -500.0,
    },
    // 4. Exact PDF prompt transaction 4
    {
      refId: '101JKL',
      transferDate: '2024-08-30T11:47:22Z',
      recipientName: 'Emily Davis',
      transferName: 'Bonus Payment',
      amount: 1200.0,
    },
    // Supplementary transactions explicitly covering:
    // "money coming in from fixed deposits, profits, transferring out, etc."
    {
      refId: '202MNO',
      transferDate: '2024-10-20T08:15:00Z',
      recipientName: 'AEON Bank Berhad',
      transferName: 'Fixed Deposit Profit',
      amount: 350.5,
    },
    {
      refId: '303PQR',
      transferDate: '2024-10-18T14:22:10Z',
      recipientName: 'Tenaga Nasional Berhad',
      transferName: 'Utility Bill Payment',
      amount: -185.6,
    },
    {
      refId: '404STU',
      transferDate: '2024-09-15T10:05:40Z',
      recipientName: 'Ahmad Razak',
      transferName: 'DuitNow Transfer Out',
      amount: -250.0,
    },
    {
      refId: '505VWX',
      transferDate: '2024-08-14T17:40:15Z',
      recipientName: 'AEON BiG Hypermarket',
      transferName: 'Debit Card Purchase',
      amount: -89.9,
    },
  ],
};
