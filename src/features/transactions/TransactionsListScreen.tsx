import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionsListScreenProps } from '../../types/navigation';
import { Transaction } from '../../types/transaction';
import { useTransactionStore } from '../../store/useTransactionStore';
import { colors } from '../../design-system/tokens/colors';
import { Text } from '../../design-system/ui/Text';
import { SearchField } from '../../design-system/ui/SearchField';
import { TopAppBar } from '../../components/TopAppBar';
import { EmptyState } from '../../components/EmptyState';
import { ErrorBanner } from '../../components/ErrorBanner';
import { BalanceCard } from './components/BalanceCard';
import { FilterBar } from './components/FilterBar';
import { TransactionRow } from './components/TransactionRow';
import { styles } from './TransactionsListScreen.styles';

const keyExtractor = (item: Transaction) => item.refId;

export const TransactionsListScreen: React.FC<TransactionsListScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const {
    transactions,
    searchQuery,
    selectedFilter,
    isLoading,
    isRefreshing,
    error,
    fetchTransactions,
    refreshTransactions,
    setSearchQuery,
    setSelectedFilter,
    getFilteredTransactions,
    getTotalInflow,
    getTotalOutflow,
    getNetTotal,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = getFilteredTransactions();

  // Metrics for FilterBar and BalanceCard
  const totalCount = transactions.length;
  const incomingCount = useMemo(
    () => transactions.filter((t) => t.isCredit).length,
    [transactions],
  );
  const outgoingCount = useMemo(
    () => transactions.filter((t) => !t.isCredit).length,
    [transactions],
  );

  const totalInflow = getTotalInflow();
  const totalOutflow = getTotalOutflow();
  const netTotal = getNetTotal();

  const handleTransactionPress = useCallback(
    (transaction: Transaction) => {
      navigation.navigate('TransactionDetail', { transaction });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => (
      <TransactionRow
        transaction={item}
        onPress={handleTransactionPress}
      />
    ),
    [handleTransactionPress],
  );

  const renderHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        {/* Account Balance Overview Card */}
        <BalanceCard
          totalInflow={totalInflow}
          totalOutflow={totalOutflow}
          netTotal={netTotal}
        />

        {/* Filter Pills */}
        <FilterBar
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          totalCount={totalCount}
          incomingCount={incomingCount}
          outgoingCount={outgoingCount}
        />

        <View style={styles.sectionHeader}>
          <Text variant="title" style={styles.sectionTitle}>
            Latest Transactions
          </Text>
          <Text variant="caption" tone="muted">
            {`${filteredTransactions.length} recorded`}
          </Text>
        </View>
      </View>
    ),
    [
      totalInflow,
      totalOutflow,
      netTotal,
      selectedFilter,
      setSelectedFilter,
      totalCount,
      incomingCount,
      outgoingCount,
      filteredTransactions.length,
    ],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Top App Header */}
      <TopAppBar
        title="AEON Bank"
        subtitle="Islamic Digital Banking"
      />

      {/* Instant Search Bar */}
      <View style={styles.searchContainer}>
        <SearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by recipient, ref ID, or type..."
        />
      </View>

      {/* Error notification banner if any */}
      {error && (
        <ErrorBanner message={error} onRetry={fetchTransactions} />
      )}

      {/* Initial Loading Spinner */}
      {isLoading && transactions.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brand.primary} />
          <Text variant="body" tone="secondary" style={styles.loadingText}>
            Loading transactions...
          </Text>
        </View>
      ) : (
        <FlashList
          data={filteredTransactions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <EmptyState
              title={searchQuery ? 'No Results Found' : 'No Transactions'}
              message={
                searchQuery
                  ? `No transactions matching "${searchQuery}". Try a different keyword.`
                  : 'There are no transactions in this category yet.'
              }
              actionTitle={searchQuery ? 'Clear Search' : undefined}
              onAction={searchQuery ? () => setSearchQuery('') : undefined}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshTransactions}
              tintColor={colors.brand.primary}
              colors={[colors.brand.primary]}
              progressBackgroundColor={colors.bg.surface}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};
