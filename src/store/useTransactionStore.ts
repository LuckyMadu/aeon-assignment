import { create } from 'zustand';
import {
  Transaction,
  TransactionFilterType,
} from '../types/transaction';
import { bankingApi } from '../services/api';
import { normalizeAndSortTransactions } from '../services/transactionNormalizer';

export interface TransactionStoreState {
  // State
  transactions: Transaction[];
  searchQuery: string;
  selectedFilter: TransactionFilterType;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;

  // Actions
  fetchTransactions: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedFilter: (filter: TransactionFilterType) => void;
  getTransactionByRefId: (refId: string) => Transaction | undefined;

  // Computed / Metrics
  getFilteredTransactions: () => Transaction[];
  getTotalInflow: () => number;
  getTotalOutflow: () => number;
  getNetTotal: () => number;
}

export const useTransactionStore = create<TransactionStoreState>((set, get) => ({
  transactions: [],
  searchQuery: '',
  selectedFilter: 'ALL',
  isLoading: false,
  isRefreshing: false,
  error: null,

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await bankingApi.getLatestTransactions();
      const normalized = normalizeAndSortTransactions(response.data);
      set({ transactions: normalized, isLoading: false });
    } catch (err: any) {
      set({
        error: err?.message || 'Failed to load latest transactions. Please try again.',
        isLoading: false,
      });
    }
  },

  refreshTransactions: async () => {
    set({ isRefreshing: true, error: null });
    const startedAt = Date.now();
    try {
      const response = await bankingApi.getLatestTransactions();
      const normalized = normalizeAndSortTransactions(response.data);

      // Ensure minimum spinner display time (400ms) for smooth interaction feel
      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, 400 - elapsed);
      if (delay > 0) {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
      }

      set({ transactions: normalized, isRefreshing: false });
    } catch (err: any) {
      set({
        error: err?.message || 'Failed to refresh transactions.',
        isRefreshing: false,
      });
    }
  },

  setSearchQuery: (searchQuery: string) => {
    set({ searchQuery });
  },

  setSelectedFilter: (selectedFilter: TransactionFilterType) => {
    set({ selectedFilter });
  },

  getTransactionByRefId: (refId: string) => {
    return get().transactions.find((tx) => tx.refId === refId);
  },

  getFilteredTransactions: () => {
    const { transactions, searchQuery, selectedFilter } = get();
    const query = searchQuery.trim().toLowerCase();

    return transactions.filter((tx) => {
      // 1. Filter by transaction direction (Inflow / Outflow)
      if (selectedFilter === 'INCOMING' && !tx.isCredit) return false;
      if (selectedFilter === 'OUTGOING' && tx.isCredit) return false;

      // 2. Filter by search query (recipient name, transfer name, refId)
      if (!query) return true;
      const matchesRecipient = tx.recipientName.toLowerCase().includes(query);
      const matchesTransfer = tx.transferName.toLowerCase().includes(query);
      const matchesRefId = tx.refId.toLowerCase().includes(query);

      return matchesRecipient || matchesTransfer || matchesRefId;
    });
  },

  getTotalInflow: () => {
    return get()
      .transactions.filter((tx) => tx.isCredit)
      .reduce((sum, tx) => sum + tx.amount, 0);
  },

  getTotalOutflow: () => {
    return get()
      .transactions.filter((tx) => !tx.isCredit)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  },

  getNetTotal: () => {
    return get().transactions.reduce((sum, tx) => sum + tx.amount, 0);
  },
}));
