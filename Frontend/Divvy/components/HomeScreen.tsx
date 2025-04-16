// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Colors } from "../constants/Colors";
// import { useNavigation } from "@react-navigation/native";
// import { useGroups } from "../context/GroupContext";

// // Define the type for navigation
// type RootStackParamList = {
//   MainTabs: undefined;
//   GroupDetail: { groupId: string };
//   Login: undefined;
//   SignUp: undefined;
// };




// export const HomeScreen = () => {
//   // We'll use the light theme by default
//   const theme = Colors.light;
//   // Get the navigation object
//   const navigation = useNavigation<any>();

//   // Function to navigate to Group screen
//   const navigateToGroupDetail = (groupId: string) => {
//     navigation.navigate('GroupDetail', { groupId });
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.logoContainer}>
//           {/* Replace with your actual logo or a placeholder */}
//           <View style={[styles.logoPlaceholder, { backgroundColor: theme.primary }]}>
//             <Text style={{ color: "white" }}>D</Text>
//           </View>
//         </View>
//         <Text style={[styles.welcomeTitle, { color: theme.secondary }]}>Welcome, User!</Text>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         {/* Balance Summary Card */}
//         <View style={[styles.card, { backgroundColor: "white" }]}>
//           <Text style={[styles.sectionTitle, { color: theme.text }]}>Balance Summary</Text>
//           <View style={styles.balanceInfo}>
//             <View style={styles.balanceItem}>
//               <Text style={[styles.balanceLabel, { color: theme.text }]}>You Owe:</Text>
//               <Text style={[styles.balanceAmount, { color: theme.negative }]}>$21.30</Text>
//             </View>
//             <View style={styles.balanceItem}>
//               <Text style={[styles.balanceLabel, { color: theme.text }]}>Owed To You:</Text>
//               <Text style={[styles.balanceAmount, { color: theme.positive }]}>$12.15</Text>
//             </View>
//             <TouchableOpacity 
//               style={[styles.button, { backgroundColor: theme.accent }]}
//             >
//               <Text style={[styles.buttonText, { color: theme.text }]}>Settle Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Recent Transactions */}
//         <View style={[styles.card, { backgroundColor: "white" }]}>
//           <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Transactions</Text>
//           <View style={styles.transactionItem}>
//             <View style={styles.avatarContainer}>
//               <Ionicons name="person-outline" size={24} color={theme.icon} />
//             </View>
//             <View style={styles.transactionDetails}>
//               <Text style={[styles.transactionText, { color: theme.text }]}>You Paid Josh:</Text>
//               <Text style={[styles.transactionAmount, { color: theme.positive }]}>$14.50</Text>
//             </View>
//           </View>
//           {/* <TouchableOpacity 
//             style={[styles.button, { backgroundColor: theme.primary }]}
//           >
//             <Ionicons name="add-circle-outline" size={16} color="white" style={styles.buttonIcon} />
//             <Text style={[styles.buttonText, { color: "white" }]}>Add Expense</Text>
//           </TouchableOpacity> */}
//           <TouchableOpacity 
//           style={[styles.button, { backgroundColor: theme.secondary }]}
//           onPress={() => navigation.navigate('GroupMember', { groupName: 'New Group' })}
//           >
//           <Ionicons name="add-circle-outline" size={16} color="white" style={styles.buttonIcon} />
//           <Text style={[styles.buttonText, { color: "white" }]}>Create Group</Text>
//           </TouchableOpacity>

//         </View>

//         {/* Groups */}
//         <View style={[styles.card, { backgroundColor: "white" }]}>
//           <Text style={[styles.sectionTitle, { color: theme.text }]}>Groups</Text>
          
