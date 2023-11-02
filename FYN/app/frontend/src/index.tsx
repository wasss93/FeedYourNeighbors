import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import { Counter } from './features/counter/Counter';
import AlphabetComponent from './features/alphabet/Alphabet';

export const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Counter />
      <AlphabetComponent />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
