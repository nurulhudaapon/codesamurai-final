import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { LoaderCircle } from 'lucide-react-native';

interface IProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
function Loader({ color, size, style }: IProps) {
  return (
    <View>
      <LoaderCircle
        style={style}
        size={size || 30}
        color={color || 'white'}
      />
    </View>
  );
}

export default Loader;
