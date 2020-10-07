import React, {useState, useContext} from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, Image, Alert, 
    TouchableWithoutFeedback,
    Keyboard} from 'react-native';
import { Container, Header, Content,
    Form, Item, Input, Label, Button, Icon } from 'native-base';
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
           <Container>
               <Content>
               <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(email) => {
                setEmail(email)
            }} value={email} 
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>
            </Item>

            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(password) => {
                setPassword(password)
            }} value={password} secureTextEntry={true} 
            onFocus={() => {handleFocus()}} 
            onBlur={() => {handleBlur()}}/>
            </Item>

            <Button style={styles.loginBtn} full primary onPress={() => {
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
            }}>
                  <Text style={styles.loginTxt}>Login</Text>
                  <Icon name="arrow-forward" type="MaterialIcons"/>
            </Button>
                <Text style={styles.needAnAccount} 
                onPress={() => navigation.navigate('SignUp')}>Need an account?</Text>
          </Form>
               </Content>
           </Container>
        </SafeAreaView>
            </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginBtn: {
        marginTop:20,
        marginBottom:5
    },
    img: {
        width: 'auto'
    },
    loginTxt:{
        color:'white',
        fontWeight:"bold"
    },
    needAnAccount: {
        alignSelf:"center",
        color:"blue",
        marginTop:5
    }
})
export default login
