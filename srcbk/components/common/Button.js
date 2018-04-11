import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  return (
      <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
  )
};

const styles = {
  textStyle: {
    alignSelf:'center',
    color: '#fff',
    fontSize: 16,
    fontWeight:'600',
    paddingTop:10,
    paddingBottom:10,
  },
  buttonStyle: {
    opacity: 0.7,
    flex: 1,
    alignSelf:'stretch',
    backgroundColor:'red',
    borderRadius: 30,
    // borderWidth: 1,
    // borderColor: '#007aff',
    marginLeft: 10,
    marginRight: 10
  },
};


export { Button };
