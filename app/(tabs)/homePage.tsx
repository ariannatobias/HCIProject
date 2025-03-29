import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export const WelcomePage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome, User!</Text>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Balance Summary</Text>
        <Text style={styles.label}>You Owe:</Text>
        <Text style={styles.amountOwe}>$21.30</Text>
        <Text style={styles.label}>Owed To You:</Text>
        <Text style={styles.amountOwed}>$12.15</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Recent Transactions</Text>
        <Text style={styles.transaction}>You Paid Josh: $14.50</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Groups</Text>
        <Text style={styles.group}>Dallas Trip</Text>
        <Text style={styles.group}>Group</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F9", // Seasalt
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#41E2BA", // Turquoise
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#E86A92", // Cyclamen
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  amountOwe: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E86A92", // Cyclamen
  },
  amountOwed: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#41E2BA", // Turquoise
  },
  transaction: {
    fontSize: 16,
    color: "#333",
  },
  group: {
    fontSize: 16,
    backgroundColor: "#F7E733", // Aureolin
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    color: "#000",
  },
});