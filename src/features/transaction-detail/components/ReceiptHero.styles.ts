import { StyleSheet } from 'react-native';
import { colors } from '../../../design-system/tokens/colors';
import { spacing } from '../../../design-system/tokens/spacing';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  statusCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.status.successBg,
    borderWidth: 2,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  checkmarkIcon: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.status.success,
  },
  statusText: {
    color: colors.text.secondary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  amount: {
    fontWeight: '800',
    fontSize: 34,
    marginBottom: spacing.xxs,
  },
  transferName: {
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  badge: {
    marginTop: spacing.xs,
  },
});
