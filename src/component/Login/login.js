import React, {useState, useContext} from 'react';
import { SafeAreaView, Text, StyleSheet,
    Button, TextInput, Image, Alert, 
    TouchableWithoutFeedback,
    Keyboard} from 'react-native';
import Logo from '../../utility/images/chat.png'
import { Store } from '../../redux/store/store';
import { STARTER, FINISH } from '../../redux/actions/types';
import loginRequest from '../../auth/login/login';
import { setAsyncData, key } from '../../asyncStorage/async';
import { setUniqueValue } from '../../utility/constants/const';
import { View } from 'native-base';

const login = ({navigation}) => {
    const globalState = useContext(Store)
    const {dispatchLoaderAction} = globalState;

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
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
            <TextInput style={styles.input} placeholder="email address"
            onChangeText={(email) => {
                setEmail(email)
            }} value={email} 
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>
            <TextInput style={styles.input} placeholder="password"
            onChangeText={(password) => {
                setPassword(password)
            }} value={password} secureTextEntry={true} 
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>

            <Button style={styles.btn} title="Login" 
            onPress={() => {
                if (!email) {
                    Alert.alert('Type your email!')
                }
                if (!password) {
                    Alert.alert('Type your password!')
                }else{
                    dispatchLoaderAction({
                        type: STARTER
                    })
                    loginRequest(email,password)
                    .then((res) => {
                        setAsyncData(key.uid,res.user.uid)
                        setUniqueValue(res.user.uid)
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
                }
            }}/>
            <Button title="Need an account?" 
            onPress={() => navigation.navigate('SignUp')}/>
        </SafeAreaView>
            </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderWidth: 1,
        margin: 10,
        padding: 10
    },
    btn: {
        borderWidth: 1,
        margin: 5
    },
    img: {
        width: 'auto'
    }
})
export default login
