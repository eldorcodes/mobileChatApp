import React,{Fragment} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Thumbnail} from 'native-base';
import UserLogo from '../../utility/images/userlogo.png';

const UserProfile = ({route,navigation}) => {
    const {params} = route;
    const {name,img} = params;

    return (
        <Fragment>
            {img ? (
                <View>
                    <Thumbnail style={styles.image}
                     source={{uri:img}} resizeMode="cover"/>
                    <Text style={styles.text}>{name}</Text>
                </View>
            ) : (
                <View>
                    <Thumbnail style={styles.image} 
                    source={UserLogo} resizeMode="cover"/>
                    <Text style={styles.text}>{name}</Text>
                </View>
            )}
        </Fragment>
    )
}
const styles = StyleSheet.create({
    image: {
        width:200,
        height:200,
        marginLeft:100,
        marginTop:20,
        marginBottom:10
    },
    text: {
        fontSize: 20,
        fontWeight:"bold",
        textAlign:"center"
    }
})
export default UserProfile
