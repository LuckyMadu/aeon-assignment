import { TextStyle } from 'react-native';

export const typography = {
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  } as TextStyle,
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  } as TextStyle,
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  } as TextStyle,
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  } as TextStyle,
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  } as TextStyle,
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  } as TextStyle,
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  } as TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  } as TextStyle,
  captionMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  } as TextStyle,
  // Tabular variants for currency amounts and IDs to prevent layout shift during updates
  numericHero: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  } as TextStyle,
  numericLarge: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  } as TextStyle,
  numericRegular: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  } as TextStyle,
  code: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  } as TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
