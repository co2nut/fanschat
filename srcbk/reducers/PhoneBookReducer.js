import {
  PHONEBOOK_FETCH_SUCCESS,
  CHATROOM_FETCH_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {
  phoneBookList : {},
  chatRoomId : ''
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case PHONEBOOK_FETCH_SUCCESS:
      // console.log(action.payload);
      return {...state, phoneBookList: action.payload};
    case CHATROOM_FETCH_SUCCESS:
      return { ...state, chatRoomId :action.chatRoomId};
    default:
      return state;
  }
};
