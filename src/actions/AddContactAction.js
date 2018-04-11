import {
  ADD_EMAIL,
  ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL
} from './types';

import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

const ROOT_URL = 'https://us-central1-chat-app-beta-001.cloudfunctions.net';

export const addContact = ({ prop, value }) => {
  return {
      type: SIGN_UP,
      payload: { prop ,value }
  }
};


export const addEmail = ({ email }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type:ADD_CONTACT });

    axios.post(`${ROOT_URL}/createContact`, {
        email, useruid : currentUser.uid
    })
      .then( function(response){
        return response.data;
      })
      .then( function(data){
        console.log(data);
        firebase.database().ref(`/contactList/${currentUser.uid}/contacts/${data.contactUid}`)
          .update({ email:data.email });
        return data;
      })
      .then( function(data) {
        console.log(data);
        const chatRoomKey = firebase.database().ref(`chatRoom`).push().key;
        const update = {};
        update[`chatRooms/${chatRoomKey}/${currentUser.uid}`] = true;
        update[`chatRooms/${chatRoomKey}/${data.contactUid}`] = true;

        update[`users/${currentUser.uid}/chatRooms/keys/${chatRoomKey}/`] = true;
        update[`users/${data.contactUid}/chatRooms/keys/${chatRoomKey}/`] = true;

        return firebase.database().ref().update(update);

      })
      .then((data) => {
        console.log(data);

          dispatch({
            type: ADD_CONTACT_SUCCESS
          })
          Actions.chatMain();
      })
      .catch(error => addContactFail(dispatch, error.response.data.error));
  };
}

const addContactFail = (dispatch, error) => {
  console.log(error);
  dispatch({
    type: ADD_CONTACT_FAIL,
    message: error
  });
}

const addContactSuccess = (dispatch, uid, email) => {
  // console.log(uid, email);

  dispatch({
    type: ADD_CONTACT_SUCCESS,
    payload: user
  });
  Actions.chatMain();
}
