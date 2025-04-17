import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  SettleDebts: { groupId?: string; groupName?: string };
  Login: undefined;
  SignUp: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const { user, logout } = useUser();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [helpVisible, setHelpVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image source={require('../assets/avatars/mitchell.png')} style={styles.avatar} />
          <Text style={styles.username}>{user?.email || 'Guest'}</Text>
        </View>
      </View>

      {/* Info Section */}
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Info</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user?.first_name} {user?.last_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.link}>English</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Notifications</Text>
            <Text style={styles.link}>Enabled</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Theme</Text>
            <Text style={styles.link}>Light</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Accounts & Settings</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Payment Methods {'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Change Password {'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHelpVisible(true)}>
            <Text style={styles.link}>Help & Feedback {'>'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Help Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={helpVisible}
        onRequestClose={() => setHelpVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>💡 Help & Tips</Text>

            <Text style={styles.modalText}>• Tap the green “Settle Debts” button to quickly pay what you owe.</Text>
            <Text style={styles.modalText}>• Use “Divvy it Up” to break down large totals by person.</Text>
            <Text style={styles.modalText}>• Add an expense using the center + button — it’s always available!</Text>
            <Text style={styles.modalText}>• Forgot to select a group or who paid? You can edit that in the expense form.</Text>
            <Text style={styles.modalText}>• Need to split unevenly? Use “Split Options” when adding an expense.</Text>
            <Text style={styles.modalText}>• You can attach a receipt and set urgency for each expense!</Text>
            <Text style={styles.modalText}>• Tap “Profile” → “Logout” to safely sign out.</Text>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.modalSubheading}>📧 Need more help?</Text>
              <Text style={styles.modalText}>Email us at <Text style={styles.email}>support@divvyapp.io</Text></Text>
            </View>

            <Pressable style={styles.closeButton} onPress={() => setHelpVisible(false)}>
              <Text style={styles.closeText}>Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#C1F5E4',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  modalSubheading: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  email: {
    fontWeight: '500',
    color: '#2E8C74',
  },  
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },  
  content: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },  
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  link: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2E8C74',
    paddingVertical: 6,
  },
  logout: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: {
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#2E8C74',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default ProfileScreen;