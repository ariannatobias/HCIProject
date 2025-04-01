import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigation from './Divvy/components/BottomNavigation';
import HomeScreen from './Divvy/components/HomeScreen'; // Ensure this is the correct path to your HomeScreen component

// Placeholder screens
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
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabBarWrapper = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  console.log('BottomNavigation is:', typeof BottomNavigation);
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
  return (
    <NavigationContainer>
      <Tab.Navigator
        id={undefined} // Include this to satisfy TypeScript
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBarWrapper {...props} />}
      >
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