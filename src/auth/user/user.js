import firebase from '../../firebase/config';
import { Alert } from 'react-native';

export const AddUser = async (name,email,uid,userImg) => {
    try {
        return await firebase.database().ref(`users/${uid}`)
        .set({
            name:name,
            email:email,
            uid:uid,
            userImg:userImg
        })
    } catch (error) {
        return error;
    }
}
export const UpdateUser = async (uid,imgUrl) => {
    try {
        return await firebase.database()
        .ref(`users/${uid}`)
        .update({
            userImg: imgUrl
        })
    } catch (error) {
        Alert.alert(error)
    }
}