import React from 'react';
import { StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
interface IProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
function Loader({ color, size, style }: IProps) {
  return (
    <ActivityIndicator size={size || 30} color={color || 'white'} />
  );
}

export default Loader;
