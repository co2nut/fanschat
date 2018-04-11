import {
  CHATROOM_FETCH_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {
  summary: null,
};

export default(state = INITIAL_STATE, action) => {
 switch (action.type){
   case CHATROOM_FETCH_SUCCESS:
      return { ...state, summary:action.payload };
    default:
      return state;
   }
};
