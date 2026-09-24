import { TransactionsApiResponse } from '../types/transaction';
import { MOCK_TRANSACTIONS_RESPONSE } from './mockData';

export interface BankingApiService {
  getLatestTransactions(): Promise<TransactionsApiResponse>;
}

const NETWORK_LATENCY_MS = 400;

export const bankingApi: BankingApiService = {
  /**
   * Fetches latest incoming and outgoing transactions.
   * Simulates network round-trip time.
   */
  async getLatestTransactions(): Promise<TransactionsApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TRANSACTIONS_RESPONSE);
      }, NETWORK_LATENCY_MS);
    });
  },
};
