import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Transaction } from './transaction';

export type RootStackParamList = {
  TransactionsList: undefined;
  TransactionDetail: { transaction: Transaction };
};

export type TransactionsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TransactionsList'
>;

export type TransactionDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TransactionDetail'
>;
