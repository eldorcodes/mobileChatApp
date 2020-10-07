    import React, {useState, useContext} from 'react';
    import { SafeAreaView, Text,View, 
        StyleSheet, Image, Alert, TouchableWithoutFeedback,
    Keyboard } from 'react-native';
    import { Container, Header, Content,
        Form, Item, Input, Label, Button, Icon, Picker} from 'native-base';
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
        const [gender,setGender] = useState('female')
        const [age,setAge] = useState('21')
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
                Alert.alert('Email is required!')
            }
            if (!gender) {
                Alert.alert('Gender is required!')
            }
            if (!age) {
                Alert.alert('Age is required!')
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
                    AddUser(name,gender,age,email,uid,userImg)
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

                <Container>
                    <Content>
                <Item>
                    <Label>Name</Label>
                    <Input
                onChangeText={(name) => {setName(name)}} value={name} 
                onFocus={() => {handleFocus()}} 
                onBlur={() => {handleBlur()}}/>
                </Item>

            <Item>
                <Label>Gender</Label>
                <Form>
                <Picker
                mode="dropdown"
                iosHeader="Gender"
                iosIcon={<Icon name="arrow-down" type="SimpleLineIcons"/>}
                style={{ width: undefined }}
                selectedValue={gender}
                onValueChange={(gender) => {setGender(gender)}}
                >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                </Picker>
            </Form>
            </Item>

            <SafeAreaView>
            <Item>
                <Label>Age</Label>
                <Form>
                <Picker
                mode="dropdown"
                iosHeader="Age"
                iosIcon={<Icon name="arrow-down" type="SimpleLineIcons"/>}
                style={{ width: undefined }}
                selectedValue={age}
                onValueChange={(age) => {setAge(age)}}
                >
                <Picker.Item label="18" value="18" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="28" value="28" />
                <Picker.Item label="29" value="29" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="31" value="31" />
                <Picker.Item label="32" value="32" />
                <Picker.Item label="33" value="33" />
                <Picker.Item label="34" value="34" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="36" value="36" />
                <Picker.Item label="37" value="37" />
                <Picker.Item label="38" value="38" />
                <Picker.Item label="39" value="39" />
                <Picker.Item label="40+" value="40+" />
                </Picker>
            </Form>
            </Item>
            </SafeAreaView>

            <Item>
                <Label>Email</Label>
                <Input
                onChangeText={(email) => {setEmail(email)}} value={email}
                onFocus={() => {handleFocus()}} 
                onBlur={() => {handleBlur()}}/>
            </Item>

                <Item>
                    <Label>Password</Label>
                    <Input
                onChangeText={(password) => {setPassword(password)}} 
                value={password} secureTextEntry={true}
                onFocus={() => {handleFocus()}} 
                onBlur={() => {handleBlur()}}/>
                </Item>

                <Item>
                    <Label>Confirm Password</Label>
                    <Input  
                onChangeText={(confirmPwd) => {setConfirmPwd(confirmPwd)}}
                value={confirmPwd} secureTextEntry={true} 
                onFocus={() => {handleFocus()}} 
                onBlur={() => {handleBlur()}}/>
                </Item>

                <Button full
                onPress={registerUser}>
                    <Text style={styles.register}>Register</Text>
                </Button>

                <Text style={styles.needToLogin} 
                onPress={() => navigation.navigate('Login')}>
                    Need to login?
                </Text>

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
        img: {
            width: 'auto'
        },
        needToLogin: {
            alignSelf:'center',
            marginTop:5,
            color:'blue'
        },
        register:{
            color:'white',
            fontWeight:'bold'
        }
    })
    export default signup
