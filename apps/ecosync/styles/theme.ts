import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    primary: '#A0BE5F',
    secondary: '#E1EFC4',
    secondary100: '#F8FFE9',
    white: '#FFFFFF',
    black: 'black',
    yellow: '#F9D119',
    yellow100: '#FFE38091',
    danger: '#ff693b',
    blue100: "#D3F1FB",
    blue: "#30AEF4",
    grey100: "#F8F8F8",
    grey500: "#CCCCCC",
    grey: "#efefef",
    purple: "#B266EE",
    greenBlue: "#13D382",
    bkash: "#E2136E",
    bkashL100: '#FFDAEA',
    nagad: '#F7941D',
    nagad100: '#FFEFDB'
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
