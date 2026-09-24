import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Transaction } from '../../../types/transaction';
import { Text } from '../../../design-system/ui/Text';
import { CategoryIcon } from '../../../components/CategoryIcon';
import { formatCurrency } from '../../../utils/currencyFormatter';
import { formatDisplayDate } from '../../../utils/dateFormatter';
import { styles } from './TransactionRow.styles';

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
