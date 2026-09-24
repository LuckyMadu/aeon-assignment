import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';
import { Text } from './Text';

export type BadgeTone = 'success' | 'credit' | 'debit' | 'neutral' | 'brand';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  tone = 'neutral',
  style,
}) => {
  return (
    <View style={[styles.base, styles[tone], style]}>
      <Text variant="captionMedium" style={styles[`text_${tone}`]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  success: {
    backgroundColor: colors.status.successBg,
  },
  credit: {
    backgroundColor: colors.financial.creditSoft,
  },
  debit: {
    backgroundColor: colors.financial.debitSoft,
  },
  neutral: {
    backgroundColor: colors.bg.muted,
  },
  brand: {
    backgroundColor: colors.brand.subtle,
  },
  text_success: {
    color: colors.status.success,
  },
  text_credit: {
    color: colors.financial.credit,
  },
  text_debit: {
    color: colors.financial.debit,
  },
  text_neutral: {
    color: colors.text.secondary,
  },
  text_brand: {
    color: colors.brand.primary,
  },
});
