import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavRight = () => {
  return (
      <View style={{ width:20, height:5 }}>
        <Icon
          name="ellipsis-v"
          size={25}
          color="#9D9D93" />
      </View>
  )
};


export { NavRight };
