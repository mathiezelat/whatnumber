import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';
import { Card } from "../components/Card";
import Colors from "../constants/colors"

export const GameOverScreen = ({rounds, choice, onRestart}) => {
    const [isPortrait, setIsPortrait] = useState(true);
    const onPortrait = () => {
        const dim = Dimensions.get("window");
        return dim.height >= dim.width;
    }
    const statePortrait = () => setIsPortrait(onPortrait());
    useEffect(()=>{
        Dimensions.addEventListener('change', statePortrait);
        setIsPortrait(onPortrait());
        return ()=>{
            Dimensions.removeEventListener('change', statePortrait);
        }
    },[]);
    return(
        <ScrollView>
            <View style={isPortrait ? styles.screen : styles.screenLandscape}>
                <Image style={isPortrait ? styles.image : styles.imageLandscape} source={require('../assets/images/GameOver.png')}/>
                <Card style={isPortrait ? styles.resultContainer : styles.resultContainerLandscape}>
                    <Text>Rondas: {rounds}</Text>
                    <Text>Tu número: {choice}</Text>
                    <Button onPress={onRestart} title="Volver a jugar" color={Colors.primary} />
                </Card>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    screenLandscape: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200
    },
    imageLandscape: {
        width: '50%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultContainer: {
        padding: Dimensions.get("window").height > 600 ? 20 : 10,
        margin: Dimensions.get("window").height > 600 ? 20 : 10
    },
    resultContainerLandscape:{
        padding: 40,
        margin: 40,
        width: '40%'
    }
})