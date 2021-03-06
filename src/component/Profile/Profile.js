import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import UserLogo from '../../utility/images/userlogo.png';

const Profile = ({img,name,gender,age,onNameTap,onEditImgTap}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onEditImgTap} activeOpacity={0.8}>
                {
                    img ? (
                        <Image style={styles.img} source={{uri:img}} 
                        resizeMode="cover"/>
                    ) : (
                        <Image style={styles.img} source={UserLogo} 
                        resizeMode="cover"/>
                    )
                }
            </TouchableOpacity>
            <Text onPress={onNameTap} style={styles.text}>{name}</Text>
            <Text onPress={onNameTap} style={styles.text}>{gender}</Text>
            <Text onPress={onNameTap} style={styles.text}>{age}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 30
    },
    container: {
        height: 154,
        width: 154,
        borderRadius: 77,
        borderWidth: 2,
        marginBottom: 50,
        marginLeft: 110,
        marginTop: 20
    },
    img: {
        height: 150,
        width: 150,
        borderRadius: 75
    }
})
export default Profile
