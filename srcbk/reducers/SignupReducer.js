import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGN_UP,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false,
  menuPress: false
};

export default(state = INITIAL_STATE, action) => {
 switch (action.type){
    // case SIGN_UP:
    //action.payload === { prop: 'name', value: 'jane' }
    // return { ...state,[action.payload.prop]: action.payload.value }

    case EMAIL_CHANGED:
      return { ...state,
        email: action.payload,
        error:'',
        };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    case SIGNUP_USER_SUCCESS:
      return { ...state,
        user: action.payload,
        error: '',
        loading: false,
        email: '',
        password: ''
      };
    case SIGNUP_USER_FAIL:
      return { ...state,
        loading: false,
        error: action.payload,
        password: '' };
    default:
      return state;
   }
};
