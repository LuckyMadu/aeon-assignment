import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../design-system/ui/Text';
import { formatCurrency } from '../../../utils/currencyFormatter';
import { styles } from './BalanceCard.styles';

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
