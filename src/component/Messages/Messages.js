import firebase from "../../firebase/config";

 // sender message
 export const SenderMessages = async (msgValue,currentUserId, guestUserId,img) => {
     try {
        return await firebase.database()
        .ref(`messages/${currentUserId}`)
        .child(guestUserId)
        .push({
            message: {
                sender: currentUserId,
                receiver: guestUserId,
                msg:msgValue,
                img:img
            }
        })
     } catch (error) {
         console.log(error)
     }
 }
 // receiver message'
 export const ReceiverMessages = async (msgValue,currentUserId, guestUserId,img) => {
    try {
       return await firebase.database()
       .ref(`messages/${guestUserId}`)
       .child(currentUserId)
       .push({
           message: {
               sender: currentUserId,
               receiver: guestUserId,
               msg:msgValue,
               img:img
           }
       })
    } catch (error) {
        console.log(error)
    }
}
 
 