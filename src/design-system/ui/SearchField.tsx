import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';
import { Text } from './Text';

export interface SearchFieldProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  style?: ViewStyle;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search by recipient, ref ID, or type...',
  style,
  ...rest
}) => {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={[styles.container, style]}>
      {/* Search Icon glyph */}
      <View style={styles.searchIcon}>
        <Text style={styles.iconGlyph}>🔍</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        style={styles.input}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        accessibilityRole="search"
        accessibilityLabel="Search transactions"
        {...rest}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Clear search input"
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: colors.bg.surface,
    borderRadius: radii.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  iconGlyph: {
    fontSize: 14,
    color: colors.text.muted,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.bg.muted,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.text.secondary,
  },
});
