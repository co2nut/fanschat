import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
   EMAIL_CHANGED,
   PASSWORD_CHANGED,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAIL,
   LOGIN_USER,
   MENU_PRESS,
   SIGN_UP,
   SWITCH_ACCOUNT
 } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
};

export const showMenu = () => {
  return {
    type: MENU_PRESS
    // payload: text
  }
};

export const signUpRoute = () => {
  return (dispatch) => {
    dispatch({ type:SIGN_UP });

    Actions.signup();

  };
}

export const switchAccRoute = () => {
  return (dispatch) => {
    dispatch({ type:SWITCH_ACCOUNT });

    Actions.loginFull();

  };
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type:LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => loginUserFail(dispatch, error.message));
  };
}

export const checkLogin = () => {
    return (dispatch) => {
      dispatch({ type:LOGIN_USER });

    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         dispatch({
           type: LOGIN_USER_SUCCESS,
           payload: user
         });
         Actions.reset('tabbar');
         // Actions.chatMain();
       }else{
         dispatch({
           type: LOGIN_USER_FAIL
         });
       }
     });
   }
}

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    message: error });
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.reset('tabbar');
  // Actions.chatMain();
}
