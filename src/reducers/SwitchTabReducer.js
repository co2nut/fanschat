import {
  USR_TAB,
  MSG_TAB
} from '../actions/types';

const INITIAL_STATE = {
  usr: true,
  msg: false,
};

export default(state = INITIAL_STATE, action) => {
 switch (action.type){
    // case SIGN_UP:
    //action.payload === { prop: 'name', value: 'jane' }
    // return { ...state,[action.payload.prop]: action.payload.value }
    case USR_TAB:
      return { ...state, usr: true, msg: false };
    case MSG_TAB:
      return { ...state, msg: true, usr: false };
    default:
      return state;
   }
};
