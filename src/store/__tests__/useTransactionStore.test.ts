import { useTransactionStore } from '../useTransactionStore';
import { bankingApi } from '../../services/api';

describe('useTransactionStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTransactionStore.setState({
      transactions: [],
      searchQuery: '',
      selectedFilter: 'ALL',
      isLoading: false,
      isRefreshing: false,
      error: null,
    });
  });

  it('initializes with default banking state', () => {
    const state = useTransactionStore.getState();
    expect(state.transactions).toEqual([]);
    expect(state.searchQuery).toBe('');
    expect(state.selectedFilter).toBe('ALL');
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('fetches transactions and sorts them chronologically', async () => {
    await useTransactionStore.getState().fetchTransactions();
    const state = useTransactionStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.transactions.length).toBeGreaterThan(0);

    // Verify chronological order: first item should be latest date
    const firstDate = new Date(state.transactions[0].transferDate).getTime();
    const secondDate = new Date(state.transactions[1].transferDate).getTime();
    expect(firstDate).toBeGreaterThanOrEqual(secondDate);
  });

  it('calculates total inflow and total outflow accurately', async () => {
    await useTransactionStore.getState().fetchTransactions();

    const inflow = useTransactionStore.getState().getTotalInflow();
    const outflow = useTransactionStore.getState().getTotalOutflow();
    const net = useTransactionStore.getState().getNetTotal();

    expect(inflow).toBeGreaterThan(0);
    expect(outflow).toBeGreaterThan(0);
    expect(net).toBe(inflow - outflow);
  });

  it('filters transactions by direction: INCOMING and OUTGOING', async () => {
    await useTransactionStore.getState().fetchTransactions();

    // 1. All
    useTransactionStore.getState().setSelectedFilter('ALL');
    const all = useTransactionStore.getState().getFilteredTransactions();

    // 2. Incoming (Credit only)
    useTransactionStore.getState().setSelectedFilter('INCOMING');
    const incoming = useTransactionStore.getState().getFilteredTransactions();
    expect(incoming.every((tx) => tx.isCredit)).toBe(true);

    // 3. Outgoing (Debit only)
    useTransactionStore.getState().setSelectedFilter('OUTGOING');
    const outgoing = useTransactionStore.getState().getFilteredTransactions();
    expect(outgoing.every((tx) => !tx.isCredit)).toBe(true);

    expect(incoming.length + outgoing.length).toBe(all.length);
  });

  it('filters transactions by search query (case-insensitive recipient, name, or refId)', async () => {
    await useTransactionStore.getState().fetchTransactions();

    // Search by recipient "John Doe"
    useTransactionStore.getState().setSearchQuery('john');
    let results = useTransactionStore.getState().getFilteredTransactions();
    expect(results.length).toBe(1);
    expect(results[0].recipientName).toBe('John Doe');

    // Search by refId "123ABC"
    useTransactionStore.getState().setSearchQuery('123abc');
    results = useTransactionStore.getState().getFilteredTransactions();
    expect(results.length).toBe(1);
    expect(results[0].refId).toBe('123ABC');

    // Search by purpose "refund"
    useTransactionStore.getState().setSearchQuery('refund');
    results = useTransactionStore.getState().getFilteredTransactions();
    expect(results.length).toBe(1);
    expect(results[0].transferName).toBe('Refund');
  });

  it('handles API failure gracefully with error state', async () => {
    jest.spyOn(bankingApi, 'getLatestTransactions').mockRejectedValueOnce(
      new Error('Network timeout'),
    );

    await useTransactionStore.getState().fetchTransactions();
    const state = useTransactionStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Network timeout');
  });
});
