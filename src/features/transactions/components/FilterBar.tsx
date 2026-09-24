import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TransactionFilterType } from '../../../types/transaction';
import { spacing } from '../../../design-system/tokens/spacing';
import { Chip } from '../../../design-system/ui/Chip';

export interface FilterBarProps {
  selectedFilter: TransactionFilterType;
  onSelectFilter: (filter: TransactionFilterType) => void;
  totalCount: number;
  incomingCount: number;
  outgoingCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedFilter,
  onSelectFilter,
  totalCount,
  incomingCount,
  outgoingCount,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Chip
          label="All"
          count={totalCount}
          selected={selectedFilter === 'ALL'}
          onPress={() => onSelectFilter('ALL')}
          style={styles.chip}
        />
        <Chip
          label="Money In"
          count={incomingCount}
          selected={selectedFilter === 'INCOMING'}
          onPress={() => onSelectFilter('INCOMING')}
          style={styles.chip}
        />
        <Chip
          label="Money Out"
          count={outgoingCount}
          selected={selectedFilter === 'OUTGOING'}
          onPress={() => onSelectFilter('OUTGOING')}
          style={styles.chip}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
