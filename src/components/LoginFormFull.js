import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, showMenu } from '../actions';
import {  NavRight, Card, CardSection, Input, Button, Spinner } from './common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

class LoginFormFull extends Component{
    onEmailChange(text) {
      this.props.emailChanged(text);
    }

    onPasswordChange(text) {
      this.props.passwordChanged(text)
    }

    onLoginButtonPress() {
      const { email, password } = this.props;

      this.props.loginUser({ email, password });
    }

    // onSignUpButtonPress() {
    //   // const { email, password } = this.props;
    //   // this.props.loginUser({ email, password });
    //   Actions.signup();
    // }

    onReturnPress(){
      Actions.pop();
    }

    onPressMenu(){
      this.props.showMenu()
    }

    renderMenu() {
      if(this.props.menuPress){
        return (
          <CardSection style={styles.loginMenu}>
            <View style={styles.loginMenuItem}>
              <TouchableOpacity>
                <Text style={styles.loginMenuItemText} >Switch Account</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.loginMenuItemText} >Security Center</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ console.log('press!') }>
                <Text style={styles.loginMenuItemText} >Sign Up</Text>
              </TouchableOpacity>
            </View>
          </CardSection>
        );
      }

      return (
        <View style={{ justifyContent: 'space-between', flexDirection:'row', position: 'absolute', flex:1,  marginTop: 30, marginLeft:5 }}>
          <TouchableOpacity style={{ flex:1 }} onPress={this.onReturnPress.bind(this)} >
            <Icon
              name="chevron-left"
              size={25}
              color="#9D9D93" />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressMenu.bind(this)} style={{ flex:1, alignItems:'flex-end' }} >
            <Icon
              name="ellipsis-v"
              size={25}
              color="#9D9D93" />
          </TouchableOpacity>
        </View>

      );
    }

    renderButton() {
      if(this.props.loading){
        return ( <Spinner size="large" /> );
      }

      return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Button onPress={this.onLoginButtonPress.bind(this)}>
            Login
          </Button>

        </View>
      );
    }

    render() {
      return (
        <Card style={{ paddingTop:30 }}>
          {this.renderMenu()}

          <View style={styles.initialView}>
            <Text style={  styles.initialText }>Log in via</Text>
            <Text style={  styles.initialText }>Email of Mobile Number</Text>
          </View>

          <CardSection>
            <Input
              label="Account"
              placeholder="Email / Mobile Number"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection style={{ marginBottom:10 }}>
            <Input
              secureTextEntry
              label="Password"
              placeholder="Enter chapApp password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          <View>
            <Text style={ styles.textLoginInfo }>Use SMS Verification code to log in</Text>
            <Text style={ styles.textLoginInfo }>Forgot password?</Text>
          </View>

          <Text style={ styles.errorTextStyle }>
            {this.props.error}
          </Text>

          <CardSection style={{ paddingHorizontal: 60, borderBottomWidth: 0, marginTop: 40}}>
            {this.renderButton()}
          </CardSection>
        </Card>
      );
    }

}

const styles = {
    textLoginInfo: {
        color: '#228DFF',
        lineHeight: 25
    },

    loginMenu: {
      position: 'absolute',
      alignSelf: 'flex-end',
      flex:1,
      flexDirection: 'column',
      borderWidth: 1,
      height: 120,
      width: 150,
      borderRadius: 2,
      borderColor: '#ddd',
      shadowColor:'#000',
      shadowOffset:{ width: 0, height: 2 },
      shadowOpacity: 0.2,
      padding:10,
      marginTop: 30,
      backgroundColor: '#fff',
      zIndex: 1,
    },
    loginMenuItem: {
      flex: 1,
    },
    loginMenuItemText: {
        fontSize: 13,
        padding: 8,
        // fontWeight: 'bold'

    },

    initialView: {
      paddingTop: 50,
      paddingBottom: 70,
    },

    initialText: {
      fontSize: 18,
      lineHeight: 30,
      alignSelf: 'center',
    },

    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }
}

const mapStateToProps  = ({ auth }) => {
  const {  email, password, error, loading, menuPress } = auth;
  return {  email, password, error, loading, menuPress };
}

export default connect(mapStateToProps, {
   emailChanged, passwordChanged, loginUser, showMenu
})(LoginFormFull);
