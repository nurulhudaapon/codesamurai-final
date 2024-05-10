import React from 'react';
import {View} from 'react-native';

interface IProps {
  width?: number;
  height?: number;
}
function Spacer({width, height}: IProps) {
  return <View style={{width: width || 0, height: height || 0}}></View>;
}

export default Spacer;
