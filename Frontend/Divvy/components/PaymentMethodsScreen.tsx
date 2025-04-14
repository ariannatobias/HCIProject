import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import BottomNavigation from './ui/BottomNavigation';

const PaymentMethodsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Payments');
  const [selectedCard, setSelectedCard] = useState('Axis Bank');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Methods</Text>

      {/* Tab Switcher */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Payments' && styles.activeTab]}
          onPress={() => setSelectedTab('Payments')}
        >
          <Text style={[styles.tabText, selectedTab === 'Payments' && styles.activeTabText]}>Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Scheduled' && styles.activeTab]}
          onPress={() => setSelectedTab('Scheduled')}
        >
          <Text style={[styles.tabText, selectedTab === 'Scheduled' && styles.activeTabText]}>Scheduled</Text>
        </TouchableOpacity>
      </View>

      {/* Credit/Debit Cards Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Credit/Debit Card</Text>

          {/* Card 1 */}
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => setSelectedCard('Axis Bank')}
          >
            <Image source={require('../assets/icons/mastercard.png')} style={styles.cardIcon} />
            <Text style={styles.cardText}>Axis Bank ****7490</Text>
            <View style={selectedCard === 'Axis Bank' ? styles.radioSelected : styles.radioUnselected} />
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => setSelectedCard('Paypal')}
          >
            <Image source={require('../assets/icons/paypal.png')} style={styles.cardIcon} />
            <Text style={styles.cardText}>Paypal ****7490</Text>
            <View style={selectedCard === 'Paypal' ? styles.radioSelected : styles.radioUnselected} />
          </TouchableOpacity>

          {/* Add Card Button */}
          <TouchableOpacity style={styles.addCardButton}>
            <Text style={styles.addCardText}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <BottomNavigation activeTab="Profile" onTabPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#75DFBC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  cardSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#fff',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  cardIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginRight: 10,
  },
  cardText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#75DFBC',
    backgroundColor: '#75DFBC',
  },
  radioUnselected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#aaa',
    backgroundColor: '#fff',
  },
  addCardButton: {
    backgroundColor: '#75DFBC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#75DFBC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  addCardText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PaymentMethodsScreen;
