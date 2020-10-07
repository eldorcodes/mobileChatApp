import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Text, Alert } from 'react-native';
import { Icon, Container, Content, Footer, FooterTab, Button} from 'native-base';
import firebase from '../../firebase/config';
import {uid} from '../../utility/constants/const';
import {Store} from '../../redux/store/store';
import {STARTER, FINISH} from '../../redux/actions/types';
import Profile from '../Profile/Profile';
import ImagePicker from 'react-native-image-picker';
import { UpdateUser } from '../../auth';

const MainProfile = ({navigation}) => {
    const globalState = useContext(Store)
    const {dispatchLoaderAction} = globalState;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                type="AntDesign"
                  name="logout"
                  size={26}
                  color="white"
                  style={{ right: 10 }}
                  onPress={() => Alert.alert('Logout','Do you want to log out?',[
                    {
                        text: 'Yes',
                        onPress: () => firebase.auth().signOut().then(() => {
                            navigation.replace('Login')
                        }).catch((err) => {
                            Alert.alert(err)
                        })
                    },
                    {
                        text: 'No'
                    }
                ],{cancelable:true})}
                />
              ),
        headerTitle: <Text>Profile</Text>
        })
    },[navigation])

    const [userInfo,setUserInfo] = useState({
        id: '',
        name: '',
        gender: '',
        age: '',
        userImg: ''
    })
    const {name,gender,age,userImg} = userInfo;
    useEffect(() => {
        dispatchLoaderAction({
            type: STARTER
        })
        try {
            firebase.database().ref('users').on('value',(allUsers) => {
                let currentUser = {
                    id: '',
                    name: '',
                    gender:'',
                    age:'',
                    userImg: ''
                }
                allUsers.forEach((aUser) => {
                    if (uid === aUser.val().uid) {
                        currentUser.id = uid;
                        currentUser.name = aUser.val().name;
                        currentUser.gender = aUser.val().gender;
                        currentUser.age = aUser.val().age;
                        currentUser.userImg = aUser.val().userImg;
                    } else {
                        // no need users in this page
                    }
                })
                // update state
                setUserInfo(currentUser)
                dispatchLoaderAction({
                    type: FINISH
                })
            })
        } catch (error) {
            dispatchLoaderAction({
                type: FINISH
            })
            Alert.alert(error)
        }
    },[])
    // handle select photo tapped method
    const selectPhotoTapped = () => {
        const option = {
            storageOptions: {
                skipBackup:true
            }
        }
        ImagePicker.launchImageLibrary(option,(res) => {
            if (res.didCancel) {
                console.log('User canceled image picker')
            } 
            else if(res.error){
                console.log(res.error)
            }
            else {
                // upload image
                let src = `data:image/jpeg;base64,${res.data}`;
                dispatchLoaderAction({
                    type: STARTER
                })
                UpdateUser(uid,src)
                .then(() => {
                    // success
                    setUserInfo({
                        ...userInfo,
                        userImg:src
                    })
                    dispatchLoaderAction({
                        type: FINISH
                    })
                }).catch((err) => {
                    Alert.alert(err)
                })
            }
        })
    }
    return (
           <Container>
           <Content>
           <Profile 
                onEditImgTap={() => selectPhotoTapped()}
                img={userImg} 
                name={name}
                gender={gender}
                age={age}/>
           </Content>
           <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" type="MaterialIcons"/>
            </Button>
            <Button>
              <Icon name="chat-bubble" type="MaterialIcons"
              onPress={() => {
                  navigation.replace('Dashboard')
              }}/>
            </Button>
            <Button active>
              <Icon active name="person" type="MaterialIcons"/>
            </Button>
          </FooterTab>
        </Footer>
           </Container>
    )
}

export default MainProfile
