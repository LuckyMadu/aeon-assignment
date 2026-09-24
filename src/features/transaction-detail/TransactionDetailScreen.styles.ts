import { StyleSheet } from 'react-native';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { radii } from '../../design-system/tokens/radii';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.root,
  },
  headerShareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerShareIcon: {
    fontSize: 16,
    color: colors.brand.primary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: spacing.lg,
  },
  receiptContainer: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  bankTitle: {
    color: colors.brand.primary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  detailsList: {
    marginTop: spacing.sm,
  },
  securityFooter: {
    marginTop: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  securityText: {
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bg.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  shareButton: {
    flex: 2,
  },
  doneButton: {
    flex: 1,
  },
});
