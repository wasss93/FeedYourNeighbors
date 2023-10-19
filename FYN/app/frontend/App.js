import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { API_TOKEN } from '@env';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start  on your app!</Text>
      <Text>URL: {API_TOKEN}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
