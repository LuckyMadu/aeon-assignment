import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionDetailScreenProps } from '../../types/navigation';
import { Text } from '../../design-system/ui/Text';
import { Button } from '../../design-system/ui/Button';
import { TopAppBar } from '../../components/TopAppBar';
import { ReceiptHero } from './components/ReceiptHero';
import { DetailItem } from './components/DetailItem';
import { formatCurrency } from '../../utils/currencyFormatter';
import { formatDisplayDateTime } from '../../utils/dateFormatter';
import { shareTransactionReceipt } from '../../utils/shareReceipt';
import { spacing } from '../../design-system/tokens/spacing';
import { styles } from './TransactionDetailScreen.styles';

export const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { transaction } = route.params;

  const [copiedRefId, setCopiedRefId] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleCopyRefId = () => {
    setCopiedRefId(true);
    setTimeout(() => {
      setCopiedRefId(false);
    }, 2500);
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareTransactionReceipt(transaction);
    } finally {
      setIsSharing(false);
    }
  };

  const formattedAmount = formatCurrency(transaction.amount, {
    includeSign: true,
  });
  const formattedDateTime = formatDisplayDateTime(transaction.transferDate);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Top App Bar with back navigation and quick share */}
      <TopAppBar
        title="Transaction Details"
        subtitle={`Ref: ${transaction.refId}`}
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            onPress={handleShare}
            style={styles.headerShareBtn}
            accessibilityRole="button"
            accessibilityLabel="Share transaction receipt"
          >
            <Text style={styles.headerShareIcon}>↗</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Receipt Styled Container */}
        <View style={styles.receiptContainer}>
          {/* Bank Watermark Header */}
          <View style={styles.bankHeader}>
            <Text variant="captionMedium" style={styles.bankTitle}>
              AEON BANK (M) BERHAD
            </Text>
            <Text variant="caption" tone="muted">
              OFFICIAL RECEIPT
            </Text>
          </View>

          {/* Receipt Hero Summary */}
          <ReceiptHero transaction={transaction} />

          {/* Detailed Breakdown Required by PDF */}
          <View style={styles.detailsList}>
            <DetailItem
              label="Reference ID"
              value={transaction.refId}
              isMonospace
              onCopy={handleCopyRefId}
              copyFeedback={copiedRefId}
            />

            <DetailItem
              label="Recipient Name"
              value={transaction.recipientName}
            />

            <DetailItem
              label="Transfer Purpose"
              value={transaction.transferName}
            />

            <DetailItem
              label="Transfer Amount"
              value={formattedAmount}
              isMonospace
              valueTone={transaction.isCredit ? 'credit' : 'debit'}
            />

            <DetailItem
              label="Date & Time (UTC to Local)"
              value={formattedDateTime}
            />

            <DetailItem
              label="Transaction Type"
              value={transaction.isCredit ? 'Credit (Money In)' : 'Debit (Money Out)'}
            />

            <DetailItem
              label="Payment Channel"
              value="AEON DuitNow Network"
            />

            <DetailItem
              label="Status"
              value="Successful"
              valueTone="credit"
            />
          </View>

          {/* Security Notice */}
          <View style={styles.securityFooter}>
            <Text variant="caption" tone="muted" style={styles.securityText}>
              🔒 This receipt is issued electronically by AEON Bank. No signature is required.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Dock */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        ]}
      >
        <Button
          title="Share Receipt"
          variant="primary"
          loading={isSharing}
          onPress={handleShare}
          style={styles.shareButton}
        />
        <Button
          title="Done"
          variant="outline"
          onPress={() => navigation.goBack()}
          style={styles.doneButton}
        />
      </View>
    </View>
  );
};
