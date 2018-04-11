import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component{
  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  renderDescription() {
      const {chat, expanded} = this.props;

      if(expanded){
        return (
          <CardSection>
            <Text style={{ flex:1 }}>{chat.description}</Text>
          </CardSection>
        );
      }
  }

  render() {
    const { id, title } = this.props.chat;

    return (
      <TouchableWithoutFeedback
        onPress={ () => this.props.selectChat(id)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
            {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
    titleStyle: {
      fontSize: 18,
      paddingLeft: 15
    }
}


const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedChatId === ownProps.chat.id;
  return { expanded }
};

export default connect(mapStateToProps, actions)(ListItem);
