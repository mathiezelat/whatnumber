import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, TouchableWithoutFeedback, Keyboard, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import Colors from '../constants/colors';
import { NumberContainer } from '../components/NumberContainer';

export const StartGameScreen = ({ onStartGame })=>{
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [confirmedValue, setConfirmedValue] = useState('')

    const handleInputNumber = text => {
        setEnteredValue(text.replace(/[^0-9]/g, ''))
    }

    const handleResetInput = () =>{
        setEnteredValue('');
        setConfirmed(false);
        setConfirmedValue('');
    }

    const handleConfirmInput = () => {
        const inputNumber = parseInt(enteredValue);
        Keyboard.dismiss();
        if (inputNumber === NaN || inputNumber <= 0 || inputNumber > 99 || isNaN(inputNumber)) return;
        setConfirmed(true);
        setConfirmedValue(inputNumber);
        setEnteredValue('');
    }

    const handleStartGame = ()=>{
        onStartGame(confirmedValue);
    }

    let confirmedOutput = null;
    if (confirmed){
        confirmedOutput =(
            <Card style={styles.summaryContainer}>
                <Text>Tu selección</Text>
                    <NumberContainer>{confirmedValue}</NumberContainer>
                    <Button title="Confirmar" onPress={handleStartGame} color={Colors.primary} />
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <ScrollView style={{flex: 1}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'position' : 'height' } keyboardVerticalOffset={30} style={styles.screen}>
                <Text style={styles.title}>¡Comenzar el juego!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Escribe un número</Text>
                    <Input 
                    blurOnSubmit 
                    autoCapitalization={false}
                    autoCorrect={false} 
                    keyboardType="numeric"
                    maxLength={2}
                    value={enteredValue}
                    onChangeText={handleInputNumber}/>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Limpiar" onPress={handleResetInput} color={Colors.secundary} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirmar" onPress={handleConfirmInput} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        minWidth: '80%',
        maxWidth: '95%',
        paddingHorizontal: Dimensions.get("window").height > 600 ? 10 : 5,
        paddingVertical: Dimensions.get("window").height > 600 ? 20 : 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: Dimensions.get("window").width / 3,
        marginHorizontal: 5
    },
    summaryContainer: {
        marginVertical: 10,
        padding: 20,
        paddingHorizontal: 50,
        alignItems: 'center',
    }
})