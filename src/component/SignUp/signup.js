import React, {useState, useContext} from 'react';
import { SafeAreaView, Text, Button,View, 
    StyleSheet, TextInput, Image, Alert, TouchableWithoutFeedback,
Keyboard } from 'react-native';
import Logo from '../../utility/images/chat.png'
import {Store} from '../../redux/store/store';
import { STARTER, FINISH } from '../../redux/actions/types';
import {AddUser} from '../../auth/user/user';
import signupRequest from '../../auth/signup/signup';
import {setAsyncData, key} from '../../asyncStorage/async';
import firebase from '../../firebase/config';
import {setUniqueValue} from '../../utility/constants/const';

const signup = ({navigation}) => {
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPwd,setConfirmPwd] = useState('')
    const [showLogo,toggleLogo] = useState(true)
    // declare vars
    const handleFocus = () => {
        setTimeout(() => {
            toggleLogo(false)
        }, 200);
    }
    const handleBlur = () => {
        setTimeout(() => {
            toggleLogo(true)
        }, 200);
    }
    registerUser = () => {
        if (!name) {
            Alert.alert('Name is required!')
        }
        if (!email) {
            Alert.alert('Email is required')
        }
        if (!password) {
            Alert.alert('Password is required!')
        }
        if (!confirmPwd) {
            Alert.alert('Confirm password!')
        }
        if (password !== confirmPwd) {
            Alert.alert('Password does Not match!')
        }else{
            dispatchLoaderAction({
                type: STARTER
            })
            signupRequest(email,password)
            .then(() => {
                // signup successfull
                let uid = firebase.auth().currentUser.uid;
                let userImg = '';
                AddUser(name,email,uid,userImg)
                .then(() => {
                    // user data stored successfully
                    setAsyncData(key.uid,uid)
                    setUniqueValue(uid)
                    dispatchLoaderAction({
                        type: FINISH
                    })
                    navigation.replace('Dashboard')
                }).catch((err) => {
                    dispatchLoaderAction({
                        type: FINISH
                    })
                    Alert.alert(err)
                })
            }).catch((err) => {
                dispatchLoaderAction({
                    type: FINISH
                })
                Alert.alert(err)
            })
        }

    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
            {
                showLogo && (
                    <View>
                        <Image source={Logo} style={styles.img}/>
                    </View>
                )
            }

            <TextInput placeholder="Name" style={styles.input}
            onChangeText={(name) => {setName(name)}} value={name} 
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>

            <TextInput placeholder="Email" style={styles.input}
            onChangeText={(email) => {setEmail(email)}} value={email}
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>

            <TextInput placeholder="Password" style={styles.input}
            onChangeText={(password) => {setPassword(password)}} 
            value={password} secureTextEntry={true}
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>

            <TextInput placeholder="Confirm Password" 
            style={styles.input} 
            onChangeText={(confirmPwd) => {setConfirmPwd(confirmPwd)}}
            value={confirmPwd} secureTextEntry={true} 
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>

            <Button title="Signup" 
            onPress={registerUser}/>
            <Button title="Need to login?" 
            onPress={() => navigation.navigate('Login')}/>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        width: 'auto'
    },
    input: {
        borderWidth: 1,
        margin: 8,
        padding: 8
    }
})
export default signup
