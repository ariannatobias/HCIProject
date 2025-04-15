// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { DivvyColors } from '../constants/Colors';
// import { useGroups } from '../context/GroupContext';
// import { useUser } from '../context/UserContext';
// import { Member } from '../context/GroupContext';



// type RootStackParamList = {
//   GroupMemberScreen: { groupName?: string };
//   // ... other screen definitions
// };

// type GroupMemberScreenProps = {
//   route: RouteProp<RootStackParamList, 'GroupMemberScreen'>;
//   navigation: StackNavigationProp<RootStackParamList, 'GroupMemberScreen'>;
// };

// type Member = {
//   id: number;
//   name: string;
//   avatar: any;
//   color: string;
// };

// const GroupMemberScreen: React.FC<GroupMemberScreenProps> = ({ route, navigation }) => {
//     const [availableUsers, setAvailableUsers] = useState<Member[]>([]);
//     const [groupMembers, setGroupMembers] = useState<Member[]>([]);
//     const [groupName, setGroupName] = useState(route.params?.groupName || 'New Group');
  

//   const { addGroup } = useGroups();
//   const { user } = useUser(); // 👈 this gives you access to the current user


//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/users/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
  
//         if (!response.ok) {
//           throw new Error(`Error fetching users: ${response.status}`);
//         }
  
//         const users = await response.json();
  
//         // const formattedUsers = users.map((user: any) => ({
//         //   id: user.id,
//         //   name: `${user.first_name} ${user.last_name}`,
//         //   color: '#EEE', // Optional: Generate or rotate colors
//         // }));

//         const formattedUsers = users
//     .filter((u: any) => u.id !== user?.id)  // ❌ exclude current user
//     .map((user: any) => ({
//         id: user.id,
//         name: `${user.first_name} ${user.last_name}`,
//         color: '#EEE',
//     }));
  
//         setAvailableUsers(formattedUsers);
//       } catch (err) {
//         console.error('Failed to load users:', err);
//       }
//     };
  
//     loadUsers();
//   }, []);
  


//   const handleAddMember = (member: Member) => {
//     setAvailableUsers(availableUsers.filter(user => user.id !== member.id));
//     setGroupMembers([...groupMembers, member]);
//   };

//   const handleRemoveMember = (member: Member) => {
//     setGroupMembers(groupMembers.filter(user => user.id !== member.id));
//     setAvailableUsers([...availableUsers, member]);
//   };

// //   const handleSubmitGroup = () => {
// //     addGroup(groupName, groupMembers);  // ✅ correct usage
// //     navigation.navigate('MainTabs');
// //   };
// const handleSubmitGroup = async () => {
//     const currentUserAsMember = {
//         id: user?.id.toString(),  // convert number to string if needed
//         name: `${user?.name}`,
//         color: '#EEE',
//       };
      
//     const memberIds = groupMembers.map(m => m.id);
  
//     try {
//       const response = await fetch(`http://localhost:8000/groups/?creator_id=${user?.id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: groupName, member_ids: memberIds }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to create group");
//       }
  
//       const createdGroup = await response.json();
//       addGroup(createdGroup.name, [...groupMembers, currentUserAsMember]);
//   // ✅ add user, not `users`
//       navigation.navigate('MainTabs');
//     } catch (err) {
//       console.error("Error creating group:", err);
//     }
//   };
  
  
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#000000" />
//         </TouchableOpacity>
        
//         <TextInput
//           style={styles.groupNameInput}
//           value={groupName}
//           onChangeText={setGroupName}
//           placeholder="Group Name"
//           placeholderTextColor="#888"
//           textAlign="center"
//         />
//       </View>

