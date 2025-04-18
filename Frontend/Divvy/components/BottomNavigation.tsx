import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import { Colors, DivvyColors } from '../constants/Colors';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      {/* Left navigation items */}
      <View style={styles.navigationSection}>
        <NavItem
          label="Home"
          icon={require('../assets/icons/home.png')}
          isActive={activeTab === 'Home'}
          onPress={() => onTabPress('Home')}
          selectedColor={colors.tabIconSelected}
        />
        <NavItem
          label="Group"
          icon={require('../assets/icons/group.png')}
          isActive={activeTab === 'Group'}
          onPress={() => onTabPress('Group')}
          selectedColor={colors.tabIconSelected}
        />
      </View>

      {/* Center add expense button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onTabPress('AddExpense')}
        >
          <Image
            source={require('../assets/icons/plus.png')}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
        <Text style={styles.addButtonText}>Add{'\n'}Expense</Text>
      </View>

      {/* Right navigation items */}
      <View style={styles.navigationSection}>
        <NavItem
          label="Divvy"
          icon={require('../assets/icons/divvy.png')}
          isActive={activeTab === 'Divvy'}
          onPress={() => onTabPress('Divvy')}
          selectedColor={colors.tabIconSelected}
        />
        <NavItem
          label="Profile"
          icon={require('../assets/icons/profile.png')}
          isActive={activeTab === 'Profile'}
          onPress={() => onTabPress('Profile')}
          selectedColor={colors.tabIconSelected}
        />
      </View>
    </View>
  );
};

// Reusable component for navigation items
const NavItem = ({
  label,
  icon,
  isActive,
  onPress,
  selectedColor,
}: {
  label: string;
  icon: any;
  isActive: boolean;
  onPress: () => void;
  selectedColor: string;
}) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Image
      source={icon}
      style={[
        styles.icon,
        isActive ? { tintColor: selectedColor } : null,
      ]}
    />
    <Text style={styles.navText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: DivvyColors.seasalt,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  navigationSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    height: '100%',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#687076',
  },
  addButtonContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#41E2BA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#41E2BA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    marginTop: -30,
  },
  addButtonText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    color: '#687076',
    fontWeight: '500',
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#687076',
    resizeMode: 'contain',
  },
  plusIcon: {
    width: 28,
    height: 28,
    tintColor: DivvyColors.seasalt,
    resizeMode: 'contain',
  },
});

export default BottomNavigation;
