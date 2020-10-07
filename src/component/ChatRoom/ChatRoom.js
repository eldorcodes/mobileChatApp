import React,{useLayoutEffect, useState, useEffect, Fragment} from 'react';
import { View, Text, TouchableWithoutFeedback, 
    SafeAreaView , StyleSheet, 
    Alert, FlatList, Keyboard} from 'react-native';
import {Icon, Button} from 'native-base';
import ImagePicker from "react-native-image-picker";
import MessageInput from '../MessageInput/MessageInput';
import ChatMessages from '../ChatMessages/ChatMessages';
import firebase from '../../firebase/config';
import {fieldHeight,btnHeight } from '../../utility/styles/appStyle';
import { SenderMessages, ReceiverMessages } from '../Messages/Messages';

const ChatRoom = ({route, navigation}) => {
    const { params } = route;
    const { name, img, guestUserId, currentUserId} = params;
    const [msgValue,setMsgValue] = useState('');
    const [messages,setMessages] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
        headerTitle: <Text>{name}</Text>
        })
    },[navigation])
    useEffect(() => {
        try {
            firebase.database().ref('messages')
            .child(currentUserId)
            .child(guestUserId)
            .on('value',(msgData) =>{
                let msg = []
                msgData.forEach((child) => {
                    msg.push({
                        sender: child.val().message.sender,
                        receiver: child.val().message.receiver,
                        msg: child.val().message.msg,
                        img: child.val().message.img
                    })
                })
                setMessages(msg.reverse())
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    // handleOnChange method
    const handleOnChange = (text) => {
        setMsgValue(text)
    }
    const handleSend = () => {
        // store messages based on user ID
        setMsgValue("")
        if (msgValue) {
            SenderMessages(msgValue,currentUserId,guestUserId,"")
            .then(() => {})
            .catch((err) => Alert.alert(err))
            // receiver messages
            ReceiverMessages(msgValue,currentUserId, guestUserId,"")
            .then(() => {})
            .catch((err) => Alert.alert(err))
        }
    }
    const handleCamera = () => {
        const option = {
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(option, (response) => {
          if (response.didCancel) {
            console.log("User cancel image picker");
          } else if (response.error) {
            console.log(" image picker error", response.error);
          } else {
            // Base 64
            let source = "data:image/jpeg;base64," + response.data;
    
            SenderMessages(msgValue, currentUserId, guestUserId, source)
              .then(() => {})
              .catch((err) => alert(err));
    
            // * guest user
    
            ReceiverMessages(msgValue, currentUserId, guestUserId, source)
              .then(() => {})
              .catch((err) => alert(err));
          }
        });
      };
    return (
            <TouchableWithoutFeedback style={{flex:1}}
            onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                <Fragment>
                    <FlatList inverted
                    data={messages}
                    keyExtractor={(_,index) => index.toString()}
                    renderItem={({item}) => (
                        <ChatMessages
                        msg={item.msg}
                        userId={item.sender}
                        img={item.img}
                        onImgTap={() => imgTap(item.img)}/>
                    )}/>
                    <View style={styles.msgContainer}>
                    <MessageInput
                        style={styles.input} 
                        placeholder="Type a message"
                        value={msgValue}
                        onChangeText={(text) => handleOnChange(text)}/>
                        
                        <Icon style={styles.camera}
                        onPress={() => handleCamera()}
                        name="camera" type="AntDesign"/>

                        <Icon style={styles.sendBtn}
                        onPress={() => handleSend()}
                        name="arrow-forward" 
                        type="MaterialIcons"/>
                    </View>
                </Fragment>
                </SafeAreaView>
            </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    input: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: "50%"
    },
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    msgContainer: {
        flexDirection: "row",
        alignItems:"center",
        alignContent:"center",
        paddingRight:50
    },
    sendBtn: {
        marginTop: 10,
        padding:5,
        color: "white"
    },
    camera: {
        marginTop:10,
        padding:5,
        color:"white"
    }
})
export default ChatRoom
