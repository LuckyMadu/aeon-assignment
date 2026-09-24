import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { TransactionsListScreen } from '../features/transactions';
import { TransactionDetailScreen } from '../features/transaction-detail';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="TransactionsList"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Stack.Screen
        name="TransactionsList"
        component={TransactionsListScreen}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
    </Stack.Navigator>
  );
};
