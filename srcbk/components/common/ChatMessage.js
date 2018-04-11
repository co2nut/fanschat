import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card, CardSection } from '../common';
import TimeAgo from 'react-native-timeago';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';


class ChatMessage extends Component{
    render() {
      const { sender, email, receiverId, receiverEmail, content, time, unread } = this.props.chatSummary;
      const { currentUser } = firebase.auth();
      let unreadDisplay = <View style={styles.statusUnread}>
        <Text style={styles.statusUnreadCount}>{unread}</Text>
      </View>;
      let contact = sender === currentUser.uid?receiverId:sender;
      let contactEmail = email === currentUser.email?receiverEmail:email;

        return (
          <CardSection style={{padding: 0, borderBottomWidth: 0}}>
            <TouchableOpacity style={{flex:10}} onPress={()=>Actions.chatRoom({contact, contactEmail})}>
              <View style={[styles.containerStyle, this.props.style]}>
                <View style={styles.userInitial}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold' }}>{contactEmail.substring(0,1)}</Text>
                </View>

                <View style={styles.main}>
                  <View style={styles.content}>
                    <Text style={styles.username}>{contactEmail}</Text>
                    <Text style={styles.lastMessage}>{content}</Text>
                  </View>

                  <View style={styles.status}>
                    <Text style={[styles.statusTime, {color:unread>0?'red':'grey'}]}><TimeAgo time={time} hideAgo={true} interval={20000}/></Text>
                    {unread>0?unreadDisplay:false}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </CardSection>
        );

    }
}

const styles = {
  statusUnreadCount:{
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  statusUnread: {
    opacity:0.7,
    flex: 1,
    height: 10,
    width: 35,
    borderRadius: 30/2,
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  statusTime: {
    opacity:0.7,
    flex:1,
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  status:{
    flex:1,
    flexDirection: 'row'
  },
  main: {
    flex: 4,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    padding: 5
  },
  status: {
    flex: 1
  },
  username: {
    flex:1,
    fontSize: 16,

  },
  lastMessage: {
    flex:1,
    fontSize: 15,
    color: '#A8A39D',
  },
  userInitial: {
    flex: 1,
    height: 60,
    width: 60,
    borderRadius: 60/2,
    opacity: 0.5,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10
  },
  content: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  status: {
    flex: 1
  },
  containerStyle: {
    flex:1,
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderBottomWidth: 0,
    borderRadius: 2,
    // borderColor: '#ddd',
    // shadowColor:'#000',
    // shadowOffset:{ width: 0, height: 2 },
    // shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding:10,
    flexDirection: 'row'
  }
};

export default ChatMessage;
