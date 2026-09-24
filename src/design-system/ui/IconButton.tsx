import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';

export interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  variant?: 'surface' | 'ghost' | 'brand';
  size?: number;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'surface',
  size = 40,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.base,
        styles[variant],
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      accessibilityRole="button"
      {...rest}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  brand: {
    backgroundColor: colors.brand.subtle,
  },
});
