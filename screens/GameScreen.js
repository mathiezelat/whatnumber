import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { NumberContainer } from '../components/NumberContainer';
import { Card } from '../components/Card';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const random = Math.floor(Math.random() * (max - min) + min);
    if (random === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return random;
    }
}

export const GameScreen = ({ onEndGame, userOption }) =>{
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 99, userOption));

    const handleEndGame = () => {
        onEndGame(0)
    }
    return (
        <View style={styles.containerGameScreen}>
            <Text style={styles.oponenteText}>La suposición del oponente</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                <Button title="MENOR" onPress={()=>{}} color={Colors.secundary} />
                </View>
                <View style={styles.button}>
                <Button title="MAYOR" onPress={()=>{}} color={Colors.primary} />
                </View>
            </Card>
            <View style={styles.buttonEnd}>
                <Button onPress={handleEndGame} title="Terminar" color={Colors.tertiary} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerGameScreen:{
        flex: 1,
        alignItems: 'center'
    },
    oponenteText: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5
    },  
    buttonEnd: {
        marginVertical: 20,
        width: '70%'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        padding:20,
        width: '70%',
        marginBottom: 10
    },
    button: {
        width: 100
    }
});

