import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import Loader from './Loader';
import { theme } from '@/styles/theme';

interface IProps {
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  loader?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  block?: boolean;
  error?: string;
  lg?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  rounded?: boolean;
  disabled?: boolean;
  sm?: boolean;
}
function Button({
  textStyle,
  children,
  loader,
  iconLeft,
  iconRight,
  block,
  error,
  lg,
  style,
  onPress,
  rounded,
  disabled,
  sm,
}: IProps) {
  return (
    <>
      {!!error && (
        <Text
          style={{marginBottom: 5, textAlign: 'center'}}
          bold
          color={theme.colors.danger}>
          {error}
        </Text>
      )}
      <TouchableOpacity
        disabled={loader || disabled}
        onPress={onPress}
        style={[
          {
            // flex: 1,
            borderRadius: rounded ? 30 : 5,
            width: block ? '100%' : 'auto',
            paddingVertical: lg ? 18 : sm ? 5 : 10,
            paddingHorizontal: sm ? 15 : 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          styles.button,
          style,
        ]}>
        <View style={styles.iconLeft}>{iconLeft}</View>
        {loader && <Loader size={20} style={{marginRight: 10}} />}
        <Text bold size={sm ? 10 : 14} style={[styles.text, textStyle]}>
          {children}
        </Text>
        <View style={styles.iconRight}>{iconRight}</View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  iconLeft: {
    position: 'absolute',
    width: '100%',
  },
  iconRight: {
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.white,
  },
});

export default Button;
