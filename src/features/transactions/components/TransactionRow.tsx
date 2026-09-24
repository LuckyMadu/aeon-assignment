import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Transaction } from '../../../types/transaction';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';
import { radii } from '../../../design-system/tokens/radii';
import { Text } from '../../../design-system/ui/Text';
import { CategoryIcon } from '../../../components/CategoryIcon';
import { formatCurrency } from '../../../utils/currencyFormatter';
import { formatDisplayDate } from '../../../utils/dateFormatter';

export interface TransactionRowProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onPress,
}) => {
  const isCredit = transaction.isCredit;
  const formattedAmount = formatCurrency(transaction.amount, {
    includeSign: true,
  });
  const formattedDate = formatDisplayDate(transaction.transferDate);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(transaction)}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={`Transaction to ${transaction.recipientName}, ${transaction.transferName}, amount ${formattedAmount}`}
    >
      {/* Category Icon */}
      <CategoryIcon
        category={transaction.category}
        isCredit={isCredit}
        size={44}
        style={styles.icon}
      />

      {/* Main Details: Recipient, Purpose, Date */}
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text
            variant="title"
            numberOfLines={1}
            style={styles.recipientName}
          >
            {transaction.recipientName}
          </Text>
        </View>

        <View style={styles.subRow}>
          <Text
            variant="caption"
            tone="secondary"
            numberOfLines={1}
            style={styles.transferName}
          >
            {transaction.transferName}
          </Text>
          <Text variant="caption" tone="muted" style={styles.dotSeparator}>
            •
          </Text>
          <Text variant="caption" tone="muted">
            {formattedDate}
          </Text>
        </View>
      </View>

      {/* Amount & Direction Indicator */}
      <View style={styles.amountContainer}>
        <Text
          variant="numericRegular"
          tone={isCredit ? 'credit' : 'debit'}
          style={styles.amountText}
        >
          {formattedAmount}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.bg.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  icon: {
    marginRight: spacing.md,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  recipientName: {
    fontWeight: '600',
    color: colors.text.primary,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferName: {
    maxWidth: 140,
  },
  dotSeparator: {
    marginHorizontal: spacing.xs,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: spacing.sm,
  },
  amountText: {
    fontWeight: '700',
    fontSize: 15,
  },
  chevron: {
    fontSize: 18,
    color: colors.text.muted,
    marginLeft: spacing.xs,
    marginTop: -1,
  },
});
