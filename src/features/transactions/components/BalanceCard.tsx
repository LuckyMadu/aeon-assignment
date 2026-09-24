import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';
import { radii } from '../../../design-system/tokens/radii';
import { Text } from '../../../design-system/ui/Text';
import { formatCurrency } from '../../../utils/currencyFormatter';

export interface BalanceCardProps {
  totalInflow: number;
  totalOutflow: number;
  netTotal: number;
  accountNumber?: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  totalInflow,
  totalOutflow,
  netTotal,
  accountNumber = '•••• 8829',
}) => {
  // Base starting balance simulated for realistic digital banking view
  const baseBalance = 12450.0;
  const currentBalance = baseBalance + netTotal;

  return (
    <View style={styles.cardContainer}>
      {/* Background Gradient / Brand Styling */}
      <View style={styles.cardHeader}>
        <View style={styles.bankTag}>
          <Text variant="captionMedium" style={styles.bankTagText}>
            AEON BANK (M) BERHAD
          </Text>
        </View>
        <Text variant="captionMedium" style={styles.accountNumberText}>
          {`Savings Account-i ${accountNumber}`}
        </Text>
      </View>

      <View style={styles.balanceSection}>
        <Text variant="caption" style={styles.balanceLabel}>
          Available Balance
        </Text>
        <Text variant="numericHero" style={styles.balanceAmount}>
          {formatCurrency(currentBalance)}
        </Text>
      </View>

      {/* Inflow vs Outflow Metrics Bar */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.inflowArrow}>↓</Text>
            <Text variant="caption" style={styles.metricLabel}>
              Money In (Credits)
            </Text>
          </View>
          <Text variant="numericRegular" style={styles.inflowAmount}>
            {formatCurrency(totalInflow, { includeSign: true })}
          </Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricItem}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.outflowArrow}>↑</Text>
            <Text variant="caption" style={styles.metricLabel}>
              Money Out (Debits)
            </Text>
          </View>
          <Text variant="numericRegular" style={styles.outflowAmount}>
            {formatCurrency(-totalOutflow, { includeSign: true })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E1B4B', // Deep AEON banking indigo/slate
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bankTag: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radii.xs,
  },
  bankTagText: {
    color: colors.text.inverse,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  accountNumberText: {
    color: colors.text.inverseMuted,
    fontSize: 11,
  },
  balanceSection: {
    marginBottom: spacing.lg,
  },
  balanceLabel: {
    color: colors.text.inverseMuted,
    marginBottom: spacing.xxs,
  },
  balanceAmount: {
    color: colors.text.inverse,
    fontWeight: '800',
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  inflowArrow: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  outflowArrow: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  metricLabel: {
    color: colors.text.inverseMuted,
    fontSize: 11,
  },
  inflowAmount: {
    color: '#34D399',
    fontSize: 14,
    fontWeight: '700',
  },
  outflowAmount: {
    color: '#FCA5A5',
    fontSize: 14,
    fontWeight: '700',
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: spacing.md,
  },
});
