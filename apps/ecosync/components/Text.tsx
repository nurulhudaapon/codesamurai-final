import React from 'react';
import {StyleProp, Text as RNText, TextStyle} from 'react-native';
import {theme} from '../styles/theme';

interface IProps {
  children: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  bold?: boolean;
  size?: number;
  center?: boolean;
  primary?: boolean;
  title?: boolean;
  lineHeight?: number;
  subtitle?: boolean;
  dark?: boolean;
  md?: boolean;
  lg?: boolean;
  sm?: boolean;
}

const Text = ({
  children,
  color,
  style,
  onPress,
  bold,
  size,
  center,
  primary,
  title,
  lineHeight,
  subtitle,
  dark,
  sm,
  lg,
  md,
  ...rest
}: IProps) => {
  const myStyles: StyleProp<TextStyle> = {
    color: dark
      ? 'white'
      : color
      ? color
      : primary
      ? theme.colors.primary
      : theme.colors.black,
    opacity: subtitle ? 0.6 : 1,
    textAlign: center ? 'center' : 'left',
    fontSize: sm ? 12 : md ? 18 : lg ? 20 : size || 15,
    lineHeight: lineHeight,
    fontWeight: bold ? 'bold' : 'normal',
    fontFamily: 'Inter'
  };

  const getStyles = () => {
    if (Array.isArray(style)) return [myStyles, ...style];
    return [myStyles, style];
  };

  return (
    <RNText {...rest} onPress={onPress} style={getStyles()}>
      {children}
    </RNText>
  );
};

export default Text;
