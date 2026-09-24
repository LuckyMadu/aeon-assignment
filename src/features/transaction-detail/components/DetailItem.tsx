import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';
import { radii } from '../../../design-system/tokens/radii';
import { Text } from '../../../design-system/ui/Text';

export interface DetailItemProps {
  label: string;
  value: string;
  isMonospace?: boolean;
  onCopy?: () => void;
  copyFeedback?: boolean;
  valueTone?: 'primary' | 'credit' | 'debit' | 'brand';
}

export const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  isMonospace = false,
  onCopy,
  copyFeedback = false,
  valueTone = 'primary',
}) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" tone="muted" style={styles.label}>
        {label}
      </Text>
      <View style={styles.valueRow}>
        <Text
          variant={isMonospace ? 'numericRegular' : 'bodyMedium'}
          tone={valueTone}
          style={[styles.value, isMonospace ? styles.monospace : undefined]}
        >
          {value}
        </Text>
        {onCopy && (
          <TouchableOpacity
            onPress={onCopy}
            activeOpacity={0.7}
            style={[styles.copyButton, copyFeedback ? styles.copyButtonActive : undefined]}
            accessibilityRole="button"
            accessibilityLabel={`Copy ${label}`}
          >
            <Text
              variant="captionMedium"
              style={[styles.copyText, copyFeedback ? styles.copyTextActive : undefined]}
            >
              {copyFeedback ? '✓ Copied' : 'Copy'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xxs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontWeight: '600',
    flex: 1,
  },
  monospace: {
    fontVariant: ['tabular-nums'],
  },
  copyButton: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xxs + 2,
    borderRadius: radii.xs,
    backgroundColor: colors.bg.muted,
    marginLeft: spacing.sm,
  },
  copyButtonActive: {
    backgroundColor: colors.status.successBg,
  },
  copyText: {
    color: colors.brand.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  copyTextActive: {
    color: colors.status.success,
  },
});
