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

type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  SettleDebts: { groupId?: string, groupName?: string };
  Login: undefined;
  SignUp: undefined;
};

type SettleDebtsScreenProps = {
  route?: RouteProp<RootStackParamList, 'SettleDebts'>;
  navigation: StackNavigationProp<RootStackParamList, 'SettleDebts'>;
};

const SettleDebtsScreen: React.FC<SettleDebtsScreenProps> = ({ route, navigation }) => {
  const groupId = route?.params?.groupId || 'default-group-id';
  // const groupName = route?.params?.groupName || 'Default Group';
  const groupName = route?.params?.groupName || 'Dallas Trip Group';
  const [selectedGroup, setSelectedGroup] = useState(groupName);
  
  const debts = [
    { name: 'Josh', amount: 15.00, avatar: require('../assets/avatars/josh.png'), color: '#FFD700' },
    { name: 'Arianna', amount: 15.00, avatar: require('../assets/avatars/arianna.png'), color: '#FFDAB9' },
    { name: 'Mitchell', amount: 15.00, avatar: require('../assets/avatars/mitchell.png'), color: '#FFA07A' },
  ];
  
  const totalAmount = debts.reduce((sum, debt) => sum + debt.amount, 0);
  
  const handleBackPress = () => {
    if (route?.params?.groupId) {
      navigation.navigate('GroupDetail', { groupId });
    } else {
      navigation.goBack();
    }
  };
  
  const handleGroupSelect = () => {
    console.log('Open group selection');
  };
  
  const handleDivvyUp = () => {
    console.log('Divvy up pressed');
    alert('Debts optimized! Ready for settlement.');
  };
  
  const handlePay = (name, amount) => {
    console.log(`Pay ${amount} to ${name}`);
  };

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
      
      {/* Status Bar */}
      {Platform.OS === 'web' && (
        <View style={styles.statusBar}>
          <Text style={styles.time}>{getCurrentTime()}</Text>
          <View style={styles.statusIcons}>
                <View style={[styles.signalIcon, { marginRight: 6 }]} />
                <View style={[styles.wifiIcon, { marginRight: 6 }]} />
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
            <Text style={styles.dropdownText}>{selectedGroup?.toString() || 'Select Group'}</Text>
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
    backgroundColor: '#F7F7F9', 
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
  // statusIcons: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 6,
  // },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    maxWidth: 420, 
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
    backgroundColor: '#e0e0e0', 
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
    borderRadius: 8, 
    padding: 15,
    height: 50, 
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
    color: '#6c757d', 
  },
  amountValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  divvyButton: {
    backgroundColor: '#41E2BA', 
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
    height: 50, 
  },
  divvyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
    backgroundColor: '#41E2BA',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  payButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SettleDebtsScreen;