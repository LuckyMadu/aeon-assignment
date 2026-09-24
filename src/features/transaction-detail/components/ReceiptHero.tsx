import React from 'react';
import { View } from 'react-native';
import { Transaction } from '../../../types/transaction';
import { Text } from '../../../design-system/ui/Text';
import { Badge } from '../../../design-system/ui/Badge';
import { formatCurrency } from '../../../utils/currencyFormatter';
import { styles } from './ReceiptHero.styles';

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
