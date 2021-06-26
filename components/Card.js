import React from 'react'
import { View, StyleSheet } from 'react-native'

export const Card = (props)=>{
    return (
        <View style={ {...style.cardContainer, ...props.style} }>
            {props.children}
        </View>
    )
}

const style = StyleSheet.create({
    cardContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.35,
        shadowRadius: 7.50,
        elevation: 12,
        borderColor: "#f8f8f8",
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white'
    }
})