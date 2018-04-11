import {
  PROFILE_NAME_CHANGED,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  INIT_PROFILE,
  UPDATING_PROFILE
} from './types';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const nameChange = (text) => {
  return {
    type: PROFILE_NAME_CHANGED,
    payload: text
  }
};

// export const initProfile = () => {
//   // Actions.reset('tabbar');
//   const db = firebase.database();
//   const { currentUser } = firebase.auth();
//   let email = currentUser.email;
//   let name = '';
//
//   return (dispatch) => {
//     // db.ref(`users/${currentUser.uid}/chatRooms/keys`).on('value', chatRooms => {
//     db.ref(`profiles/${currentUser.uid}`).on('value', snap =>{
//       if(snap.val()){
//         name = snap.val().name;
//       }else{
//         name = 'not found';
//       }
//       initProfileSuccess(dispatch,email,name);
//     })
//   }
// };
//
// const initProfileSuccess = (dispatch, email, name) => {
//   dispatch({
//     type: INIT_PROFILE,
//     email,
//     name
//   });
// }

export const updateProfile = ({ name, imageUrl }) => {
  const db = firebase.database();
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({type: UPDATING_PROFILE});
    //update message status on chatRoomInfo
    db.ref(`/profiles/${currentUser.uid}`)
    .update({
      name,
      email: currentUser.email,
      time : firebase.database.ServerValue.TIMESTAMP,
      imageUrl
    })
    .then(()=>{updateProfileSuccess(dispatch, name, imageUrl)})
    .catch(error => updateProfileFail(dispatch, error.message));

  };

}

const updateProfileFail = (dispatch, error) => {
  dispatch({
    type: UPDATE_PROFILE_FAIL,
    payload: error
  });
  // Actions.chatMain();
}

const updateProfileSuccess = (dispatch, name, imageUrl) => {
  dispatch({
    type: UPDATE_PROFILE_SUCCESS,
    name,
    imageUrl
  });
  // Actions.chatMain();
}