//           {/* Make this entire group item clickable */}
//           <TouchableOpacity 
//             style={styles.groupItem}
//             onPress={() => navigateToGroupDetail('dallas-trip')}
//           >
//             <View style={styles.groupAvatars}>
//               {/* Placeholder for group avatars */}
//               <View style={styles.avatarsStack}>
//                 <View style={[styles.avatar, styles.avatar1, { backgroundColor: "#ccc" }]} />
//                 <View style={[styles.avatar, styles.avatar2, { backgroundColor: "#aaa" }]} />
//                 <View style={[styles.avatar, styles.avatar3, { backgroundColor: "#888" }]} />
//               </View>
//             </View>
//             <View style={styles.groupDetails}>
//               <Text style={[styles.groupName, { color: theme.text }]}>Dallas Trip</Text>
//               <Text style={[styles.groupType, { color: theme.icon }]}>Group</Text>
//             </View>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.button, { backgroundColor: theme.secondary }]}
//           >
//             <Ionicons name="add-circle-outline" size={16} color="white" style={styles.buttonIcon} />
//             <Text style={[styles.buttonText, { color: "white" }]}>Create Group</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       {/* Status Bar */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     marginTop: 60, // Add extra margin for status bar
//   },
//   logoContainer: {
//     marginRight: 10,
//   },
//   logoPlaceholder: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   welcomeTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   scrollView: {
//     flex: 1,
//     padding: 16,
//   },
//   card: {
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   balanceInfo: {
//     marginBottom: 8,
//   },
//   balanceItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   balanceLabel: {
//     fontSize: 14,
//   },
//   balanceAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginBottom: 12,
//   },
//   avatarContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   transactionDetails: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   transactionText: {
//     fontSize: 14,
//   },
//   transactionAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   groupItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginBottom: 12,
//   },
//   groupAvatars: {
//     marginRight: 10,
//   },
//   avatarsStack: {
//     width: 60,
//     height: 40,
//     position: 'relative',
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     position: 'absolute',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   avatar1: {
//     left: 0,
//     zIndex: 3,
//   },
//   avatar2: {
//     left: 12,
//     zIndex: 2,
//   },
//   avatar3: {
//     left: 24,
//     zIndex: 1,
//   },
//   groupDetails: {
//     flex: 1,
//   },
//   groupName: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   groupType: {
//     fontSize: 12,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 12,
//     borderRadius: 6,
//     marginTop: 8,
//   },
//   buttonIcon: {
//     marginRight: 6,
//   },
//   buttonText: {
//     fontWeight: '500',
//   },
//   statusBar: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 16,
//     paddingTop: 4,
//   },
// });

// export default HomeScreen;


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useGroups } from "../context/GroupContext";
import { useUser } from "../context/UserContext";

export const HomeScreen = () => {
  const theme = Colors.light;
  const navigation = useNavigation<any>();
  const { groups } = useGroups();
  const { user } = useUser();
  console.log("Current Groups:", groups);


  const navigateToGroupDetail = (groupId: string) => {
    navigation.navigate("GroupDetail", { groupId });
  };

  const navigateToSettleDebts = (groupId: string, groupName: string) => {
    navigation.navigate("SettleDebts", { groupId, groupName });
  };
  

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={[styles.logoPlaceholder, { backgroundColor: theme.primary }]}>
            <Text style={{ color: "white" }}>D</Text>
          </View>
        </View>
        <Text style={[styles.welcomeTitle, { color: theme.secondary }]}>Welcome, {user?.first_name}!</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Balance Summary Card */}
        <View style={[styles.card, { backgroundColor: "white" }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Balance Summary</Text>
          <View style={styles.balanceInfo}>
            <View style={styles.balanceItem}>
              <Text style={[styles.balanceLabel, { color: theme.text }]}>You Owe:</Text>
              <Text style={[styles.balanceAmount, { color: theme.negative }]}>$15.00</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={[styles.balanceLabel, { color: theme.text }]}>Owed To You:</Text>
              <Text style={[styles.balanceAmount, { color: theme.positive }]}>$0.00</Text>
            </View>
            {/* <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]}>
              <Text style={[styles.buttonText, { color: theme.text }]}>Settle Up</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.accent }]}
                onPress={() => {
                  const group = groups[0]; // 👈 or however you want to pick the group
                    navigation.navigate("SettleDebts")
                }}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>Settle Up</Text>
</TouchableOpacity>

          </View>
        </View>

        {/* Recent Transactions */}
        <View style={[styles.card, { backgroundColor: "white" }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Transactions</Text>
          <View style={styles.transactionItem}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-outline" size={24} color={theme.icon} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={[styles.transactionText, { color: theme.text }]}>You Paid Josh:</Text>
              <Text style={[styles.transactionAmount, { color: theme.positive }]}>$0.00</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.secondary }]}
            onPress={() => navigation.navigate("groupMemberScreen", { groupName: "New Group" })}
          >
            <Ionicons name="add-circle-outline" size={16} color="white" style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: "white" }]}>Create Group</Text>
          </TouchableOpacity>
        </View>

        {/* Groups List */}
        <View style={[styles.card, { backgroundColor: "white" }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Groups</Text>

          {groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupItem}
              onPress={() => navigateToGroupDetail(group.id)}
            >
              <View style={styles.groupAvatars}>
                <View style={styles.avatarsStack}>
                  <View style={[styles.avatar, styles.avatar1, { backgroundColor: "#ccc" }]} />
                  <View style={[styles.avatar, styles.avatar2, { backgroundColor: "#aaa" }]} />
                  <View style={[styles.avatar, styles.avatar3, { backgroundColor: "#888" }]} />
                </View>
              </View>
              <View style={styles.groupDetails}>
                <Text style={[styles.groupName, { color: theme.text }]}>{group.name}</Text>
                <Text style={[styles.groupType, { color: theme.icon }]}>Group</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 60,
  },
  logoContainer: {
    marginRight: 10,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  balanceInfo: {
    marginBottom: 8,
  },
  balanceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionText: {
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 12,
  },
  groupAvatars: {
    marginRight: 10,
  },
  avatarsStack: {
    width: 60,
    height: 40,
    position: "relative",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
  },
  avatar1: {
    left: 0,
    zIndex: 3,
  },
  avatar2: {
    left: 12,
    zIndex: 2,
  },
  avatar3: {
    left: 24,
    zIndex: 1,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: "500",
  },
  groupType: {
    fontSize: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    fontWeight: "500",
  },
});

export default HomeScreen;
