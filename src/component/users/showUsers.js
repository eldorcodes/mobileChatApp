import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {List,ListItem,Left,Body,Thumbnail,Right,Icon} from 'native-base';
import UserLogo from '../../utility/images/userlogo.png';

const ShowUsers = ({name,gender,age,img,onNameTap,goToChatRoom}) => {
    return (
        <List>
            <ListItem thumbnail>
              <Left>
                <TouchableOpacity onPress={onNameTap}>
                {img? (
                    <Thumbnail source={{uri:img}} />
                ):(
                    <Thumbnail source={UserLogo} />
                )}
                </TouchableOpacity>
              </Left>
              <Body>
                <Text onPress={onNameTap}>{name}</Text>
                <Text note>{gender} {age}</Text>
              </Body>
              <Right>
              <Icon onPress={goToChatRoom} 
                    name="arrow-forward" type="MaterialIcons"/>
              </Right>
            </ListItem>
          </List>
    )
}

export default ShowUsers
