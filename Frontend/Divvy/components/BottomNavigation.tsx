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
      <View style={styles.leftNavigation}>
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
      <View style={styles.rightNavigation}>
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
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 25,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    leftNavigation: {
      flexDirection: 'row',
      width: '30%',
      justifyContent: 'space-around',
    },
    rightNavigation: {
      flexDirection: 'row',
      width: '30%',
      justifyContent: 'space-around',
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
        position: 'absolute',
        alignItems: 'center',
        top: -30,
        left: '50%',
        transform: [{ translateX: -30 }], 
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
    },
    addButtonText: {
      fontSize: 11,
      textAlign: 'center',
      marginTop: 6,
      color: '#41E2BA',
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