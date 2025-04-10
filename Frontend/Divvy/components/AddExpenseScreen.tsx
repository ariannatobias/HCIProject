import React, { useState, useEffect } from 'react';
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
  Modal,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// Define the param list for the root stack
type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  SettleDebts: { groupId: string, groupName: string };
  Login: undefined;
  SignUp: undefined;
  AddExpense: undefined;
};

// Define the props for the AddExpenseScreen component
type AddExpenseScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddExpense'>;
  route: RouteProp<RootStackParamList, 'AddExpense'>;
};

// Define member type for split calculation
type Member = {
  id: string;
  name: string;
  amount?: number;
  percentage?: number;
};

// Define group type
type Group = {
  id: string;
  name: string;
  members: Member[];
};

// Define urgency levels
type UrgencyLevel = 'Low' | 'Medium' | 'High';

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ navigation }) => {
  // State for form inputs
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedSplitOption, setSelectedSplitOption] = useState<'Evenly' | 'Custom' | 'Percentage'>('Evenly');
  const [notes, setNotes] = useState('');
  const [showSplitOptions, setShowSplitOptions] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showUrgencyModal, setShowUrgencyModal] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('Medium');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [membersWithAmounts, setMembersWithAmounts] = useState<Member[]>([]);
  
  // Additional state for payer and date functionality
  const [selectedPayer, setSelectedPayer] = useState<Member | null>(null);
  const [showPayerModal, setShowPayerModal] = useState(false);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  // Mock data for groups
  const groups: Group[] = [
    { 
      id: '1', 
      name: 'Dallas Trip Group',
      members: [
        { id: '1', name: 'John' },
        { id: '2', name: 'Sarah' },
        { id: '3', name: 'Michael' },
        { id: '4', name: 'Emily' },
      ]
    },
    { 
      id: '2', 
      name: 'Roommates',
      members: [
        { id: '5', name: 'Alex' },
        { id: '6', name: 'Taylor' },
        { id: '7', name: 'Jordan' },
      ]
    },
    { 
      id: '3', 
      name: 'Family',
      members: [
        { id: '8', name: 'Mom' },
        { id: '9', name: 'Dad' },
        { id: '10', name: 'Sister' },
        { id: '11', name: 'Brother' },
      ]
    },
  ];

  // Effect to update split amounts when amount, group, or split option changes
  useEffect(() => {
    if (selectedGroup && amount) {
      calculateSplitAmounts();
    }
  }, [amount, selectedGroup, selectedSplitOption]);
  
  // Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };
  
  // Handle group selection
  const handleGroupSelect = (group: Group) => {
    setSelectedGroup(group);
    setShowGroupModal(false);
    
    // Auto-select the first member as payer by default
    if (group.members.length > 0 && !selectedPayer) {
      setSelectedPayer(group.members[0]);
    }
    
    // Initialize members with amounts
    const totalAmount = parseFloat(amount) || 0;
    const memberCount = group.members.length;
    const evenSplit = memberCount > 0 ? totalAmount / memberCount : 0;
    
    setMembersWithAmounts(
      group.members.map(member => ({
        ...member,
        amount: evenSplit,
        percentage: 100 / memberCount
      }))
    );
  };
  
  // Handle payer selection
  const handlePayerSelect = (payer: Member) => {
    setSelectedPayer(payer);
    setShowPayerModal(false);
  };
  
  // Handle date selection
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    setDatePickerVisibility(false);
    if (selectedDate) {
      setExpenseDate(selectedDate);
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };
  
  // Handle split option selection
  const handleSplitOptionSelect = (option: 'Evenly' | 'Custom' | 'Percentage') => {
    setSelectedSplitOption(option);
    setShowSplitOptions(false);
    
    // Recalculate split amounts based on new option
    if (selectedGroup && amount) {
      calculateSplitAmounts();
    }
  };
  
  // Calculate split amounts based on selected option
  const calculateSplitAmounts = () => {
    if (!selectedGroup || !amount) return;
    
    const totalAmount = parseFloat(amount);
    const memberCount = selectedGroup.members.length;
    
    if (selectedSplitOption === 'Evenly') {
      // Split evenly
      const evenSplit = totalAmount / memberCount;
      setMembersWithAmounts(
        selectedGroup.members.map(member => ({
          ...member,
          amount: evenSplit,
          percentage: 100 / memberCount
        }))
      );
    } else if (selectedSplitOption === 'Percentage') {
      // Keep percentages but update amounts
      setMembersWithAmounts(
        membersWithAmounts.map(member => ({
          ...member,
          amount: (member.percentage || 0) * totalAmount / 100
        }))
      );
    }
    // For 'Custom', we keep the current values until user edits them
  };
  
  // Handle member amount change (for custom split)
  const handleMemberAmountChange = (id: string, newAmount: string) => {
    const updatedMembers = membersWithAmounts.map(member => {
      if (member.id === id) {
        const parsedAmount = parseFloat(newAmount) || 0;
        return {
          ...member,
          amount: parsedAmount,
          percentage: parseFloat(amount) > 0 ? (parsedAmount / parseFloat(amount) * 100) : 0
        };
      }
      return member;
    });
    
    setMembersWithAmounts(updatedMembers);
  };
  
  // Handle member percentage change
  const handleMemberPercentageChange = (id: string, newPercentage: string) => {
    const parsedPercentage = parseFloat(newPercentage) || 0;
    
    const updatedMembers = membersWithAmounts.map(member => {
      if (member.id === id) {
        return {
          ...member,
          percentage: parsedPercentage,
          amount: parseFloat(amount) * parsedPercentage / 100
        };
      }
      return member;
    });
    
    setMembersWithAmounts(updatedMembers);
  };
  
  // Handle picking an image for receipt
  const handlePickImage = async () => {
    // Request camera roll permissions
    const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraRollStatus !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera roll permissions to attach receipts.');
      return;
    }
    
    // Pick image from gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setReceipt(result.assets[0].uri);
    }
  };
  
  // Handle taking a photo for receipt
  const handleTakePhoto = async () => {
    // Request camera permissions
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (cameraStatus !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera permissions to take photos.');
      return;
    }
    
    // Take a photo
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setReceipt(result.assets[0].uri);
    }
  };
  
  // Handle receipt button press
  const handleReceiptPress = () => {
    Alert.alert(
      'Add Receipt',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: handleTakePhoto },
        { text: 'Choose from Gallery', onPress: handlePickImage },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };
  
  // Show Date Picker
  const showDatePickerModal = () => {
    if (Platform.OS === 'ios') {
      setDatePickerVisibility(true);
    } else {
      setShowDatePicker(true);
    }
  };
  
  // Handle urgency selection
  const handleUrgencySelect = (level: UrgencyLevel) => {
    setUrgencyLevel(level);
    setShowUrgencyModal(false);
  };
  
  // Handle expense submit
  const handleSubmitExpense = () => {
    // Validate inputs
    if (!expenseName.trim() || !amount.trim() || !selectedGroup || !selectedPayer) {
      Alert.alert('Required Fields', 'Please fill out all required fields (name, amount, group, and payer)');
      return;
    }
    
    // Validate split amounts total to expense amount
    const totalSplitAmount = membersWithAmounts.reduce((sum, member) => sum + (member.amount || 0), 0);
    const parsedAmount = parseFloat(amount);
    
    // Allow for small floating point differences
    if (Math.abs(totalSplitAmount - parsedAmount) > 0.01) {
      Alert.alert('Split Amount Error', 'The total split amount must equal the expense amount.');
      return;
    }
    
    // Create expense object
    const expense = {
      name: expenseName,
      amount: parsedAmount,
      group: selectedGroup.name,
      groupId: selectedGroup.id,
      paidBy: selectedPayer,
      splitOption: selectedSplitOption,
      splits: membersWithAmounts,
      notes: notes,
      urgency: urgencyLevel,
      receipt: receipt,
      date: expenseDate.toISOString(),
    };
    
    console.log('Creating expense:', expense);
    
    // In a real app, you would save this to your state management or API
    Alert.alert('Success', 'Expense created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  // Render split options UI based on selected option
  const renderSplitOptionsUI = () => {
    if (!selectedGroup || !amount) {
      return (
        <Text style={styles.noSplitDataText}>
          Please select a group and enter an amount to view split options.
        </Text>
      );
    }
    
    switch (selectedSplitOption) {
      case 'Evenly':
        return (
          <View style={styles.splitMembersContainer}>
            <Text style={styles.splitInfoText}>
              Amount will be split evenly among {selectedGroup.members.length} members.
            </Text>
            {membersWithAmounts.map(member => (
              <View key={member.id} style={styles.splitMemberRow}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberAmount}>
                  ${member.amount?.toFixed(2)} ({member.percentage?.toFixed(0)}%)
                </Text>
              </View>
            ))}
          </View>
        );
        
      case 'Custom':
        return (
          <View style={styles.splitMembersContainer}>
            <Text style={styles.splitInfoText}>
              Customize the amount for each member.
            </Text>
            {membersWithAmounts.map(member => (
              <View key={member.id} style={styles.splitMemberRow}>
                <Text style={styles.memberName}>{member.name}</Text>
                <View style={styles.customAmountContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.customAmountInput}
                    value={member.amount?.toString() || '0'}
                    onChangeText={(text) => handleMemberAmountChange(member.id, text)}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            ))}
          </View>
        );
        
      case 'Percentage':
        return (
          <View style={styles.splitMembersContainer}>
            <Text style={styles.splitInfoText}>
              Customize the percentage for each member.
            </Text>
            {membersWithAmounts.map(member => (
              <View key={member.id} style={styles.splitMemberRow}>
                <Text style={styles.memberName}>{member.name}</Text>
                <View style={styles.customAmountContainer}>
                  <TextInput
                    style={styles.customAmountInput}
                    value={member.percentage?.toString() || '0'}
                    onChangeText={(text) => handleMemberPercentageChange(member.id, text)}
                    keyboardType="decimal-pad"
                  />
                  <Text style={styles.percentSymbol}>%</Text>
                  <Text style={styles.calculatedAmount}>
                    (${member.amount?.toFixed(2)})
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Expense</Text>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../assets/avatars/blaine.png')} 
            style={styles.profileImage} 
          />
        </View>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {/* Add Expense Section */}
        <Text style={styles.sectionTitle}>Add Expense</Text>
        
        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Name of Expense"
            value={expenseName}
            onChangeText={setExpenseName}
          />
          
          <View style={styles.rowContainer}>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Amount"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.groupSelector}
              onPress={() => setShowGroupModal(true)}
            >
              <Text style={styles.groupSelectorText}>
                {selectedGroup ? selectedGroup.name : 'Select Group'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          {/* Payer Selector */}
          <View style={styles.rowContainer}>
            <TouchableOpacity 
              style={styles.payerSelector}
              onPress={() => {
                if (selectedGroup) {
                  setShowPayerModal(true);
                } else {
                  Alert.alert('Select Group First', 'Please select a group before choosing who paid.');
                }
              }}
            >
              <Text style={styles.payerSelectorText}>
                {selectedPayer ? `Paid by ${selectedPayer.name}` : 'Who paid?'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dateSelector}
              onPress={showDatePickerModal}
            >
              <Text style={styles.dateSelectorText}>
                {formatDate(expenseDate)}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Split Options Section */}
        <View style={styles.splitOptionsContainer}>
          <TouchableOpacity 
            style={styles.splitOptionsHeader}
            onPress={() => setShowSplitOptions(!showSplitOptions)}
          >
            <Text style={styles.splitOptionsTitle}>Split Options</Text>
            <Ionicons 
              name={showSplitOptions ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {showSplitOptions && (
            <>
              <View style={styles.splitOptionsList}>
                <TouchableOpacity
                  style={[
                    styles.splitOptionItem,
                    selectedSplitOption === 'Evenly' && styles.selectedSplitOption
                  ]}
                  onPress={() => handleSplitOptionSelect('Evenly')}
                >
                  <Text style={styles.splitOptionText}>Evenly</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.splitOptionItem,
                    selectedSplitOption === 'Custom' && styles.selectedSplitOption
                  ]}
                  onPress={() => handleSplitOptionSelect('Custom')}
                >
                  <Text style={styles.splitOptionText}>Custom</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.splitOptionItem,
                    selectedSplitOption === 'Percentage' && styles.selectedSplitOption
                  ]}
                  onPress={() => handleSplitOptionSelect('Percentage')}
                >
                  <Text style={styles.splitOptionText}>Percentage</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.splitDetailsContainer}>
                {renderSplitOptionsUI()}
              </View>
            </>
          )}
        </View>
        
        {/* Notes Section */}
        <View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            placeholder="Notes"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
        
        {/* Receipt Preview if available */}
        {receipt && (
          <View style={styles.receiptPreviewContainer}>
            <Text style={styles.receiptPreviewTitle}>Receipt</Text>
            <Image source={{ uri: receipt }} style={styles.receiptImage} />
            <TouchableOpacity 
              style={styles.removeReceiptButton}
              onPress={() => setReceipt(null)}
            >
              <Text style={styles.removeReceiptText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Bottom Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.urgencyButton}
            onPress={() => setShowUrgencyModal(true)}
          >
            <Text style={styles.urgencyButtonText}>
              {urgencyLevel === 'Low' ? 'Low Urgency' : 
               urgencyLevel === 'Medium' ? 'Medium Urgency' : 'High Urgency'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.receiptButton}
            onPress={handleReceiptPress}
          >
            <Text style={styles.receiptButtonText}>Add Receipt</Text>
            <Ionicons name="document-attach-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmitExpense}
        >
          <Text style={styles.submitButtonText}>Create Expense</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Group Selection Modal */}
      <Modal
        visible={showGroupModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGroupModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Group</Text>
              <TouchableOpacity onPress={() => setShowGroupModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={groups}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.groupItem}
                  onPress={() => handleGroupSelect(item)}
                >
                  <Text style={styles.groupItemName}>{item.name}</Text>
                  <Text style={styles.groupItemMembers}>
                    {item.members.length} members
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
      
      {/* Payer Selection Modal */}
      <Modal
        visible={showPayerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPayerModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Who Paid?</Text>
              <TouchableOpacity onPress={() => setShowPayerModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={selectedGroup?.members}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.payerItem,
                    selectedPayer?.id === item.id && styles.selectedPayerItem
                  ]}
                  onPress={() => handlePayerSelect(item)}
                >
                  <Text style={styles.payerItemName}>{item.name}</Text>
                  {selectedPayer?.id === item.id && (
                    <Ionicons name="checkmark" size={24} color="#41E2BA" />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
      
      {/* Urgency Selection Modal */}
      <Modal
        visible={showUrgencyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUrgencyModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Urgency</Text>
              <TouchableOpacity onPress={() => setShowUrgencyModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.urgencyItem,
                urgencyLevel === 'Low' && styles.selectedUrgencyItem
              ]}
              onPress={() => handleUrgencySelect('Low')}
            >
              <Text style={styles.urgencyItemText}>Low Urgency</Text>
              <Text style={styles.urgencyItemDescription}>
                No rush, can be paid anytime
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.urgencyItem,
                urgencyLevel === 'Medium' && styles.selectedUrgencyItem
              ]}
              onPress={() => handleUrgencySelect('Medium')}
            >
              <Text style={styles.urgencyItemText}>Medium Urgency</Text>
              <Text style={styles.urgencyItemDescription}>
                Should be paid within a week
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.urgencyItem,
                urgencyLevel === 'High' && styles.selectedUrgencyItem
              ]}
              onPress={() => handleUrgencySelect('High')}
            >
              <Text style={styles.urgencyItemText}>High Urgency</Text>
              <Text style={styles.urgencyItemDescription}>
                Needs to be paid as soon as possible
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Date Picker for Android */}
      {showDatePicker && (
        <DateTimePicker
          value={expenseDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      
      {/* Date Picker for iOS */}
      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDatePickerVisibility(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setDatePickerVisibility(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <DateTimePicker
              value={expenseDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              style={styles.iosDatePicker}
            />
            
            <TouchableOpacity 
              style={styles.dateConfirmButton}
              onPress={() => setDatePickerVisibility(false)}
            >
              <Text style={styles.dateConfirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  currencySymbol: {
    fontSize: 16,
    marginRight: 5,
    color: '#555',
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
  },
  groupSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    flex: 1,
  },
  groupSelectorText: {
    fontSize: 16,
    color: '#555',
  },
  payerSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
  },
  payerSelectorText: {
    fontSize: 16,
    color: '#555',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    flex: 1,
  },
  dateSelectorText: {
    fontSize: 16,
    color: '#555',
  },
  splitOptionsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  splitOptionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  splitOptionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  splitOptionsList: {
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  splitOptionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  selectedSplitOption: {
    backgroundColor: '#f0f0f0',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
  },
  splitOptionText: {
    fontSize: 16,
    color: '#555',
  },
  splitDetailsContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  splitMembersContainer: {
    marginTop: 10,
  },
  splitInfoText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  splitMemberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  memberName: {
    fontSize: 16,
    color: '#555',
  },
  memberAmount: {
    fontSize: 16,
    color: '#555',
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 40,
  },
  customAmountInput: {
    width: 60,
    fontSize: 16,
    textAlign: 'right',
  },
  percentSymbol: {
    fontSize: 16,
    marginLeft: 5,
    color: '#555',
  },
  calculatedAmount: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  noSplitDataText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  notesContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: 15,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  receiptPreviewContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: 15,
    alignItems: 'center',
  },
  receiptPreviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  receiptImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  removeReceiptButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#f2f2f2',
  },
  removeReceiptText: {
    color: '#ff6b6b',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  urgencyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  urgencyButtonText: {
    fontSize: 16,
    color: '#555',
  },
  receiptButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  receiptButtonText: {
    fontSize: 16,
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#41E2BA',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  groupItem: {
    paddingVertical: 15,
  },
  groupItemName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  groupItemMembers: {
    fontSize: 14,
    color: '#888',
  },
  payerItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedPayerItem: {
    backgroundColor: '#f0f0f0',
  },
  payerItemName: {
    fontSize: 16,
    color: '#555',
  },
  separator: {
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  urgencyItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedUrgencyItem: {
    backgroundColor: '#f0f0f0',
  },
  urgencyItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  urgencyItemDescription: {
    fontSize: 14,
    color: '#888',
  },
  iosDatePicker: {
    width: '100%',
    height: 200,
  },
  dateConfirmButton: {
    backgroundColor: '#41E2BA',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  dateConfirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddExpenseScreen;