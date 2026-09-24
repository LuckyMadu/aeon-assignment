import { TransactionsApiResponse } from '../types/transaction';

/**
 * Mock transaction dataset simulating AEON Bank core banking API response.
 * Features incoming credits (salary, bonuses, profit sharing) and outgoing debits
 * (invoices, refunds, utility bills, DuitNow transfers).
 */
export const MOCK_TRANSACTIONS_RESPONSE: TransactionsApiResponse = {
  data: [
    // Inflow: Salary credit
    {
      refId: '123ABC',
      transferDate: '2024-10-15T12:34:56Z',
      recipientName: 'John Doe',
      transferName: 'Salary Payment',
      amount: 1500.0,
    },
    // Inflow: Invoice settlement
    {
      refId: '456DEF',
      transferDate: '2024-09-21T09:12:45Z',
      recipientName: 'Jane Smith',
      transferName: 'Invoice Payment',
      amount: 2300.75,
    },
    // Outflow: Merchant refund adjustment (negative amount)
    {
      refId: '789GHI',
      transferDate: '2024-10-05T16:18:30Z',
      recipientName: 'Robert Brown',
      transferName: 'Refund',
      amount: -500.0,
    },
    // Inflow: Performance bonus
    {
      refId: '101JKL',
      transferDate: '2024-08-30T11:47:22Z',
      recipientName: 'Emily Davis',
      transferName: 'Bonus Payment',
      amount: 1200.0,
    },
    // Inflow: Fixed deposit profit sharing
    {
      refId: '202MNO',
      transferDate: '2024-10-20T08:15:00Z',
      recipientName: 'AEON Bank Berhad',
      transferName: 'Fixed Deposit Profit',
      amount: 350.5,
    },
    // Outflow: Utility payment
    {
      refId: '303PQR',
      transferDate: '2024-10-18T14:22:10Z',
      recipientName: 'Tenaga Nasional Berhad',
      transferName: 'Utility Bill Payment',
      amount: -185.6,
    },
    // Outflow: DuitNow peer-to-peer transfer
    {
      refId: '404STU',
      transferDate: '2024-09-15T10:05:40Z',
      recipientName: 'Ahmad Razak',
      transferName: 'DuitNow Transfer Out',
      amount: -250.0,
    },
    // Outflow: Retail POS purchase
    {
      refId: '505VWX',
      transferDate: '2024-08-14T17:40:15Z',
      recipientName: 'AEON BiG Hypermarket',
      transferName: 'Debit Card Purchase',
      amount: -89.9,
    },
  ],
};
