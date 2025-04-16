
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation type
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
        <View style={styles.section}>
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

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.link}>English</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Notifications</Text>
            <Text style={styles.link}>Enabled {'>'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Theme</Text>
            <Text style={styles.link}>Light</Text>
          </View>
        </View>

        {/* Account & Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accounts & Settings</Text>
          <Text style={styles.link}>Payment Methods {'>'}</Text>
          <Text style={styles.link}>Change Password {'>'}</Text>
          <Text style={styles.link}>Help & Feedback {'>'}</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as keyof RootStackParamList }],
            });
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  content: {
    paddingHorizontal: 24,
    marginBottom: 90,
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
});

export default ProfileScreen;
