import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigation from './Divvy/components/BottomNavigation'; // Make sure the path is correct

// Define placeholder screens until you create the real ones
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>{name} Screen</Text>
  </View>
);

// Create placeholder screen components
const HomeScreen = () => <PlaceholderScreen name="Home" />;
const GroupScreen = () => <PlaceholderScreen name="Group" />;
const AddExpenseScreen = () => <PlaceholderScreen name="Add Expense" />;
const DivvyScreen = () => <PlaceholderScreen name="Divvy" />;
const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

// Define the param list for tab navigator
type TabParamList = {
  Home: undefined;
  Group: undefined;
  AddExpense: undefined;
  Divvy: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Create a custom tab bar wrapper component that accepts BottomTabBarProps
const TabBarWrapper = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  return (
    <BottomNavigation
      activeTab={state.routeNames[state.index]}
      onTabPress={(tabName: string) => {
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
        id={undefined}
        tabBar={(props) => <TabBarWrapper {...props} />}
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
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