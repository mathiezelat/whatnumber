import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Header } from './components/Header';
import { StartGameScreen } from './screens/StartGameScreen'
import { GameScreen } from './screens/GameScreen';
import { useFonts } from 'expo-font';
import { GameOverScreen } from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  const [guessRounds, setGuessRounds] = useState(0)
  const [loaded, error] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const handleGameOver = rounds =>{
    setGuessRounds(rounds);
  }
  const handleRestart = () => {
    setUserNumber('');
    setGuessRounds(0);
  }
  const handleStartGame = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }
  let content = <StartGameScreen onStartGame={handleStartGame} onGameOver={()=>{}} />
  if (userNumber && guessRounds <= 0){
    content = <GameScreen onEndGame={handleRestart} onGameOver={handleGameOver} userOption={userNumber} /> 
  } else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} choice={userNumber} onRestart={handleRestart} />
  }

  if (!loaded){
    return (
      <AppLoading />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"WhatNumber"} />
      {content}
      <StatusBar style="auto" />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
