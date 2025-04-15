import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigation from './Divvy/components/BottomNavigation';
import HomeScreen from './Divvy/components/HomeScreen';
import LoginScreen from './Divvy/components/LoginScreen';
import SignUpScreen from './Divvy/components/SignUpScreen';
import GroupScreen from './Divvy/components/GroupScreen';
import SettleDebtsScreen from './Divvy/components/SettleDebtsScreen';
import ProfileScreen from './Divvy/components/ProfileScreen';
import AddExpenseScreen from './Divvy/components/AddExpenseScreen';
import groupMemberScreen from './Divvy/components/groupMemberScreen';
import { GroupProvider } from './Divvy/context/GroupContext';
import { AuthProvider, useAuth } from './Divvy/context/AuthContext';

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>{name} Screen</Text>
  </View>
);

// const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

export type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  SettleDebts: { groupId: string; groupName: string };
  groupMemberScreen: { groupName?: string };
  AddExpense: undefined;
  Login: undefined;
  SignUp: undefined;
  GroupMember: undefined;
};

type TabParamList = {
  Home: undefined;
  Group: undefined;
  AddExpense: undefined;
  Divvy: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabBarWrapper = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  
  return (
    <BottomNavigation
      activeTab={state.routeNames[state.index]}
      onTabPress={(tabName) => {
        if (state.routeNames.includes(tabName as any)) {
          navigation.navigate(tabName as any);
        }
      }}
    />
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBarWrapper {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Group" component={GroupScreen} />
      <Tab.Screen name="AddExpense" component={AddExpenseScreen} />
      <Tab.Screen name="Divvy" component={SettleDebtsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <AuthProvider>
      <GroupProvider>
        <NavigationContainer>
          <Stack.Navigator
            id={undefined}
            initialRouteName={isLoggedIn ? "MainTabs" : "Login"}
            screenOptions={{ headerShown: false }}
          >
            {/* <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>

            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="GroupDetail" component={GroupScreen} />
            <Stack.Screen name="SettleDebts" component={SettleDebtsScreen} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
            <Stack.Screen name="groupMemberScreen" component={groupMemberScreen} />


          </Stack.Navigator> 
        </NavigationContainer>
        </GroupProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});