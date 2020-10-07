import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Text, Alert, FlatList } from 'react-native';
import {Container,Content, Footer, FooterTab, Button, Icon} from 'native-base';
import firebase from '../../firebase/config';
import {uid} from '../../utility/constants/const';
import {Store} from '../../redux/store/store';
import {STARTER, FINISH} from '../../redux/actions/types';
import ShowUsers from '../users/showUsers';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', 
    // TODO: Remove when fixed
  ])

const Dashboard = ({navigation}) => {
    const globalState = useContext(Store)
    const {dispatchLoaderAction} = globalState;

    useLayoutEffect(() => {
        navigation.setOptions({
        headerTitle: <Text>Users</Text>
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
                        users.push({
                            id: aUser.val().uid,
                            name: aUser.val().name,
                            gender: aUser.val().gender,
                            age: aUser.val().age,
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
    // handle onNameTap event
    const nameTap = (name,gender,age,userImg) => {
        navigation.navigate('UserProfile',{
            name,
            gender,
            age,
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
           <Container>
           <Content>
           <FlatList 
            alwaysBounceVertical={false} 
            data={allUsers}
            key={(item) => {item.id}}
            keyExtractor={(_,index) => {index.toString()}} 
                renderItem={({item}) => (
            <ShowUsers 
                name={item.name}
                gender={item.gender}
                age={item.age} 
                img={item.userImg}
                onNameTap={() => nameTap(item.name,item.gender,item.age,item.userImg)}
                goToChatRoom={() => openChatRoom(item.name,item.userImg,item.id)}/>
            )}/>
            
           </Content>
           <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" type="MaterialIcons"/>
            </Button>
            <Button active>
              <Icon active name="chat-bubble" type="MaterialIcons"/>
            </Button>
            <Button>
              <Icon name="person" type="MaterialIcons"
              onPress={() => {
                  navigation.navigate('MainProfile',{
                      id:uid,
                      name:name,
                      gender:gender,
                      age:age,
                      img:userImg

                  })
              }}/>
            </Button>
          </FooterTab>
        </Footer>
           </Container>
    )
}

export default Dashboard
