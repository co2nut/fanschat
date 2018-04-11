import {
  MESSAGE_CHANGED,
  CHATMESSAGE_FETCH_SUCCESS,
  CHATMESSAGE_SEND_MESSAGE,
  CHATMESSAGE_GET_ROOMKEY,
  CHATMESSAGE_LOAD_MESSAGE,
  CHATMESSAGE_APPEND_SUCCESS,
  CHATMESSAGE_LOAD_ROOMKEY,
  CHATMESSAGE_LEAVE_ROOM
 } from '../actions/types';

const INITIAL_STATE = {
  messages : null,
  contactId : '',
  messageInput : '',
  roomId : '',
  loading : false,
  loadCount : 1,
  contactEmail : ''
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case MESSAGE_CHANGED:
      return { ...state, messageInput:action.payload };
    case CHATMESSAGE_GET_ROOMKEY:
      return { ...state, roomId : action.roomKey};
    case CHATMESSAGE_FETCH_SUCCESS:
      return {
        ...state,
        roomId : action.roomKey,
        messages:action.chatMessages,
        loading:false,
        loadCount:1,
        contactEmail : action.contactEmail
       };
    case CHATMESSAGE_APPEND_SUCCESS:
      return { ...state, messages:action.chatMessages, loading:false, loadCount:action.loadCount };
    case CHATMESSAGE_SEND_MESSAGE:
      return { ...state,messageInput:'' };
    case CHATMESSAGE_LOAD_MESSAGE:
      return { ...state,loading:true };
    case CHATMESSAGE_LOAD_ROOMKEY:
      // console.log('roomkey changed');
      return { ...state,roomId:action.roomKey };
    case CHATMESSAGE_LEAVE_ROOM:
      return {
        ...state,
        message : null
      };
    default:
      return state;
  }
};
