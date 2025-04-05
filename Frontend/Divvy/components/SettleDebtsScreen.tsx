import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Define the param list for the root stack (matching your GroupScreen)
type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  SettleDebts: { groupId: string, groupName: string };
  Login: undefined;
  SignUp: undefined;
};

// Define the props for the SettleDebtsScreen component
type SettleDebtsScreenProps = {
  route: RouteProp<RootStackParamList, 'SettleDebts'>;
  navigation: StackNavigationProp<RootStackParamList, 'SettleDebts'>;
};

const SettleDebtsScreen: React.FC<SettleDebtsScreenProps> = ({ route, navigation }) => {
  // Get the groupId and groupName from route params
  const { groupId, groupName } = route.params;
  const [selectedGroup, setSelectedGroup] = useState(groupName || 'Dallas Trip Group');
  
  // Mock data for the debts - this would come from your API/state management in a real app
  // In a real implementation, you would fetch this data based on the groupId
  const debts = [
    { name: 'Josh', amount: 12.12, avatar: require('../assets/avatars/josh.png'), color: '#FFD700' },
    { name: 'Arianna', amount: 7.27, avatar: require('../assets/avatars/arianna.png'), color: '#FFDAB9' },
    { name: 'Mitchell', amount: 10.00, avatar: require('../assets/avatars/mitchell.png'), color: '#FFA07A' },
  ];
  
  // Calculate total amount due
  const totalAmount = debts.reduce((sum, debt) => sum + debt.amount, 0);
  
  // Handle back button press
  const handleBackPress = () => {
    navigation.navigate('GroupDetail', { groupId });
  };
  
  // Handle group selection
  const handleGroupSelect = () => {
    // This would open a dropdown or navigate to group selection
    console.log('Open group selection');
  };
  
  // Handle divvy up button press - this would allocate/optimize payments
  const handleDivvyUp = () => {
    console.log('Divvy up pressed');
    // This would trigger the smart allocation logic to minimize transactions
    // In a real app, this might navigate to a payment confirmation screen
    // or show an optimized payment plan modal
    
    // For demo purposes, we could show a success message or navigate to another screen
    alert('Debts optimized! Ready for settlement.');
  };
  
  // Handle individual pay button press
  const handlePay = (name, amount) => {
    console.log(`Pay ${amount} to ${name}`);
    // This would integrate with payment methods or mark as paid in your app
  };

  // Get current time for status bar
  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Status Bar - Mimicking the design from paste.txt */}
      {Platform.OS === 'web' && (
        <View style={styles.statusBar}>
          <Text style={styles.time}>{getCurrentTime()}</Text>
          <View style={styles.statusIcons}>
            <View style={styles.signalIcon} />
            <View style={styles.wifiIcon} />
            <View style={styles.batteryIcon} />
          </View>
        </View>
      )}
      
      <View style={styles.container}>
        {/* Header with back button and title */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settle Debts</Text>
          <View style={styles.backButton} /> {/* Empty view for symmetry */}
        </View>
        
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/avatars/arianna.png')}
            style={styles.avatar}
          />
        </View>
        
        {/* Main Content Card - following the auth-card style from paste.txt */}
        <View style={styles.contentCard}>
          {/* Group Selection Dropdown */}
          <TouchableOpacity style={styles.dropdownContainer} onPress={handleGroupSelect}>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selectedGroup}</Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </View>
          </TouchableOpacity>
          
          {/* Amount Due Section */}
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount Due:</Text>
            <Text style={styles.amountValue}>${totalAmount.toFixed(2)}</Text>
          </View>
          
          {/* Divvy Up Button - using the auth-button styling from paste.txt */}
          <TouchableOpacity style={styles.divvyButton} onPress={handleDivvyUp}>
            <Text style={styles.divvyButtonText}>Divvy it Up</Text>
          </TouchableOpacity>
          
          {/* Breakdown of Debts Section */}
          <View style={styles.breakdownContainer}>
            <Text style={styles.breakdownTitle}>Breakdown of Debts</Text>
            
            <ScrollView>
                              {debts.map((debt, index) => (
                <View key={index} style={styles.debtItem}>
                  <View style={styles.debtNameContainer}>
                    <View style={[styles.debtAvatar, { backgroundColor: debt.color }]}>
                      <Image source={debt.avatar} style={styles.avatarImage} />
                    </View>
                    <Text style={styles.debtName}>{debt.name}</Text>
                  </View>
                  <Text style={styles.debtAmount}>$ {debt.amount.toFixed(2)}</Text>
                  <TouchableOpacity 
                    style={styles.payButton}
                    onPress={() => handlePay(debt.name, debt.amount)}
                  >
                    <Text style={styles.payButtonText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F9', // Matching the background color from GroupScreen
  },
  statusBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    height: 44,
  },
  time: {
    fontWeight: '600',
    fontSize: 14,
  },
  statusIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalIcon: {
    backgroundColor: '#000',
    height: 11,
    width: 17,
  },
  wifiIcon: {
    backgroundColor: '#000',
    height: 11,
    width: 15,
  },
  batteryIcon: {
    backgroundColor: '#000',
    height: 11,
    width: 24,
    borderRadius: 3,
  },
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 420, // From paste.txt auth-page max-width
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0', // Placeholder color
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
    flex: 1,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8, // Matching the auth-input border-radius
    padding: 15,
    height: 50, // Matching the auth-input height
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownIcon: {
    fontSize: 16,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 20,
    marginBottom: 5,
    color: '#6c757d', // From auth-subtitle color
  },
  amountValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  divvyButton: {
    backgroundColor: '#41E2BA', // Using the primary color from paste.txt
    borderRadius: 8, // Matching auth-button border-radius
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
    height: 50, // Matching auth-button height
  },
  divvyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600', // Matching auth-button font-weight
  },
  breakdownContainer: {
    flex: 1,
  },
  breakdownTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  debtItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 15,
  },
  debtNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  debtAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  debtName: {
    fontSize: 16,
  },
  debtAmount: {
    fontSize: 16,
    marginRight: 15,
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: '#41E2BA', // Using the primary color from paste.txt
    borderRadius: 8, // Matching auth-button border-radius
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  payButtonText: {
    color: 'white',
    fontWeight: '600', // Matching auth-button font-weight
  },
});

export default SettleDebtsScreen;