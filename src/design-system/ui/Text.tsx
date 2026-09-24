import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { typography, TypographyVariant } from '../tokens/typography';

export type TextTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'inverseMuted'
  | 'brand'
  | 'credit'
  | 'debit';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  tone?: TextTone;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

const toneMap: Record<TextTone, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  muted: colors.text.muted,
  inverse: colors.text.inverse,
  inverseMuted: colors.text.inverseMuted,
  brand: colors.brand.primary,
  credit: colors.financial.credit,
  debit: colors.financial.debit,
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  tone = 'primary',
  style,
  children,
  ...rest
}) => {
  const baseStyle = typography[variant] || typography.body;
  const color = toneMap[tone] || colors.text.primary;

  return (
    <RNText style={[baseStyle, { color }, style]} {...rest}>
      {children}
    </RNText>
  );
};
