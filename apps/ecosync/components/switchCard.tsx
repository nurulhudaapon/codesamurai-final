import React, { useState } from 'react';
import { View, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { theme } from '@/styles/theme';

export const SwitchCard = ({ title, description }: {
    title: string;
    description: string;
}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text bold>{title}</Text>
                <Text size={12} subtitle>{description}</Text>
            </View>
            <Switch
                trackColor={{ false: theme.colors.secondary, true: theme.colors.secondary }}
                thumbColor={isEnabled ? theme.colors.primary : theme.colors.grey}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        gap: 20,
        borderBottomColor: theme.colors.grey,
        borderBottomWidth: 0.5,
    },
    textContainer: {
        flex: 1,
    },
    switch: {
        alignSelf: 'flex-end',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        marginBottom: 10,
    },
});