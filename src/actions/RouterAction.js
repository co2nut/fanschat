import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
   INIT_PROFILE,
 } from './types';


export const tabPress = () => {
  const db = firebase.database();
  const { currentUser } = firebase.auth();
  let email = currentUser.email;
  let name = '';
  let imageUrl = '';

  return (dispatch) => {
    db.ref(`profiles/${currentUser.uid}`).on('value', snap =>{
      if(snap.val()){
        name = snap.val().name;
        imageUrl = snap.val().imageUrl;
      }
      initProfileSuccess(dispatch, email, name, imageUrl);
    })
  }
}

const initProfileSuccess = (dispatch, email, name, imageUrl) => {
  dispatch({
    type: INIT_PROFILE,
    email,
    name,
    imageUrl
  });
  Actions.profile();
}
