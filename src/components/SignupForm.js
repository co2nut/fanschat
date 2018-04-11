import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, signUpUser, showMenu, signUpRoute, switchAccRoute } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-checkbox';
import { Actions } from 'react-native-router-flux';

class SignupForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onSignUpButtonPress() {
    const { email, password } = this.props;

    this.props.signUpUser({ email, password });
  }

  renderButton() {
    if(this.props.loading){
      return ( <Spinner size="large" /> );
    }

    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Button onPress={this.onSignUpButtonPress.bind(this)}>
          Sign Up
        </Button>

      </View>
    );
  }

  render() {
    return(
      <KeyboardAvoidingView behavior="position" contentContainerStyle={{'flexDirection':'row'}}>

        <Card>
          <View style={ styles.companyLogo }>
            <Icon name="camera" size={25} color="#fff"  style={{ alignSelf: 'center'}}/>
          </View>

          {/*<CardSection>
            <Input
              label="Name"
              placeholder="Name"
            />
          </CardSection>*/}

          <CardSection>
            <Input
              label="Email"
              placeholder="user@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
            <Text> </Text>
          </CardSection>

          {/*<CardSection>
            <Input label="Phone" placeholder="Enter mobile number"/ >
            <Text> </Text>
          </CardSection>*/}

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="Enter password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              style={{paddingLeft:13}}
            />
            <Icon name="eye" size={25} color="#E0E0E0"  style={{ alignSelf: 'center'}} />

          </CardSection>

          <Text style={ styles.errorTextStyle }>
            {this.props.error}
          </Text>

          <View style={styles.terms}>
            <CheckBox label="" />
            <Text style={styles.termText}> I have read and agree to the
              <Text>  </Text>
              <Text style={{ textDecorationLine:'underline' }}>Terms of Service</Text>
              <Text>  </Text>
              &
              <Text>  </Text>
              <Text style={{ textDecorationLine:'underline' }}>Privacy Policy.</Text>
            </Text>
          </View>

          <CardSection style={{ borderBottomWidth: 0 }}>
            {this.renderButton()}
          </CardSection>
        </Card>

      </KeyboardAvoidingView>


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


const mapStateToProps  = ({ signUp }) => {
  const {  email, password, error, loading, menuPress } = signUp;
  return {  email, password, error, loading, menuPress };
}

export default connect(mapStateToProps, {
   emailChanged, passwordChanged, signUpUser, showMenu, signUpRoute, switchAccRoute
})(SignupForm);
