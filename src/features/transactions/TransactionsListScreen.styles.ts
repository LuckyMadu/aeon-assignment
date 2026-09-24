import { StyleSheet } from 'react-native';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.root,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bg.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  headerContainer: {
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bg.root,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  loadingText: {
    marginTop: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
});
