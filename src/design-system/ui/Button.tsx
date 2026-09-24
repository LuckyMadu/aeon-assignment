import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'subtle';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  ...rest
}) => {
  const isInteractive = !loading && !disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={!isInteractive}
      style={[
        styles.base,
        styles[variant],
        disabled ? styles.disabled : null,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: loading }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.text.inverse : colors.brand.primary}
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            variant="title"
            style={[
              styles.textBase,
              styles[`text_${variant}`],
              disabled ? styles.textDisabled : null,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  primary: {
    backgroundColor: colors.brand.primary,
  },
  secondary: {
    backgroundColor: colors.bg.hero,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border.brand,
  },
  subtle: {
    backgroundColor: colors.brand.subtle,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: colors.bg.muted,
    borderColor: colors.border.subtle,
  },
  textBase: {
    fontSize: 15,
    fontWeight: '600',
  },
  text_primary: {
    color: colors.text.inverse,
  },
  text_secondary: {
    color: colors.text.inverse,
  },
  text_outline: {
    color: colors.brand.primary,
  },
  text_subtle: {
    color: colors.brand.primary,
  },
  textDisabled: {
    color: colors.text.muted,
  },
});
