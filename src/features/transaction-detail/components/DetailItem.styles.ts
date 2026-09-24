import { StyleSheet } from 'react-native';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';
import { radii } from '../../../design-system/tokens/radii';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xxs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontWeight: '600',
    flex: 1,
  },
  monospace: {
    fontVariant: ['tabular-nums'],
  },
  copyButton: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xxs + 2,
    borderRadius: radii.xs,
    backgroundColor: colors.bg.muted,
    marginLeft: spacing.sm,
  },
  copyButtonActive: {
    backgroundColor: colors.status.successBg,
  },
  copyText: {
    color: colors.brand.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  copyTextActive: {
    color: colors.status.success,
  },
});
