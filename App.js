/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/


import * as React from 'react';
import Navigation from './Navigation';
//import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <Navigation/>
    // Below is provided code for tutorial on navigation, just for reference, can delete once everything runs

    //<NavigationContainer>
     // {/* Rest of your app code */}
    //</NavigationContainer>
  );
};

export default App;