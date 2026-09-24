import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../design-system/tokens/colors';
import { spacing } from '../design-system/tokens/spacing';
import { Text } from '../design-system/ui/Text';
import { Button } from '../design-system/ui/Button';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Transactions Found',
  message = 'We could not find any transactions matching your search criteria or filter.',
  actionTitle,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🔍</Text>
      </View>
      <Text variant="title" style={styles.title}>
        {title}
      </Text>
      <Text variant="body" tone="secondary" style={styles.message}>
        {message}
      </Text>
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          variant="outline"
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bg.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  button: {
    height: 40,
    paddingHorizontal: spacing.xl,
  },
});
