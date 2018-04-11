import _ from 'lodash';
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { CardSection, Card, Button, Input } from '../components/common';
import ChatMessage from '../components/common/ChatMessage';
import { connect } from 'react-redux';
import { showMenu, chatRoomFetch,  } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';


class ChatMain extends Component {
  componentWillMount(){
    this.props.chatRoomFetch();
  }

  componentDidUpdate(){
    // console.log('c');
  }

  onPressMenu(){
    Actions.addContact();
  }

  onSignOut(){
    firebase.auth().signOut();
    Actions.reset('loginMain');
  }

  renderRow(chatSummary){
    return <ChatMessage chatSummary={chatSummary}/>
  }

  render() {
    let flatListContent = <FlatList
      data={this.props.summary}
      keyExtractor={item => item.uid}
      renderItem={({item})=>this.renderRow(item) }
    />;

    let mainContent = <View>
    <CardSection >
      <Input
        style={{fontSize: 15, alignSelf: 'center', paddingRight: 10, paddingLeft: 10}}
        label={<Icon
          name="search"
          size={25}
          color="#9D9D93"
          />}
        placeholder="Search for people and groups"
      />
      <Icon
        name="filter"
        size={25}
        color="#9D9D93"
        style={{marginTop:8, marginRight:5}}
      />
    </CardSection>
    </View>;

    let menu = <CardSection style={styles.loginMenu}>
      <View style={styles.loginMenuItem}>
        <TouchableOpacity>
          <Text style={styles.loginMenuItemText} onPress={this.onPressMenu.bind(this)}>Add Contact</Text>
          <Text style={styles.loginMenuItemText} onPress={this.onSignOut.bind(this)}>Logout</Text>
        </TouchableOpacity>
      </View>
    </CardSection>

    if(this.props.menuPress){
      return (
          <View>
            {menu}
            {/*mainContent*/}
            {flatListContent}
          </View>
      );
    }
      return (
        <View>
          {/*mainContent*/}
          {flatListContent}
        </View>
      );

  }
}


const styles = {
  loginMenu: {
    position: 'absolute',
    alignSelf: 'flex-end',
    flex:1,
    flexDirection: 'column',
    borderWidth: 1,
    height: 90,
    width: 150,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor:'#000',
    shadowOffset:{ width: 0, height: 2 },
    shadowOpacity: 0.2,
    padding:10,
    paddingHorizontal:20,
    marginTop: 0,
    backgroundColor: '#fff',
    zIndex: 1,
  },

  loginMenuItem: {
    flex: 1,
  },

  loginMenuItemText: {
      fontSize: 16,
      lineHeight: 35,
      // padding: 8,
      // fontWeight: 'bold'

  },

}

const mapStateToProps  = ({ chatSummaries, auth }) => {
  // const summary = _.map(chatSummaries.summary, (val, uid) => {
  //   return { ...val, uid };
  // });

  const { menuPress } = auth;
  const { summary } = chatSummaries;
  return {  summary, menuPress } ;
}

export default connect(mapStateToProps, { chatRoomFetch })(ChatMain);
