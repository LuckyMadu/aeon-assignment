import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionDetailScreenProps } from '../../../types/navigation';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';
import { radii } from '../../../design-system/tokens/radii';
import { Text } from '../../../design-system/ui/Text';
import { Button } from '../../../design-system/ui/Button';
import { TopAppBar } from '../../../components/TopAppBar';
import { ReceiptHero } from '../components/ReceiptHero';
import { DetailItem } from '../components/DetailItem';
import { formatCurrency } from '../../../utils/currencyFormatter';
import { formatDisplayDateTime } from '../../../utils/dateFormatter';
import { shareTransactionReceipt } from '../../../utils/shareReceipt';

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

          {/* Detailed Breakdown Required by PDF:
              - referenceId
              - date
              - recipient name
              - transfer amount
              - transfer name / type
          */}
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.root,
  },
  headerShareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerShareIcon: {
    fontSize: 16,
    color: colors.brand.primary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: spacing.lg,
  },
  receiptContainer: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  bankTitle: {
    color: colors.brand.primary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  detailsList: {
    marginTop: spacing.sm,
  },
  securityFooter: {
    marginTop: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    borderStyle: 'dashed',
  },
  securityText: {
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bg.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  shareButton: {
    flex: 2,
  },
  doneButton: {
    flex: 1,
  },
});
