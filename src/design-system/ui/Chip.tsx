import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';
import { Text } from './Text';

export interface ChipProps extends TouchableOpacityProps {
  label: string;
  selected?: boolean;
  count?: number;
  style?: ViewStyle | ViewStyle[];
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  count,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.base,
        selected ? styles.selected : styles.unselected,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      {...rest}
    >
      <Text
        variant="bodyMedium"
        style={selected ? styles.selectedText : styles.unselectedText}
      >
        {label}
        {count !== undefined && (
          <Text
            variant="captionMedium"
            style={selected ? styles.selectedBadgeText : styles.unselectedBadgeText}
          >
            {`  (${count})`}
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 36,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  unselected: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  selected: {
    backgroundColor: colors.brand.primary,
  },
  unselectedText: {
    color: colors.text.secondary,
    fontWeight: '500',
    fontSize: 13,
  },
  selectedText: {
    color: colors.text.inverse,
    fontWeight: '600',
    fontSize: 13,
  },
  unselectedBadgeText: {
    color: colors.text.muted,
  },
  selectedBadgeText: {
    color: colors.brand.subtle,
  },
});
