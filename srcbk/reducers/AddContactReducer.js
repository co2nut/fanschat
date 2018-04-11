import {
  EMAIL_CHANGED,
  ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL
 } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  error: '',
  loading: false
 };

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case ADD_CONTACT:
      return { ...state, loading: true, error: '' };
    case ADD_CONTACT_SUCCESS:
      return { ...state,
        user: action.payload,
        error: '',
        loading: false,
        email: '',
        password: ''
      };
    case ADD_CONTACT_FAIL:
      return { ...state,
        error: action.message,
        loading: false,
        password: '' };
    default:
      return state;
  }
};
