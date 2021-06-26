import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Header } from './components/Header';
import { StartGameScreen } from './screens/StartGameScreen'
import { GameScreen } from './screens/GameScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState('')
  const [loaded, error] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  let content = userNumber ? <GameScreen onEndGame={setUserNumber} userOption={userNumber} /> :
  <StartGameScreen onStartGame={setUserNumber} />

  if (!loaded){
    return (
      <AppLoading />
    )
  }

  return (
    <View style={styles.container}>
      <Header title={"WhatNumber"} />
      {content}
      <StatusBar style="auto" />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
