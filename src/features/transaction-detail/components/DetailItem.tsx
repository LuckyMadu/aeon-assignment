import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../../design-system/ui/Text';
import { styles } from './DetailItem.styles';

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
