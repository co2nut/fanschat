import {
  PROFILE_NAME_CHANGED,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  INIT_PROFILE,
  UPDATING_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  name: '',
  user: null,
  loading: false,
  name: '',
  imageUrl: ''

};

export default(state = INITIAL_STATE, action) => {
 switch (action.type){
    // case SIGN_UP:
    //action.payload === { prop: 'name', value: 'jane' }
    // return { ...state,[action.payload.prop]: action.payload.value }

    case INIT_PROFILE:
      return { ...state,
        email: action.email,
        name: action.name,
        imageUrl: action.imageUrl
        };
    case UPDATING_PROFILE:
      return { ...state,
        loading: true
        };
    case PROFILE_NAME_CHANGED:
      return { ...state,
        name: action.payload,
        error:'',
        };
    case UPDATE_PROFILE:
      return { ...state, loading: true, error: '' };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state,
        user: action.payload,
        error: '',
        loading: false,
        name:action.name,
        imageUrl:action.imageUrl
        // name: ''
      };
    case UPDATE_PROFILE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload,
        name: '' };
    default:
      return state;
   }
};
