import { DefaultTheme, Theme } from '@react-navigation/native';
import { colors } from '../design-system/tokens/colors';

export const aeonNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.brand.primary,
    background: colors.bg.root,
    card: colors.bg.surface,
    text: colors.text.primary,
    border: colors.border.subtle,
    notification: colors.brand.primary,
  },
};
