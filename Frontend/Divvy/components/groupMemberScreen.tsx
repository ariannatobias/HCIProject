import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGroups, Member } from '../context/GroupContext';
import { useUser } from '../context/UserContext';

type RootStackParamList = {
  GroupMemberScreen: { groupName?: string };
};

type GroupMemberScreenProps = {
  route: RouteProp<RootStackParamList, 'GroupMemberScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'GroupMemberScreen'>;
};

const GroupMemberScreen: React.FC<GroupMemberScreenProps> = ({ route, navigation }) => {
  const [availableUsers, setAvailableUsers] = useState<Member[]>([]);
  const [groupMembers, setGroupMembers] = useState<Member[]>([]);
  const [groupName, setGroupName] = useState(route.params?.groupName || 'New Group');

  const { addGroup } = useGroups();
  const { user } = useUser();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/');
        const users = await response.json();

        const formattedUsers: Member[] = users
          .filter((u: any) => u.id !== user?.id)
          .map((u: any) => ({
            id: u.id.toString(),
            name: `${u.first_name} ${u.last_name}`,
            color: '#EEE',
          }));

        setAvailableUsers(formattedUsers);
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };

    loadUsers();
  }, [user]);

  const handleAddMember = (member: Member) => {
    setAvailableUsers(prev => prev.filter(u => u.id !== member.id));
    setGroupMembers(prev => [...prev, member]);
  };

  const handleRemoveMember = (member: Member) => {
    setGroupMembers(prev => prev.filter(u => u.id !== member.id));
    setAvailableUsers(prev => [...prev, member]);
  };


const handleSubmitGroup = async () => {
    if (!user?.id) {
        console.log("Full user object:", user);
        console.error("No valid user ID found.");
        alert("You must be logged in to create a group.");
        return;
      }

    try {
      const memberIds = groupMembers.map((m) => parseInt(m.id));
      const payload = {
        name: groupName,
        creator_id: Number(user?.id),
        member_ids: memberIds,
      };
  
      console.log("📤 Submitting payload to backend:", payload);
  
      const response = await fetch('http://localhost:8000/groups/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const text = await response.text(); // Read raw response body
    //   const createdGroup = await response.json();

    //   addGroup(createdGroup.name, groupMembers);
  
      if (!response.ok) {
        console.error("❌ Backend responded with error:", text);
        throw new Error("Failed to create group");
      }
  
      console.log("✅ Group created successfully:", text);
      const createdGroup = JSON.parse(text);
  
      addGroup(createdGroup.name, groupMembers);
      navigation.navigate('MainTabs');
    } catch (err: any) {
      console.error("🔥 Exception during group creation:", err.message);
      alert("Failed to create group");
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
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
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Available Users</Text>
          <ScrollView style={styles.memberList}>
            {availableUsers.map(member => (
              <View key={member.id} style={styles.memberItem}>
                <View style={[styles.avatarPlaceholder, { backgroundColor: member.color }]}>
                  <Text style={styles.avatarText}>{member.name[0]}</Text>
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
                <TouchableOpacity onPress={() => handleAddMember(member)}>
                  <Ionicons name="add-circle" size={24} color="#41E2BA" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Group Members</Text>
          <ScrollView style={styles.memberList}>
            {groupMembers.map(member => (
              <View key={member.id} style={styles.memberItem}>
                <View style={[styles.avatarPlaceholder, { backgroundColor: member.color }]}>
                  <Text style={styles.avatarText}>{member.name[0]}</Text>
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
                <TouchableOpacity onPress={() => handleRemoveMember(member)}>
                  <Ionicons name="remove-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitGroup}>
          <Text style={styles.submitButtonText}>Save & Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: { marginRight: 16 },
  groupNameInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  panelsContainer: { flex: 1, flexDirection: 'row', padding: 16 },
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
  memberList: { flex: 1 },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#333',
    fontWeight: 'bold',
  },
  memberName: { flex: 1, fontSize: 16 },
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
