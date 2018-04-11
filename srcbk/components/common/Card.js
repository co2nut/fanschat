import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
      <View style={[styles.containerStyle, props.style]}>
        {props.children}
      </View>
  )
};

const styles = {
  containerStyle: {
    flex:1,
    backgroundColor: 'transparent',
    // borderWidth: 1,
    borderBottomWidth: 0,
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
  }
};

export { Card };
