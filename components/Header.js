import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';

export const Header = ({ title })=>{
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{ title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 24,
        letterSpacing: 1,
        color: '#333',
        fontFamily: 'open-sans'
    }
})