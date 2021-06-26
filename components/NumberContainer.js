import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export const NumberContainer = props => {
    return (
        <View style={{...styles.container, ...props.style}}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80
    },
    number: {
        color: Colors.primary,
        fontSize: 24,
    }
})