import { combineReducers } from 'redux';
import ChatReducer from './ChatReducer';
import ChatSummaryReducer from './ChatSummaryReducer';
import SelectionReducer from './SelectionReducer';
import AuthReducer from './AuthReducer';
import SignupReducer from './SignupReducer';
import SwitchTabReducer from './SwitchTabReducer';
import AddContactReducer from './AddContactReducer';
import PhoneBookReducer from './PhoneBookReducer';
import ChatMessageReducer from './ChatMessageReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
  auth: AuthReducer,
  signUp: SignupReducer,
  chats: ChatReducer,
  chatSummaries: ChatSummaryReducer,
  selectedChatId: SelectionReducer,
  switchTab: SwitchTabReducer,
  addContact: AddContactReducer,
  phoneBook: PhoneBookReducer,
  chatMessages: ChatMessageReducer,
  profile: ProfileReducer
});
