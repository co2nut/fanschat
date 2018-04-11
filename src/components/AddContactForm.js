import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, addUser, showMenu, switchAccRoute } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-checkbox';
import { Actions } from 'react-native-router-flux';

class SignupForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }


  onAddUserButtonPress() {
    const { email } = this.props;

    this.props.addUser({ email });
  }

  renderButton() {
    if(this.props.loading){
      return ( <Spinner size="large" /> );
    }

    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Button onPress={this.onAddUserButtonPress.bind(this)}>
          Add
        </Button>

      </View>
    );
  }

  render() {
    return(
      <Card>
        <View style={ styles.companyLogo }>
          <Icon name="camera" size={25} color="#fff"  style={{ alignSelf: 'center'}}/>
        </View>

        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
          <Text> </Text>
        </CardSection>

        <Text style={ styles.errorTextStyle }>
          {this.props.error}
        </Text>

        <CardSection style={{ borderBottomWidth: 0 }}>
          {this.renderButton()}
        </CardSection>
      </Card>


    );
  }

};

const styles = {
    termText: {
      fontSize: 12,
      color:'#82837E',
      marginLeft: 10
    },
    terms: {
      padding: 10,
      flexDirection: 'row'
    },
    companyLogo : {
      borderRadius: 150/2,
      height: 150,
      width: 150,
      marginBottom:30,
      marginTop:30,
      opacity: 0.5,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    errorTextStyle: {
      marginTop:10,
      fontSize: 16,
      alignSelf: 'center',
      color: 'red'
    }
}


const mapStateToProps  = ({ addUser }) => {
  const {  email, password, error, loading, menuPress } = addUser;
  return {  email, password, error, loading, menuPress };
}

export default connect(mapStateToProps, {
   emailChanged, addUser, showMenu, switchAccRoute
})(AddUserForm);
