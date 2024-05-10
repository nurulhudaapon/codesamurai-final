import React from 'react';
import {
    TextInput as RNInput,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { theme } from '../styles/theme';
import Text from './Text';

interface IProps extends React.ComponentProps<typeof RNInput> {
    label?: string;
    style?: StyleProp<ViewStyle>;
    error?: string;
    rounded?: boolean;
    icon?: React.ReactElement;
    fullWidth?: boolean;
    iconRight?: React.ReactElement;
    block?: boolean;
}
function Input({
    label,
    error,
    style,
    rounded = true,
    icon,
    iconRight,
    block,
    fullWidth,
    ...rest
}: IProps) {
    return (
        <>
            {label && (
                <Text size={15} subtitle style={styles.label}>
                    {label}
                </Text>
            )}
            <View style={[styles.container, block && { flex: 1 }, fullWidth && { width: '100%' }]}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <RNInput
                    placeholderTextColor="grey"
                    style={[
                        styles.input,
                        {
                            borderRadius: rounded ? 30 : 5,
                            paddingLeft: icon ? 45 : 20,
                            paddingRight: iconRight ? 50 : 20,
                        },
                        style,
                    ]}
                    {...rest}
                />
                {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
            </View>
            {error ? (
                <Text bold style={{ marginTop: 5 }} color={theme.colors.danger}>
                    {error}
                </Text>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        zIndex: 1,
        marginLeft: 15,
    },
    iconRight: {
        position: 'absolute',
        zIndex: 1,
        right: 15,
    },
    label: {
        marginBottom: 7,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    input: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.white,
        borderWidth: 0.5,
        width: '100%',
        paddingVertical: 8,
        fontSize: 13,
        color: theme.colors.black,
    },
});

export default Input;
