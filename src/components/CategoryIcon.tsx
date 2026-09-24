import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { TransactionCategory } from '../types/transaction';
import { colors } from '../design-system/tokens/colors';
import { radii } from '../design-system/tokens/radii';
import { Text } from '../design-system/ui/Text';

export interface CategoryIconProps {
  category: TransactionCategory;
  isCredit: boolean;
  size?: number;
  style?: ViewStyle;
}

const CATEGORY_MAP: Record<
  TransactionCategory,
  { emoji: string; bg: string; border: string }
> = {
  salary: { emoji: '💼', bg: '#ECFDF5', border: '#A7F3D0' },
  invoice: { emoji: '📄', bg: '#EFF6FF', border: '#BFDBFE' },
  refund: { emoji: '🔄', bg: '#FEF3C7', border: '#FDE68A' },
  bonus: { emoji: '🎁', bg: '#FDF2F8', border: '#FBCFE8' },
  profit: { emoji: '📈', bg: '#ECFDF5', border: '#A7F3D0' },
  deposit: { emoji: '🏦', bg: '#F5F3FF', border: '#DDD6FE' },
  transfer: { emoji: '💸', bg: '#FFF1F2', border: '#FECDD3' },
  other: { emoji: '💳', bg: '#F1F5F9', border: '#E2E8F0' },
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 44,
  style,
}) => {
  const config = CATEGORY_MAP[category] || CATEGORY_MAP.other;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: config.bg,
          borderColor: config.border,
        },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={`${category} transaction icon`}
    >
      <Text style={{ fontSize: size * 0.44 }}>{config.emoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
