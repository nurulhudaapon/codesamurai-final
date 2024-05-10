import { theme } from "@/styles/theme"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

export const Layout = ({
    children,
    withPadding,
    fullScreen,
    style
}: {
    children: React.ReactNode
    withPadding?: boolean;
    fullScreen?: boolean;
    style?: StyleProp<ViewStyle>
}) => {
    return (
        <View style={[
            styles.layout,
            withPadding && { padding: 20 },
            fullScreen && { flex: 1 },
            style
        ]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: theme.colors.white,
    }
})