import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Button, Dimensions, Alert, ScrollView } from 'react-native';
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



export const GameScreen = ({ onEndGame, onGameOver,userOption }) =>{
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 99, userOption));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHight = useRef(100);
    useEffect(()=>{
        if(currentGuess === userOption) onGameOver(rounds);
    }, [currentGuess, userOption, onGameOver]);


    const handleEndGame = () => {
        onEndGame(0);
    }

    const handleNextGuess = direction => {
        if(
            (direction === 'lower' && currentGuess < userOption) ||
            (direction === 'greater' && currentGuess > userOption)
        ){
            Alert.alert('No mientas!', 'Tu sabes que no es verdad...!',[
                {
                    text: 'Disculpa!',
                    style: 'cancel',
                },
            ]);
            return;
        }

        if(direction === 'lower'){
            currentHight.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(round => round + 1);
    }
    return (
        <ScrollView>
        <View style={styles.containerGameScreen}>
            <Text style={styles.oponenteText}>La suposición del oponente</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                <Button title="MENOR" onPress={handleNextGuess.bind(this, 'lower')} color={Colors.secundary} />
                </View>
                <View style={styles.button}>
                <Button title="MAYOR" onPress={handleNextGuess.bind(this, 'greater')} color={Colors.primary} />
                </View>
            </Card>
            <View style={styles.buttonEnd}>
                <Button onPress={handleEndGame} title="Terminar" color={Colors.tertiary} />
            </View>
        </View>
        </ScrollView>
    )
}

const getPadding = () => {
    const result = Dimensions.get("window");
    return result;
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
        justifyContent: 'center',
        padding: Dimensions.get("window").height > 700 ? 20 : 10,
        minWidth: '60%',
        maxWidth: '95%',
        marginVertical: 10,
        marginHorizontal: 10
    },
    button: {
        width: 100,
        marginHorizontal: 25,
        justifyContent: 'center',
    }
});

