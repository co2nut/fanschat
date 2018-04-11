import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, addEmail } from '../actions';
import { NavRight, Card, CardSection, Input, Button, Spinner } from './common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

class AddContact extends Component{
    onEmailChange(text) {
      this.props.emailChanged(text);
    }

    onAddEmailPress() {
      const { email } = this.props;

      this.props.addEmail({ email });
    }

    renderButton() {
      if(this.props.loading){
        return ( <Spinner size="large" /> );
      }

      return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Button onPress={()=>this.onAddEmailPress()} >
            Add
          </Button>
        </View>
      );
    }

    render() {
      return (
        <Card style={{ paddingTop:30 }}>

          <CardSection style={{ marginTop:60, marginBottom:10 }}>
            <Input
              label="Email"
              placeholder="Enter Email"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.Email}
            />
          </CardSection>

          <Text style={ styles.errorTextStyle }>
            {this.props.error}
          </Text>

          <CardSection style={{ paddingHorizontal: 30, borderBottomWidth: 0, marginTop:40 }}>
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

    loginMenu: {
      position: 'absolute',
      alignSelf: 'flex-end',
      flex:1,
      flexDirection: 'column',
      borderWidth: 1,
      height: 60,
      width: 150,
      borderRadius: 2,
      borderColor: '#ddd',
      shadowColor:'#000',
      shadowOffset:{ width: 0, height: 2 },
      shadowOpacity: 0.2,
      padding:10,
      paddingHorizontal:20,
      marginTop: 30,
      backgroundColor: '#fff',
      zIndex: 1,
    },

    loginMenuItem: {
      flex: 1,
    },

    loginMenuItemText: {
        fontSize: 18,
        lineHeight: 35,
        // padding: 8,
        // fontWeight: 'bold'

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
      fontSize: 16,
      alignSelf: 'center',
      color: 'red'
    }
}

const mapStateToProps  = ({ addContact }) => {
  const { email, loading, error } = addContact;
  return { email, loading, error };
}

export default connect(mapStateToProps, {
   emailChanged, addEmail
})(AddContact);
