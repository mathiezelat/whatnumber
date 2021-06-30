import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/colors'

export const Input = ({style = {}, ...props})=>{
    return (
    <TextInput 
    style={{...styles.input, ...style}} 
    {...props} />
    )
}
const styles = StyleSheet.create({
    input: {
        height: 30,
        borderColor: Colors.primary,
        borderBottomWidth: 2,
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'center'
    },
})