//       <View style={styles.panelsContainer}>
//         {/* Available Users Panel */}
//         <View style={styles.panel}>
//           <Text style={styles.panelTitle}>Available Users</Text>
//           <ScrollView style={styles.memberList}>
//             {availableUsers.map(member => (
//               <View key={member.id} style={styles.memberItem}>
//                 <View style={[styles.avatarContainer, { backgroundColor: member.color }]}>
//                   <Image source={member.avatar} style={styles.avatar} />
//                 </View>
//                 <Text style={styles.memberName}>{member.name}</Text>
//                 <TouchableOpacity 
//                   style={styles.addButton}
//                   onPress={() => handleAddMember(member)}
//                 >
//                   <Ionicons name="add-circle" size={24} color="#41E2BA" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Group Members Panel */}
//         <View style={styles.panel}>
//           <Text style={styles.panelTitle}>Group Members</Text>
//           <ScrollView style={styles.memberList}>
//             {groupMembers.map(member => (
//               <View key={member.id} style={styles.memberItem}>
//                 <View style={[styles.avatarContainer, { backgroundColor: member.color }]}>
//                   <Image source={member.avatar} style={styles.avatar} />
//                 </View>
//                 <Text style={styles.memberName}>{member.name}</Text>
//                 <TouchableOpacity 
//                   style={styles.removeButton}
//                   onPress={() => handleRemoveMember(member)}
//                 >
//                   <Ionicons name="remove-circle" size={24} color="#FF6B6B" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//             {/* Submit Button
//             <View style={styles.submitButtonContainer}>
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={() => {
//             // ✅ You can add a backend API call here if needed
//             console.log("Group Name:", groupName);
//             console.log("Group Members:", groupMembers.map(m => m.name));

//             navigation.navigate('MainTabs');
              
//           }}
//         >
//           <Text style={styles.submitButtonText}>Save & Go to Home</Text>
//         </TouchableOpacity>
//       </View> */}

//       {/* Submit Button */}
//       <View style={styles.submitButtonContainer}>
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmitGroup}
//         >
//           <Text style={styles.submitButtonText}>Save & Go to Home</Text>
//         </TouchableOpacity>
//       </View>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F7F9',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   groupNameInput: {
//     flex: 1,
//     height: 40,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   panelsContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     padding: 16,
//   },
//   panel: {
//     flex: 1,
//     marginHorizontal: 8,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   panelTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   memberList: {
//     flex: 1,
//   },
//   memberItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 8,
//     marginVertical: 4,
//     backgroundColor: '#F8F8F8',
//     borderRadius: 8,
//   },
//   avatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     overflow: 'hidden',
//     marginRight: 12,
//   },
//   avatar: {
//     width: '100%',
//     height: '100%',
//   },
//   memberName: {
//     flex: 1,
//     fontSize: 16,
//   },
//   addButton: {
//     marginLeft: 'auto',
//     padding: 4,
//   },
//   removeButton: {
//     marginLeft: 'auto',
//     padding: 4,
//   },
//   submitButtonContainer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#EEE',
//     backgroundColor: '#FFF',
//   },
//   submitButton: {
//     backgroundColor: '#41E2BA',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },

// });
// export default GroupMemberScreen;



// GroupMemberScreen.tsx
import React, { useEffect, useState } from 'react';
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
  const { user } = useUser(); // get current user

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
    setAvailableUsers(availableUsers.filter(user => user.id !== member.id));
    setGroupMembers([...groupMembers, member]);
  };

  const handleRemoveMember = (member: Member) => {
    setGroupMembers(groupMembers.filter(user => user.id !== member.id));
    setAvailableUsers([...availableUsers, member]);
  };

//   const handleSubmitGroup = async () => {
//     const currentUserAsMember: Member = {
//       id: user?.id.toString() || '',
//       name: `${user?.name}`,
//       color: '#EEE',
//     };

//     const memberIds = groupMembers.map(m => parseInt(m.id)); // convert to number

//     try {
//       const response = await fetch(`http://localhost:8000/groups/?creator_id=${user?.id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: groupName, member_ids: memberIds }),
//       });

//       if (!response.ok) throw new Error("Failed to create group");

//       const createdGroup = await response.json();
//       addGroup(createdGroup.name, [...groupMembers, currentUserAsMember]);
//       navigation.navigate('MainTabs');
//     } catch (err) {
//       console.error("Error creating group:", err);
//     }
//   };
console.log("👤 Logged in user ID:", user?.id);
console.log("📤 Group name:", groupName);

// const handleSubmitGroup = async () => {
//     if (!user?.id) {
//       console.error("❌ No logged-in user found");
//       alert("You must be logged in to create a group");
//       return;
//     }
  
//     try {
//       // Convert member IDs to numbers and ensure they're valid
//       const memberIds = groupMembers.map(m => {
//         const id = parseInt(m.id);
//         if (isNaN(id)) throw new Error("Invalid member ID");
//         return id;
//       });
  
//       const response = await fetch('http://localhost:8000/groups/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add authorization header if your API requires it
//           // 'Authorization': `Bearer ${userToken}`
//         },
//         body: JSON.stringify({
//           name: groupName,
//           member_ids: memberIds,
//           creator_id: user.id
//         }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || "Failed to create group");
//       }
  
//       const createdGroup = await response.json();
      
//       // Add the group to local state if needed
//       addGroup(createdGroup.name, [
//         ...groupMembers,
//         {
//           id: user.id.toString(),
//           name: user.name,
//           color: '#EEE'
//         }
//       ]);
  
//       navigation.navigate('MainTabs');
//     } catch (err) {
//       console.error("❌ Error creating group:", err);
//       alert("Failed to create group");
//     }
//   };

const handleSubmitGroup = async () => {
    try {
      const memberIds = groupMembers.map((m) => parseInt(m.id));
      
      const response = await fetch('http://localhost:8000/groups/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: groupName,
          member_ids: memberIds
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create group");
      }
  
      const createdGroup = await response.json();
  
      addGroup(createdGroup.name, groupMembers); // no need to include current user
      navigation.navigate('MainTabs');
    } catch (err) {
      console.error("❌ Error creating group:", err);
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
                <View style={[styles.avatarContainer, { backgroundColor: member.color }]}>
                  <Image source={member.avatar} style={styles.avatar} />
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
                <View style={[styles.avatarContainer, { backgroundColor: member.color }]}>
                  <Image source={member.avatar} style={styles.avatar} />
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
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  avatar: { width: '100%', height: '100%' },
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
