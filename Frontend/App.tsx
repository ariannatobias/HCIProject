// App.js in the root directory of your project
import React from 'react';
import { SafeAreaView } from 'react-native';
import { HomePage } from './Divvy/components/HomePage';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomePage />
    </SafeAreaView>
  );
}