import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './ui/BottomNavigation';

const AddCardScreen = () => {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Add Card</Text>

      <View style={styles.cardBox}>
        <View style={styles.cardHeader}>
          <Ionicons name="card" size={18} color="#000" />
          <Text style={styles.cardTitle}>  Credit/Debit Card</Text>
        </View>

        <Text style={styles.label}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Firstname Lastname"
          value={cardHolder}
          onChangeText={setCardHolder}
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Expiration Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="***"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>
      </View>

      <View style={styles.checkboxRow}>
        <Switch
          value={saveCard}
          onValueChange={setSaveCard}
          thumbColor="#75DFBC"
        />
        <Text style={styles.saveText}>Save this card for faster payments</Text>
      </View>

      <BottomNavigation activeTab="Profile" onTabPress={(tab) => {}} />
    </SafeAreaView>
  );
};

export default AddCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 4,
    color: '#444',
  },
  input: {
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#444',
  },
});
