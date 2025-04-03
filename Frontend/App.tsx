import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigation from './Divvy/components/BottomNavigation';
import HomeScreen from './Divvy/components/HomeScreen';
import LoginScreen from './Divvy/components/LoginScreen'; // Add this import
import SignUpScreen from './Divvy/components/SignUpScreen'; // Add this import

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>{name} Screen</Text>
  </View>
);

const GroupScreen = () => <PlaceholderScreen name="Group" />;
const AddExpenseScreen = () => <PlaceholderScreen name="Add Expense" />;
const DivvyScreen = () => <PlaceholderScreen name="Divvy" />;
const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

type TabParamList = {
  Home: undefined;
  Group: undefined;
  AddExpense: undefined;
  Divvy: undefined;
  Profile: undefined;
  Login: undefined; // Add this
  SignUp: undefined; // Add this
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabBarWrapper = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  console.log('BottomNavigation is:', typeof BottomNavigation);
  
  // Only show the tab bar for main screens, not auth screens
  if (state.routeNames[state.index] === 'Login' || state.routeNames[state.index] === 'SignUp') {
    return null;
  }
  
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

export default function App() {
  // For demo purposes, you can toggle this to switch between auth and main screens
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        id={undefined} // Include this to satisfy TypeScript
        initialRouteName={isLoggedIn ? "Home" : "Login"}
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBarWrapper {...props} />}
      >
        {/* Auth screens */}
        <Tab.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ tabBarButton: () => null }}
        />
        
        {/* Main app screens */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Group" component={GroupScreen} />
        <Tab.Screen name="AddExpense" component={AddExpenseScreen} />
        <Tab.Screen name="Divvy" component={DivvyScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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