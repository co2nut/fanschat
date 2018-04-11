import _ from 'lodash';
import {
  CHATROOM_FETCH_SUCCESS
} from './types';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const chatRoomFetch = () => {
  const db = firebase.database();
  const { currentUser } = firebase.auth();

  return (dispatch) =>{
    let roomKey = null;
    let chatMessages = [];
    //find roomKey through own roomKeys
    db.ref(`users/${currentUser.uid}/chatRooms/info`)
      .orderByChild("time")
      // .limitToLast(1)
      .on('value', snapshot => {
        var feed = [];

        let newArray = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });

        newArray.sort(function(a,b){
          if (a.time < b.time)
            return 1;
          if (a.time > b.time)
            return -1;
          return 0;
        });

        dispatch({ type:CHATROOM_FETCH_SUCCESS, payload: newArray });
    });

  }
};
