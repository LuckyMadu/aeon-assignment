import { StyleSheet } from 'react-native';
import { spacing } from '../../../design-system/tokens/spacing';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
  },
  chip: {
    marginRight: spacing.sm,
  },
});
