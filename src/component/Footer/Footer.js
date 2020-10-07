import React from 'react';
import { View, Text } from 'react-native';
import {Container, Footer, FooterTab, Button, Icon} from 'native-base';

 const MainFooter = ({navigation}) => {
    return (
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
    )
}

export default MainFooter
