import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActionModal } from './Modal';
import Text from './Text';
import { theme } from '@/styles/theme';
import Input from './input';

interface Props {
  options: {
    label: string;
    value: string;
  }[];
  onSelect: (value: any) => void;
  value: string;
  defaultValue?: string;
  icon: React.ReactElement;
  placeholder: string;
}

export const Select = ({
  options,
  onSelect,
  value,
  defaultValue,
  icon,
  placeholder,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const labelFromValue = options.find((item) => item.value === value);
  const isActive = (v: string) => value === v;
  const handleSelect = (v: string) => {
    onSelect(v);
    setOpen(false);
  };
  return (
    <>
      <ActionModal isModalVisible={open} setIsModalVisible={setOpen}>
        <View style={styles.modal}>
          {options.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleSelect(item.value)}
              style={[
                styles.option,
                isActive(item.value) && { backgroundColor: theme.colors.secondary },
              ]}
            >
              <Text size={12} primary={isActive(item.value)} bold={isActive(item.value)}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ActionModal>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Input editable={false} placeholder={placeholder} icon={icon} defaultValue={labelFromValue?.label || defaultValue} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  leftIcon: {
    position: 'absolute',
    marginLeft: 15,
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
  },
  label: {
    marginBottom: 7,
  },
  container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    borderColor: theme.colors.primary,
    borderWidth: 0.5,
    backgroundColor: theme.colors.white,
    paddingLeft: 10,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 5,
    color: theme.colors.black,
  },
});
