import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';

export type SurfaceVariant = 'card' | 'elevated' | 'outlined' | 'muted' | 'brand';

export interface SurfaceProps extends ViewProps {
  variant?: SurfaceVariant;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

export const Surface: React.FC<SurfaceProps> = ({
  variant = 'card',
  style,
  children,
  ...rest
}) => {
  return (
    <View style={[styles.base, styles[variant], style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  elevated: {
    backgroundColor: colors.bg.surface,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  muted: {
    backgroundColor: colors.bg.muted,
  },
  brand: {
    backgroundColor: colors.brand.primary,
  },
});
