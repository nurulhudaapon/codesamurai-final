import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    primary: "#007324",
    secondary: '#E1EFC4',
    white: '#FFFFFF',
    black: 'black',
    danger: '#ff693b',
    yellow: '#FFC107',
  },
  size: {
    pageBorder: 20,
    title: 20,
    tabBarHeight: 80,
  },
};

export const classes = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.primary,
  },
  shadow: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
});
