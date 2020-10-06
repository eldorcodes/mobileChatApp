import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Item, Input} from 'native-base';
import {fieldHeight} from '../../utility/styles/appStyle';

const MessageInput = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    onFocus,
    onBlur,
    ref,
    onSubmitEditing,
    getRef
}) => {
    return (
        <Item style={styles.inputContainer}>
            <Input style={styles.input}
            placeholder={placeholder} 
            placeholderTextColor="white"
            value={value} 
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            onBlur={onBlur}
            returnKeyType={"next"}
            ref={ref} 
            getRef={getRef}
            onSubmitEditing={onSubmitEditing}/>
        </Item>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        width: "90%",
        borderRadius:20,
        marginVertical:10,
        borderBottomWidth: 0,
        height: fieldHeight
    },
    input: {
        paddingLeft: 16,
        color: "white",
        position:"absolute",
        top: 0,
        width:"100%"
    }
})
export default MessageInput
