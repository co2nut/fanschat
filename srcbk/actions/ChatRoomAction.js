import {
  MESSAGE_CHANGED,
  CHATMESSAGE_FETCH_SUCCESS,
  CHATMESSAGE_SEND_MESSAGE,
  CHATMESSAGE_LOAD_MESSAGE,
  CHATMESSAGE_APPEND_SUCCESS,
  CHATMESSAGE_LOAD_ROOMKEY,
  CHATMESSAGE_LEAVE_ROOM
} from './types';

import _ from 'lodash';
import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';

export const messageChanged = (text) => {
  return {
    type: MESSAGE_CHANGED,
    payload: text
  }
};

export const leaveRoom = () => {
  return (dispatch) => {
    dispatch({ type:CHATMESSAGE_LEAVE_ROOM });
  };
};

export const loadMessage = (roomKey, loadCount) => {
  // debugger;
  // console.log('from load' + ':' + roomKey);
  const db = firebase.database();
  let chatMessages = [];

  return (dispatch) =>{
    dispatch({ type:CHATMESSAGE_LOAD_MESSAGE});
    // return new Promise( (resolve, reject) => {
      // return (dispatch) =>{
        // dispatch({ type:CHATMESSAGE_LOAD_MESSAGE});
        loadCount += 1;
        // return new Promise( (resolve, reject) => {
        db.ref(`chatRoomMessages/${roomKey}/messages/`)
        .orderByChild('time')
        .limitToLast(loadCount*20)
        .on('value', messages => {
          if(messages.val()){
            chatMessages = _.orderBy(messages.val(), ['time'], ['asc']);
            chatMessages = _.reverse(chatMessages)
          }
          dispatch({ type:CHATMESSAGE_APPEND_SUCCESS, chatMessages, loadCount });
          // resolve();

        })
      // }
    // })
  }
}

export const chatMessageFetch = (contactId, loadCount, contactEmail) => {
  // console.log('from fetch');
  const db = firebase.database();
  const { currentUser } = firebase.auth();

  let roomKey = null;
  let chatMessages = [];
  var promises = [];

  return (dispatch) =>{
    // dispatch({ type:CHATMESSAGE_LOAD_MESSAGE});
    return new Promise( (resolve, reject) => {
      db.ref(`users/${currentUser.uid}/chatRooms/keys`).on('value', chatRooms => {
        chatRooms.forEach( chatRoom => {
            //compare each with contact's roommKey
            db.ref(`users/${contactId}/chatRooms/keys/${chatRoom.key}`).on('value', snapShot => {
              //roomKey found
              if(snapShot.val()){
                roomKey = chatRoom.key;
                // dispatch({ type:CHATMESSAGE_LOAD_ROOMKEY, roomKey });
                // console.log('from fetch' + ':' + roomKey);
                db.ref(`chatRoomMessages/${roomKey}/messages/`)
                .orderByChild('time')
                .limitToLast( 20 )
                .on('value', messages => {
                  if(messages.val()){
                    // chatMessages = messages.val();
                    chatMessages = _.orderBy(messages.val(), ['time'], ['asc']);
                    chatMessages = _.reverse(chatMessages)
                    // console.log(chatMessages);
                  }
                    dispatch({ type:CHATMESSAGE_FETCH_SUCCESS, roomKey, chatMessages, loadCount:1, contactEmail, loading:true });
                    resolve();
                });
              }
            })
        })
      })
    })
  }
};

export const chatMessageSend = ({ messageInput, roomId, contact, contactEmail, messageType, downloadURL, localURL, chatRoomKey }) => {
  const db = firebase.database();
  const { currentUser } = firebase.auth();
  let receiverEmail = '';
  let receiverId = '';
  let contactUnread = 0;
  //get email
  // db.ref(`/contactList/${currentUser.uid}/contacts/${contact}/email`).on('value', snapShot => {
  //     receiverEmail = snapShot.val();
  // });

  var updateRoomInfo = {
    sender  : currentUser.uid,
    email   : currentUser.email,
    content : messageInput,
    time    : firebase.database.ServerValue.TIMESTAMP,
    readStatus: 'pending',
    receiverEmail: contactEmail,
    receiverId : contact,
    unread: 0

  };

  //update message status on chatRoomInfo
  db.ref(`/chatRoomInfo/${roomId}`)
    .update(
      updateRoomInfo
    );

  // update sender chatRooms detail
  db.ref(`/users/${currentUser.uid}/chatRooms/info/${roomId}`)
    .update(
      updateRoomInfo
    );


  //get contact unread
  db.ref(`/users/${contact}/chatRooms/info/${roomId}`)
  .once('value', snap =>{
    if(snap.val()){
        contactUnread = snap.val().unread + 1;
        updateRoomInfo['unread'] = contactUnread;
    }
    // update receiver chatRooms detail
    db.ref(`/users/${contact}/chatRooms/info/${roomId}`)
    .update(
      updateRoomInfo
    );
  })


  //push message to chatMessages
  if(chatRoomKey){
    db.ref(`/chatRoomMessages/${roomId}/messages/${chatRoomKey}`)
    .update(
      {
        sender  : currentUser.uid,
        email   : currentUser.email,
        content : messageInput,
        time    : firebase.database.ServerValue.TIMESTAMP,
        messageType,
        localURL,
        downloadURL
      }
    );
  }else{
    db.ref(`/chatRoomMessages/${roomId}/messages`)
    .push(
      {
        sender  : currentUser.uid,
        email   : currentUser.email,
        content : messageInput,
        time    : firebase.database.ServerValue.TIMESTAMP,
        messageType,
        localURL,
        downloadURL
      }
    );
  }

  return (dispatch) => {
    return new Promise( (resolve, reject) => {
      dispatch({ type:CHATMESSAGE_SEND_MESSAGE });

      resolve()
    });
  }
}

export const resetUnread = ({ contact, roomId }) => {
  const db = firebase.database();
  const { currentUser } = firebase.auth();
  //reset only if has existing message
  return (dispatch) =>{
    db.ref(`/users/${currentUser.uid}/chatRooms/info/${roomId}`)
    .once('value', snap =>{
      if(snap.val()){
        //update sender chatRooms detail
        db.ref(`/users/${currentUser.uid}/chatRooms/info/${roomId}`)
          .update({
              unread : 0
            }
          );
      }
    })

  }
}
