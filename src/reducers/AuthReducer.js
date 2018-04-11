import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  MENU_PRESS,
  SIGN_UP,
  SWITCH_ACCOUNT
 } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false,
  menuPress: false,
  message : '',
 };

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        user: action.payload,
        error: '',
        loading: false,
        email: '',
        password: ''
      };
    case LOGIN_USER_FAIL:
      return { ...state, error:action.message, password: '', loading: false };
    case MENU_PRESS:
      return { ...state, menuPress: !state.menuPress };
    case SIGN_UP:
      return { ...state,
        menuPress: !state.menuPress };
    case SWITCH_ACCOUNT:
      console.log(menuPress);
      return { ...state, menuPress: !state.menuPress };
    default:
      return state;
  }
};
