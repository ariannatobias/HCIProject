import React, { useState } from 'react';
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
import { useGroups } from '../context/GroupContext';

type RootStackParamList = {
  GroupMemberScreen: { groupName?: string };
  // ... other screen definitions
};

type GroupMemberScreenProps = {
  route: RouteProp<RootStackParamList, 'GroupMemberScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'GroupMemberScreen'>;
};

type Member = {
  id: number;
  name: string;
  avatar: any;
  color: string;
};

const GroupMemberScreen: React.FC<GroupMemberScreenProps> = ({ route, navigation }) => {
  const [availableUsers, setAvailableUsers] = useState<Member[]>([
    { id: 1, name: 'Arianna', avatar: require('../assets/avatars/arianna.png'), color: '#FFDAB9' },
    { id: 2, name: 'Blaine', avatar: require('../assets/avatars/blaine.png'), color: '#87CEEB' },
    { id: 3, name: 'Josh', avatar: require('../assets/avatars/josh.png'), color: '#FFD700' },
    { id: 4, name: 'Nthati', avatar: require('../assets/avatars/nthati.png'), color: '#98FB98' },
    { id: 5, name: 'Mitchell', avatar: require('../assets/avatars/mitchell.png'), color: '#FFA07A' },
  ]);

  const { addGroup } = useGroups();


  const [groupMembers, setGroupMembers] = useState<Member[]>([
    { id: 6, name: 'You', avatar: require('../assets/avatars/blaine.png'), color: '#87CEEB' },
  ]);

  const [groupName, setGroupName] = useState(route.params?.groupName || 'New Group');

  const handleAddMember = (member: Member) => {
    setAvailableUsers(availableUsers.filter(user => user.id !== member.id));
    setGroupMembers([...groupMembers, member]);
  };

  const handleRemoveMember = (member: Member) => {
    setGroupMembers(groupMembers.filter(user => user.id !== member.id));
    setAvailableUsers([...availableUsers, member]);
  };

  const handleSubmitGroup = () => {
    addGroup(groupName, groupMembers);  // ✅ correct usage
    navigation.navigate('MainTabs');
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.groupNameInput}
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Group Name"
          placeholderTextColor="#888"
          textAlign="center"
        />
      </View>

      <View style={styles.panelsContainer}>
        {/* Available Users Panel */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Available Users</Text>
          <ScrollView style={styles.memberList}>
            {availableUsers.map(member => (
              <View key={member.id} style={styles.memberItem}>
                <View style={[styles.avatarContainer, { backgroundColor: member.color }]}>
                  <Image source={member.avatar} style={styles.avatar} />
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => handleAddMember(member)}
                >
                  <Ionicons name="add-circle" size={24} color="#41E2BA" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Group Members Panel */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Group Members</Text>
          <ScrollView style={styles.memberList}>
            {groupMembers.map(member => (
              <View key={member.id} style={styles.memberItem}>
                <View style={[styles.avatarContainer, { backgroundColor: member.color }]}>
                  <Image source={member.avatar} style={styles.avatar} />
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveMember(member)}
                >
                  <Ionicons name="remove-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
            {/* Submit Button
            <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            // ✅ You can add a backend API call here if needed
            console.log("Group Name:", groupName);
            console.log("Group Members:", groupMembers.map(m => m.name));

            navigation.navigate('MainTabs');
              
          }}
        >
          <Text style={styles.submitButtonText}>Save & Go to Home</Text>
        </TouchableOpacity>
      </View> */}

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitGroup}
        >
          <Text style={styles.submitButtonText}>Save & Go to Home</Text>
        </TouchableOpacity>
      </View>

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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    marginRight: 16,
  },
  groupNameInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  panelsContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  panel: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  memberList: {
    flex: 1,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  memberName: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 'auto',
    padding: 4,
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 4,
  },
  submitButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  submitButton: {
    backgroundColor: '#41E2BA',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
export default GroupMemberScreen;