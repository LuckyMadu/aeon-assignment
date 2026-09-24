import { StyleSheet } from 'react-native';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';
import { radii } from '../../../design-system/tokens/radii';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E1B4B', // Deep AEON banking indigo/slate
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bankTag: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radii.xs,
  },
  bankTagText: {
    color: colors.text.inverse,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  accountNumberText: {
    color: colors.text.inverseMuted,
    fontSize: 11,
  },
  balanceSection: {
    marginBottom: spacing.lg,
  },
  balanceLabel: {
    color: colors.text.inverseMuted,
    marginBottom: spacing.xxs,
  },
  balanceAmount: {
    color: colors.text.inverse,
    fontWeight: '800',
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  inflowArrow: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  outflowArrow: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  metricLabel: {
    color: colors.text.inverseMuted,
    fontSize: 11,
  },
  inflowAmount: {
    color: '#34D399',
    fontSize: 14,
    fontWeight: '700',
  },
  outflowAmount: {
    color: '#FCA5A5',
    fontSize: 14,
    fontWeight: '700',
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: spacing.md,
  },
});
