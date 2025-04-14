import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  SettleDebts: { groupId: string; groupName: string };
  AddExpense: undefined;
  Login: undefined;
  SignUp: undefined;
  GroupMember: undefined;
};

// Helper type for screen components
export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'SignUp'
>;


export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'Login'
>;