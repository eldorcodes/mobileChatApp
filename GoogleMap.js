import React from 'react';
import { View, StyleSheet,Image} from 'react-native';
import MapView,{
  Marker,
  Callout
} from 'react-native-maps';

import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Left,
    Icon } from 'native-base';
const GoogleMap = ({navigation}) => {
    return (
        <View style={styles.container}>
     <MapView
       style={styles.map}
       region={{
         latitude: 40.7128,
         longitude: -74.0060,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121
       }}
       maxZoomLevel={8}>
         <Marker coordinate={{
           latitude:40.650002,
           longitude:-73.949997
         }}>
           <Callout style={{width:100,height:150}}>
             <Image style={{width:100,height:100}} source={require('../../assets/images/woman-logo.png')}/>
             <Text style={{textAlign:'center'}}>User</Text>
           </Callout>
         </Marker>
     </MapView>
   </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      height:'100%'
    },
})
export default GoogleMap
