import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Modal } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [racha, setRacha] = useState(0)
    const handleEndGame = () => {
        onEndGame(0);
        setModalVisible(false);
        setRacha(0);
    }
    const handleMayor = () =>{
        setCurrentGuess(generateRandomBetween(1, 99, userOption));
        if (currentGuess < userOption){
            setRacha(racha + 1)
        } else {
            setModalVisible(true);
        }
    }
    const handleMenor = () =>{
        setCurrentGuess(generateRandomBetween(1, 99, userOption));
        if (currentGuess > userOption){
            setRacha(racha + 1)
        } else {
            setModalVisible(true);
        }
    }
    let rachaContainer = (racha >= 1) ? 
        rachaContainer = (
            <View>
                <Text>Tu racha: {racha}</Text>
            </View>
        ) :  null
    return (
        <>
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}>
            <View style={styles.modalContainer}>
                <Card style={styles.modalCardContainer}>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalTextLost}>¡Has perdido!</Text>
                        <Text>El oponente te venció con su número {currentGuess}</Text>
                        <Text>Número elegido: {userOption}</Text>
                        <Text>Tuviste una racha de {racha}</Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <Button onPress={handleEndGame} title="Terminar" color={Colors.primary} />
                    </View>
                </Card>
            </View>
        </Modal>
        <View style={styles.containerGameScreen}>
            <Text style={styles.oponenteText}>La suposición del oponente</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                <Button title="MENOR" onPress={handleMenor} color={Colors.secundary} />
                </View>
                <View style={styles.button}>
                <Button title="MAYOR" onPress={handleMayor} color={Colors.primary} />
                </View>
            </Card>
            {rachaContainer}
            <View style={styles.buttonEnd}>
                <Button onPress={handleEndGame} title="Terminar" color={Colors.tertiary} />
            </View>
        </View>
        </>
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
    },
    modalContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalCardContainer: {
        padding: 30,
        backgroundColor: '#d54',
        borderRadius: 23,
        justifyContent: 'space-around',
        height: 200
    },
    modalTextContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTextLost: {
        fontSize: 24,
        marginBottom: 5
    }
});

