import { theme } from '@/styles/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { Check } from 'lucide-react-native';

interface Props {
  selected: boolean,
  onSelect: () => void,
  label?: string,
}

export const CheckBox = ({ selected, onSelect, label }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onSelect()}
        style={[
          styles.box,
          selected && {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          },
        ]}
      >
        <Check color={theme.colors.white} size={12}/>
      </TouchableOpacity>
      <Text
        color={theme.colors.grey}
        size={12}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 5
  },
});
