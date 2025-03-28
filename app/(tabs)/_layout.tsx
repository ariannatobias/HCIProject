import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import MainNavigationBar from '../../components/MainNavigationBar';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <MainNavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
