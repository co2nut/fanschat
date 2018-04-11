import {
  SIGN_UP,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL
} from './types';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const signUp = ({ prop, value }) => {
  return {
      type: SIGN_UP,
      payload: { prop ,value }
  }
};

export const signUpUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type:SIGNUP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signUpUserSuccess(dispatch, user))
      .catch(error => signUpUserFail(dispatch, error.message));
  };
}

const signUpUserFail = (dispatch, error) => {
  dispatch({
    type: SIGNUP_USER_FAIL,
    payload: error
  });
}

const signUpUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  });
  Actions.chatMain();
}
