import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView,View ,Text, Button, Alert, FlatList } from 'react-native';
import firebase from '../../firebase/config';
import {uid} from '../../utility/constants/const';
import {Store} from '../../redux/store/store';
import {STARTER, FINISH} from '../../redux/actions/types';
import ShowUsers from '../users/showUsers';
import Profile from '../Profile/Profile';
import ImagePicker from 'react-native-image-picker';
import { UpdateUser } from '../../auth';

const Dashboard = ({navigation}) => {
    const globalState = useContext(Store)
    const {dispatchLoaderAction} = globalState;

    const [userInfo,setUserInfo] = useState({
        id: '',
        name: '',
        userImg: ''
    })
    const {name,userImg} = userInfo;
    const [allUsers,setAllUsers] = useState([])
    useEffect(() => {
        dispatchLoaderAction({
            type: STARTER
        })
        try {
            firebase.database().ref('users').on('value',(allUsers) => {
                let users = []
                let currentUser = {
                    id: '',
                    name: '',
                    userImg: ''
                }
                allUsers.forEach((aUser) => {
                    if (uid === aUser.val().uid) {
                        currentUser.id = uid;
                        currentUser.name = aUser.val().name;
                        currentUser.userImg = aUser.val().userImg;
                    } else {
                        users.push({
                            id: aUser.val().uid,
                            name: aUser.val().name,
                            userImg: aUser.val().userImg
                        })
                    }
                })
                // update state
                setUserInfo(currentUser)
                setAllUsers(users)
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
    // handle onNameTap event
    const nameTap = (name,userImg) => {
        navigation.navigate('UserProfile',{
            name,
            img: userImg
        })
    }
    const openChatRoom = (name,userImg,guestUserId) => {
        navigation.navigate('ChatRoom',{
            name,
            img:userImg,
            guestUserId,
            currentUserId:uid
        })
    }
    return (
        <SafeAreaView>
            <FlatList alwaysBounceVertical={false} 
            data={allUsers}
            keyExtractor={(_,index) => {index.toString()}}  
            ListHeaderComponent={<Profile 
            onEditImgTap={() => selectPhotoTapped()}
                img={userImg} name={name}/>}
            renderItem={({item}) => (
                <ShowUsers 
                name={item.name} 
                img={item.userImg}
                onNameTap={() => nameTap(item.name,item.userImg)}
                goToChatRoom={() => openChatRoom(item.name,item.userImg,item.id)}/>
            )}/>

            <Button title="logout" 
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
            ],{cancelable:true})}/>
        </SafeAreaView>
    )
}

export default Dashboard
