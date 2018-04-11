import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ style, label, labelStyle, labelRight, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={[styles.labelStyle,labelStyle]}>{label}</Text>
      <TextInput
        underlineColorAndroid='transparent'
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputStyle, style]}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    flex: 3,
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 5,
    flex: 1
  },
  // labelRightStyle: {
  //   fontSize: 18,
  //   paddingLeft: 5,
  //   flex: 1
  // },
  containerStyle: {
    height:40,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'

  }
};

export { Input };
