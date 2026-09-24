import { StyleSheet } from 'react-native';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';

export const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.bg.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  icon: {
    marginRight: spacing.md,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  recipientName: {
    fontWeight: '600',
    color: colors.text.primary,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferName: {
    maxWidth: 140,
  },
  dotSeparator: {
    marginHorizontal: spacing.xs,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: spacing.sm,
  },
  amountText: {
    fontWeight: '700',
    fontSize: 15,
  },
  chevron: {
    fontSize: 18,
    color: colors.text.muted,
    marginLeft: spacing.xs,
    marginTop: -1,
  },
});
