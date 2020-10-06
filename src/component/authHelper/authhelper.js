import React, {useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import Logo from '../../utility/images/chat.png'
import { getAsyncData, key } from '../../asyncStorage/async';
import { setUniqueValue } from '../../utility/constants/const';

const AuthHelper = ({navigation}) => {
    useEffect(() => {
        const redirect = setTimeout(() => {
            getAsyncData(key.uid)
            .then((uid) => {
                if (uid) {
                    setUniqueValue(uid)
                    navigation.replace('Dashboard')
                } else {
                    navigation.replace('Login')
                }
            })
            .catch((err) => {
                console.log(err)
                navigation.replace('Login')
            })
        },3000)
        return () => {
            clearTimeout(redirect)
        }
    },[navigation])
    return (
        <View>
            <Image source={Logo}/>
        </View>
    )
}

export default AuthHelper;
