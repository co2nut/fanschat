import {
  PHONEBOOK_FETCH_SUCCESS,
  CHATROOM_FETCH_SUCCESS,
} from './types';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const phoneBookFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) =>{
    firebase.database().ref(`contactList/${currentUser.uid}/contacts`)
      .on('value', snapshot => {
          dispatch({ type:PHONEBOOK_FETCH_SUCCESS, payload: snapshot.val() })
      });
  }
};
