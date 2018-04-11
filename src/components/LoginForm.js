import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUpRoute, switchAccRoute, checkLogin } from '../actions';
import { NavRight, Card, CardSection, Input, Button, Spinner } from './common';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component{
    componentWillMount(){
      this.props.checkLogin();
    }

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

    onSignUpPress() {
      this.props.signUpRoute();
    }

    onSwitchAccPress() {
      this.props.switchAccRoute();
    }

    onPressSignUp(){
      Actions.signup();
    }

    renderButton() {
      if(this.props.loading){
        return ( <Spinner size="large" /> );
      }

      return (
        <View style={{ flexDirection: 'row', flex: 1, backgroundColor:'transparent' }}>
          <Button onPress={()=>this.onLoginButtonPress()} >
            Login
          </Button>
        </View>
      );
    }

    renderPage(){}

    render() {
      let main =<KeyboardAvoidingView>
          <View style={{}}>
            <Image
              style={{alignSelf: 'center', width: 180, height: 130, marginTop:30}}
              source={require('../images/loginLogo.gif')}
            />
            <CardSection style={{ marginTop:60, marginBottom:10 }}>
              <Input
                label="Email"
                placeholder="Enter Email"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </CardSection>

            <CardSection style={{ marginBottom:30 }}>
              <Input
                secureTextEntry
                label="Password"
                placeholder="Enter Password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </CardSection>

            <View style={{alignItems:'center',justifyContent: 'center',flexDirection: 'row'}}>
              <Text style={ styles.textLoginInfoBase }>Dont have an account?
                  <Text style={ styles.textLoginInfo } onPress={this.onPressSignUp.bind(this)}> Create one</Text>
              </Text>
            </View>

            <Text style={ styles.errorTextStyle }>
              {this.props.error}
            </Text>

            <CardSection style={{ borderBottomWidth: 0 }}>
              {this.renderButton()}
            </CardSection>
          </View>
        </KeyboardAvoidingView>;


      let logo = <View>
        <Image
          style={{alignSelf: 'center', width: 180, height: 130, marginTop:30}}
          source={require('../images/loginLogo.gif')}
        />
      </View>

      const resizeMode = 'center';

      {/*}<ImageBackground
      style={{
      flex: 1,
      // resizeMode,
      width: null,
      height: null,
    }}
    source={require('../images/loginBg.gif')}
    >
    <StatusBar hidden={true} />

    </ImageBackground>*/}
      return (

        <View style={{paddingHorizontal:20}}>
          {main}
        </View>
      );

    }

}

const styles = {
    textLoginInfoBase: {
        // color: '#228DFF',
        lineHeight: 25,
        width:'100%',
        height:'100%',
        textAlign:'center'
    },

    textLoginInfo: {
        color: '#228DFF',
        lineHeight: 25,
        width:'100%',
        height:'100%'
    },

    textName: {
        fontSize:18,
        fontWeight: 'bold',
        alignSelf: 'center'

    },

    textPhone: {
        fontSize:12,
        alignSelf: 'center',
        color: '#9D9D93'

    },

    initialText: {
      fontSize: 20,
      color: '#228DFF',
      alignSelf: 'center',
      fontWeight:'bold',

    },

    roundBg : {
      borderRadius: 150/2,
      height: 150,
      width: 150,
      marginBottom:10,
      marginTop:10,
      // opacity: 0.5,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignSelf: 'center'
    },

    errorTextStyle: {
      fontSize: 15,
      alignSelf: 'center',
      color: 'red'
    }
}

const mapStateToProps  = ({ auth }) => {
  const {  user, email, password, error, loading } = auth;
  return {  user, email, password, error, loading };
}

export default connect(mapStateToProps, {
   emailChanged,
   passwordChanged,
   loginUser,
   signUpRoute,
   switchAccRoute,
   checkLogin
})(LoginForm);
