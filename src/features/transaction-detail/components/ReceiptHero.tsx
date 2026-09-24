import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Transaction } from '../../../types/transaction';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';
import { Text } from '../../../design-system/ui/Text';
import { Badge } from '../../../design-system/ui/Badge';
import { formatCurrency } from '../../../utils/currencyFormatter';

export interface ReceiptHeroProps {
  transaction: Transaction;
}

export const ReceiptHero: React.FC<ReceiptHeroProps> = ({ transaction }) => {
  const isCredit = transaction.isCredit;
  const formattedAmount = formatCurrency(transaction.amount, {
    includeSign: true,
  });

  return (
    <View style={styles.container}>
      {/* Checkmark Circle */}
      <View style={styles.statusCircle}>
        <Text style={styles.checkmarkIcon}>✓</Text>
      </View>

      <Text variant="title" style={styles.statusText}>
        {isCredit ? 'Payment Received' : 'Transfer Successful'}
      </Text>

      {/* Main Amount */}
      <Text
        variant="numericHero"
        tone={isCredit ? 'credit' : 'debit'}
        style={styles.amount}
      >
        {formattedAmount}
      </Text>

      <Text variant="bodyLarge" tone="secondary" style={styles.transferName}>
        {transaction.transferName}
      </Text>

      <Badge
        label={isCredit ? 'CREDIT / INFLOW' : 'DEBIT / OUTFLOW'}
        tone={isCredit ? 'credit' : 'debit'}
        style={styles.badge}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  statusCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.status.successBg,
    borderWidth: 2,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  checkmarkIcon: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.status.success,
  },
  statusText: {
    color: colors.text.secondary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  amount: {
    fontWeight: '800',
    fontSize: 34,
    marginBottom: spacing.xxs,
  },
  transferName: {
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  badge: {
    marginTop: spacing.xs,
  },
});
