import { theme } from "@/styles/theme"
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { Logo } from "./Logo";
import { StatusBar } from 'react-native';
import { ArrowLeft, BellDotIcon, BellIcon, ChevronLeftIcon } from "lucide-react-native";
import { router } from "expo-router";

export const Layout = ({
    children,
    withPadding,
    fullScreen,
    withAppBar,
    withBackButton,
    withNotification,
    style
}: {
    children: React.ReactNode
    withPadding?: boolean;
    fullScreen?: boolean;
    withAppBar?: boolean;
    withBackButton?: boolean;
    withNotification?: boolean;
    style?: StyleProp<ViewStyle>
}) => {
    return (
        <>
            {withAppBar && <AppBar withNotification={withNotification} withBackButton={withBackButton} />}
            <View style={[
                styles.layout,
                withPadding && { paddingHorizontal: 15, paddingVertical: 30 },
                fullScreen && { flex: 1 },
                style
            ]}>
                {children}
            </View>
        </>
    )
}

const AppBar = ({
    withBackButton,
    withNotification
}: {
    withBackButton?: boolean,
    withNotification?: boolean
}) => {
    const statusBar = StatusBar.currentHeight || 0;
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            paddingTop: statusBar + 15,
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.primary
        }}>
            {
                withBackButton &&
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon color={theme.colors.white} size={20} />
                </TouchableOpacity>
            }
            <Logo inverted size={20} />
            {withNotification && <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/notification')}>
                <BellIcon size={18} color={theme.colors.primary} />
            </TouchableOpacity>}
        </View>
    )

}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: theme.colors.white,
    },
    buttonContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: 50,
        padding: 5
    }
})