import { Share, Alert, Platform } from 'react-native';
import { Transaction } from '../types/transaction';
import { formatCurrency } from './currencyFormatter';
import { formatDisplayDateTime } from './dateFormatter';

/**
 * Builds a structured, professional digital banking receipt string.
 */
export function buildReceiptShareMessage(transaction: Transaction): string {
  const formattedAmount = formatCurrency(transaction.amount, { includeSign: true });
  const formattedDate = formatDisplayDateTime(transaction.transferDate);
  const typeLabel = transaction.isCredit ? 'INCOMING (CREDIT)' : 'OUTGOING (DEBIT)';

  return [
    '====================================',
    '          AEON BANK BERHAD          ',
    '      Digital Transfer Receipt      ',
    '====================================',
    `Status: ${transaction.status.toUpperCase()}`,
    `Reference ID: ${transaction.refId}`,
    `Transfer Name: ${transaction.transferName}`,
    `Recipient / Party: ${transaction.recipientName}`,
    `Amount: ${formattedAmount}`,
    `Type: ${typeLabel}`,
    `Date & Time: ${formattedDate}`,
    '====================================',
    'Generated securely via AEON Bank Mobile App.',
  ].join('\n');
}

/**
 * Invokes native share dialog to allow users to share receipt externally
 * to WhatsApp, Telegram, Email, Notes, etc.
 */
export async function shareTransactionReceipt(
  transaction: Transaction,
): Promise<boolean> {
  try {
    const message = buildReceiptShareMessage(transaction);
    const result = await Share.share(
      {
        title: `AEON Bank Receipt - ${transaction.refId}`,
        message: message,
      },
      {
        dialogTitle: 'Share AEON Bank Receipt',
        subject: `AEON Bank Receipt: ${transaction.transferName} (${transaction.refId})`,
      },
    );

    if (result.action === Share.sharedAction) {
      return true;
    }
    return false;
  } catch (error: any) {
    if (Platform.OS !== 'test' as any) {
      Alert.alert(
        'Unable to Share',
        error?.message || 'Could not launch the sharing sheet. Please try again.',
      );
    }
    return false;
  }
}
