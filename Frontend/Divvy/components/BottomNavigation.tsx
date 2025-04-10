import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import { Colors, DivvyColors } from '../constants/Colors';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  return (
    <View style={styles.container}>
      {/* Left navigation items */}
      <View style={styles.navigationSection}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => onTabPress('Home')}
        >
          <Image 
            source={require('../assets/icons/home.png')} 
            style={[
              styles.icon,
              activeTab === 'Home' ? { tintColor: colors.tabIconSelected } : null
            ]}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => onTabPress('Group')}
        >
          <Image 
            source={require('../assets/icons/group.png')} 
            style={[
              styles.icon,
              activeTab === 'Group' ? { tintColor: colors.tabIconSelected } : null
            ]}
          />
          <Text style={styles.navText}>Group</Text>
        </TouchableOpacity>
      </View>
      
      {/* Add expense button */}
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
        <Text style={styles.addButtonText}>
          Add{'\n'}Expense
        </Text>
      </View>
      
      {/* Right navigation items */}
      <View style={styles.navigationSection}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => onTabPress('Divvy')}
        >
          <Image 
            source={require('../assets/icons/divvy.png')} 
            style={[
              styles.icon,
              activeTab === 'Divvy' ? { tintColor: colors.tabIconSelected } : null
            ]}
          />
          <Text style={styles.navText}>Divvy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => onTabPress('Profile')}
        >
          <Image 
            source={require('../assets/icons/profile.png')} 
            style={[
              styles.icon,
              activeTab === 'Profile' ? { tintColor: colors.tabIconSelected } : null
            ]}
          />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
      paddingBottom: 20, // Reduced bottom padding
      justifyContent: 'space-between',
      alignItems: 'center', // Changed from 'flex-end' to 'center'
      height: 80, // Set a fixed height to ensure consistency
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
      marginBottom: 10, // Added bottom margin
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
      marginTop: -30, // Slightly raises the button above the nav bar
    },
    addButtonText: {
      fontSize: 11,
      textAlign: 'center',
      marginTop: 4, // Reduced top margin
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