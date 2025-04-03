import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DivvyColors } from '../constants/Colors';

// Define the param list for the root stack
type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  Login: undefined;
  SignUp: undefined;
};

// Define the props for the GroupScreen component
type GroupScreenProps = {
  route: RouteProp<RootStackParamList, 'GroupDetail'>;
  navigation: StackNavigationProp<RootStackParamList, 'GroupDetail'>;
};

// Define types for our data
type Member = {
  id: number;
  name: string;
  avatar: any;
  color: string;
};

type Split = {
  name: string;
  amount: number;
  owes: boolean;
};

type Transaction = {
  id: number;
  paidBy: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  time: string;
  splits: Split[];
};

const GroupScreen: React.FC<GroupScreenProps> = ({ route, navigation }) => {
  // Get the groupId from route params
  const { groupId } = route.params;
  
  // Sample data for the group and transactions
  const groupData = {
    id: groupId,
    name: 'Dallas Trip Group',
    members: [
      { id: 1, name: 'Arianna', avatar: require('../assets/avatars/arianna.png'), color: '#FFDAB9' },
      { id: 2, name: 'Blaine', avatar: require('../assets/avatars/blaine.png'), color: '#87CEEB' },
      { id: 3, name: 'Josh', avatar: require('../assets/avatars/josh.png'), color: '#FFD700' },
      { id: 4, name: 'Nthati', avatar: require('../assets/avatars/nthati.png'), color: '#98FB98' },
      { id: 5, name: 'Mitchell', avatar: require('../assets/avatars/mitchell.png'), color: '#FFA07A' },
    ],
    currentUser: { id: 2, name: 'Blaine', avatar: require('../assets/avatars/blaine.png'), color: '#87CEEB' },
  };

  const transactions: Transaction[] = [
    {
      id: 1,
      paidBy: 'Josh',
      category: 'Uber',
      description: 'Airport Transfer',
      amount: 56.12,
      date: '07/02/2025',
      time: '19:23',
      splits: [
        { name: 'You', amount: 12.12, owes: true }
      ]
    },
    {
      id: 2,
      paidBy: 'Arianna',
      category: 'Food',
      description: 'Dinner Night 1',
      amount: 35.09,
      date: '07/02/2025',
      time: '20:50',
      splits: [
        { name: 'You', amount: 7.27, owes: true }
      ]
    },
    {
      id: 3,
      paidBy: 'You',
      category: 'Games',
      description: 'Arcade Night',
      amount: 42.00,
      date: '07/02/2025',
      time: '21:00',
      splits: [
        { name: 'Josh', amount: 21.00, owes: false },
        { name: 'Arianna', amount: 21.00, owes: false }
      ]
    }
  ];

  // Add more mock transactions to demonstrate scrolling
  const additionalTransactions: Transaction[] = [
    {
      id: 4,
      paidBy: 'Mitchell',
      category: 'Tickets',
      description: 'Museum Passes',
      amount: 89.50,
      date: '07/03/2025',
      time: '10:15',
      splits: [
        { name: 'You', amount: 17.90, owes: true }
      ]
    },
    {
      id: 5,
      paidBy: 'You',
      category: 'Drinks',
      description: 'Rooftop Bar',
      amount: 64.80,
      date: '07/03/2025',
      time: '21:45',
      splits: [
        { name: 'Josh', amount: 16.20, owes: false },
        { name: 'Mitchell', amount: 16.20, owes: false },
        { name: 'Nthati', amount: 16.20, owes: false }
      ]
    },
    {
      id: 6,
      paidBy: 'Nthati',
      category: 'Uber',
      description: 'Downtown Trip',
      amount: 28.75,
      date: '07/04/2025',
      time: '13:20',
      splits: [
        { name: 'You', amount: 5.75, owes: true }
      ]
    },
    {
      id: 7,
      paidBy: 'Blaine',
      category: 'Shopping',
      description: 'Souvenirs',
      amount: 47.36,
      date: '07/04/2025',
      time: '16:30',
      splits: [
        { name: 'Arianna', amount: 23.68, owes: false }
      ]
    }
  ];
  
  // Combine all transactions
  const allTransactions = [...transactions, ...additionalTransactions];

  // Helper function to get member by name
  const getMemberByName = (name: string): Member => {
    if (name === 'You') return groupData.currentUser;
    const member = groupData.members.find(member => member.name === name);
    return member || groupData.currentUser; // Fallback to current user if not found
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Updated Header - Simplified */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.searchIconContainer}>
              <Ionicons name="close" size={16} color="#888" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={groupData.currentUser.avatar}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Group Title */}
      <View style={styles.groupTitleContainer}>
        <Text style={styles.groupTitle}>{groupData.name}</Text>
      </View>
      
      {/* Group Members - Updated for clustered layout */}
      <View style={styles.groupMembersContainer}>
        <View style={styles.membersClusterLayout}>
          {groupData.members.map((member, index) => (
            <View 
              key={member.id} 
              style={[
                styles.memberCircleContainer,
                getClusteredPosition(index, groupData.members.length)
              ]}
            >
              <View style={[styles.memberCircle, { backgroundColor: member.color }]}>
                <Image source={member.avatar} style={styles.memberImage} />
              </View>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      
      {/* Transactions Header */}
      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.transactionsHeader}>Transactions</Text>
      </View>
      
      {/* Transactions List */}
      <ScrollView style={styles.transactionsList}>
        {allTransactions.map(transaction => {
          const payer = getMemberByName(transaction.paidBy);
          
          return (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View style={styles.payerContainer}>
                  <View style={[styles.categoryAvatarContainer, { backgroundColor: payer.color }]}>
                    <Image source={payer.avatar} style={styles.categoryAvatar} />
                  </View>
                  <View style={styles.categoryTagContainer}>
                    <Text style={styles.categoryTag}>{transaction.category}</Text>
                  </View>
                </View>
                <View style={styles.transactionAmountContainer}>
                  <Text style={styles.transactionAmount}>${transaction.amount.toFixed(2)}</Text>
                </View>
              </View>
              
              <View style={styles.transactionDetails}>
                <View style={styles.transactionDateContainer}>
                  <Text style={styles.transactionPayerText}>
                    {transaction.paidBy === 'You' ? 'You' : transaction.paidBy} paid for
                  </Text>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date}
                  </Text>
                  <Text style={styles.transactionTime}>
                    {transaction.time}
                  </Text>
                </View>
                
                <View style={styles.transactionSplitsContainer}>
                  {transaction.splits.map((split, index) => (
                    <View key={index} style={styles.splitRow}>
                      <Text style={styles.splitText}>
                        {split.owes 
                          ? `You owe ${transaction.paidBy}`
                          : `${split.name} owes you`}
                      </Text>
                      <Text style={styles.splitAmount}>
                        ${split.amount.toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

// New function for clustered layout
const getClusteredPosition = (index: number, total: number): object => {
  // For 5 members, create a tighter cluster layout
  if (total === 5) {
    switch (index) {
      case 0: return { top: 10, left: '40%' }; // Top center
      case 1: return { top: 20, left: '15%' }; // Left
      case 2: return { top: 55, left: '25%' }; // Bottom left
      case 3: return { top: 55, right: '25%' }; // Bottom right
      case 4: return { top: 20, right: '15%' }; // Right
      default: return {};
    }
  }
  
  // For other numbers of members, calculate a tighter circle
  const radius = 45; // Reduced radius for tighter clustering
  const centerX = 80; // Center X coordinate
  const centerY = 45; // Center Y coordinate
  
  const angle = (index / total) * 2 * Math.PI;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);
  
  return {
    position: 'absolute',
    left: x - 20, // Adjusted for smaller avatar size and tighter grouping
    top: y - 20, // Adjusted for smaller avatar size and tighter grouping
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    marginHorizontal: 12,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  searchIconContainer: {
    padding: 4,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  groupTitleContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  groupMembersContainer: {
    alignItems: 'center',
    marginBottom: 16, // Reduced margin for tighter layout
    position: 'relative',
  },
  membersClusterLayout: {
    width: 160, // Decreased width for tighter cluster
    height: 100, // Decreased height for tighter cluster
    position: 'relative',
  },
  memberCircleContainer: {
    position: 'absolute',
    width: 40, // Slightly smaller avatar size
    height: 40, // Slightly smaller avatar size
  },
  memberCircle: {
    width: 40, // Slightly smaller avatar size
    height: 40, // Slightly smaller avatar size
    borderRadius: 20, // Adjusted for new size
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2, // Added border
    borderColor: 'white', // White border for better separation
  },
  memberImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    right: 60,
    top: 0,
    backgroundColor: '#EEEEEE',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionsHeaderContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  transactionsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  payerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryAvatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 8,
  },
  categoryAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryTagContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTag: {
    fontSize: 12,
    color: '#555555',
  },
  transactionAmountContainer: {},
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDateContainer: {
    flex: 1,
  },
  transactionPayerText: {
    fontSize: 14,
  },
  transactionDescription: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },
  transactionDate: {
    fontSize: 12,
    color: '#777777',
  },
  transactionTime: {
    fontSize: 12,
    color: '#777777',
  },
  transactionSplitsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 4,
  },
  splitText: {
    fontSize: 14,
    marginRight: 8,
  },
  splitAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GroupScreen;