import _ from 'lodash';
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { CardSection, Card, Button, Input } from '../components/common';
import { connect } from 'react-redux';
import { phoneBookFetch, chatRoomFetch } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar, List, ListItem } from 'react-native-elements'


class PhoneBook extends Component {

  componentWillMount(){
    this.props.phoneBookFetch();
  }

  renderSeparator(){
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "18%"
        }}
      />
    );
  }

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop:-3 }}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={this.props.phoneBookList}
          keyExtractor={item => item.email}
          renderItem={({item}) => (
            <ListItem
              onPress={() => Actions.chatRoom({contact: item.uid, contactEmail: item.email })}
              title={item.email}
              key={item.uid}
              avatar={<Avatar
                medium
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}

                />}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
        />
      </List>
    )
  }
}


const styles = {
}

const mapStateToProps = ({phoneBook}) => {
  const phoneBookList = _.map(phoneBook.phoneBookList, (val, uid) => {
    return { ...val, uid };
  });

  return { phoneBookList };
}

export default connect(mapStateToProps, { phoneBookFetch, chatRoomFetch })(PhoneBook);
