import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  // state = ({ loggedIn: null })
  componentWillMount(){

    const config = {
      apiKey: 'AIzaSyCFpgKR0PXZP_LR9d9L1pHeOfiQf9J1ufk',
      authDomain: 'chat-app-beta-001.firebaseapp.com',
      databaseURL: 'https://chat-app-beta-001.firebaseio.com',
      projectId: 'chat-app-beta-001',
      storageBucket: 'chat-app-beta-001.appspot.com',
      messagingSenderId: '385279743132'
    };


    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
