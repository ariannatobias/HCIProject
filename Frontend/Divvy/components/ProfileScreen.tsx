import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const user = {
  name: 'Blaine',
  email: 'blaine@example.com',
  avatar: require('../assets/avatars/blaine.png'),
  color: '#87CEEB',
  totalOwed: 45.63,
  totalReceived: 32.15,
};

const ProfileScreen: React.FC = () => {
  const handleEditProfile = () => {
    alert('Edit Profile clicked');
  };

  const handleViewGroups = () => {
    alert('View All Groups clicked');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <View style={[styles.avatarCircle, { backgroundColor: user.color }]}>
          <Image source={user.avatar} style={styles.avatarImage} />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>You Owe</Text>
          <Text style={styles.statAmount}>${user.totalOwed.toFixed(2)}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>You're Owed</Text>
          <Text style={styles.statAmount}>${user.totalReceived.toFixed(2)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={20} color="#fff" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleViewGroups}>
          <Ionicons name="people" size={20} color="#fff" />
          <Text style={styles.actionText}>View Your Groups</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '40%',
    alignItems: 'center',
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#41E2BA',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProfileScreen;