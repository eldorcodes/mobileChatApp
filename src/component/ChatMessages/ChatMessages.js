import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {Card, CardItem} from 'native-base';
import {uid} from '../../utility/constants/const';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {deviceWidth} from '../../utility/styles/appStyle';
import userLogo from '../../utility/images/userlogo.png';
const ChatMessages = ({userId, msg, img}) => {
    let isCurrentUser = userId === uid ? true : false;

    return (
       <Card transparent 
       style={{maxWidth:deviceWidth / 2 + 10,
       alignSelf: isCurrentUser ? "flex-end":"flex-start"}}>
           <View style={[styles.chatContainer,
        isCurrentUser && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
            backgroundColor: 'grey'
        }]}>
                {img? (
                    <CardItem>
                    <TouchableOpacity>
                        <Image source={{uri:img}} resizeMode="cover"
                        style={{height:200,width:deviceWidth/2}}/>
                    </TouchableOpacity>
                </CardItem>
                ):(<CardItem>
                    <TouchableOpacity>
                        <Image source={userLogo} resizeMode="cover"
                        style={{height:200,width:deviceWidth/2}}/>
                    </TouchableOpacity>
                </CardItem>)}
            
                <Text style={styles.chatMsg}>
                    {msg}
                </Text>
        
           </View>
       </Card>
    )
}
const styles = StyleSheet.create({
    chatContainer: {
        backgroundColor: 'grey',
        borderTopRightRadius: 20
    },
    chatMsg: {
        color: 'white',
        fontSize: 20,
        marginVertical: 5,
        fontWeight: '500',
        padding: 8
    }
})
export default ChatMessages
