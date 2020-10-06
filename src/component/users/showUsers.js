import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Card,CardItem,Left,Body,Thumbnail,Right} from 'native-base';
import UserLogo from '../../utility/images/userlogo.png';

const ShowUsers = ({name,img,onImgTap,onNameTap,goToChatRoom}) => {
    return (
        <Card>
            <CardItem>
                <Left>
                    <TouchableOpacity onPress={onImgTap}>
                        {
                            img ? (
                                <Thumbnail source={{uri:img}} 
                                resizeMode="cover"/>
                            ) : (
                            <Thumbnail source={UserLogo} 
                            resizeMode="cover"/>
                            )
                        }
                    </TouchableOpacity>
                    <Body>
                    <Text onPress={onNameTap}>{name}</Text>
                    </Body>
                </Left>
                <Right>
                    <Body>
                        <Text onPress={goToChatRoom}>Chat</Text>
                    </Body>
                </Right>
            </CardItem>
        </Card>
    )
}

export default ShowUsers
