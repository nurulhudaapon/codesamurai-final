import { theme } from "@/styles/theme"
import Text from "./Text"
import { StyleProp, TextStyle, View } from "react-native"

export const Logo = ({
    size,
    center,
    inverted
}: {
    size?: number,
    center?: boolean,
    inverted?: boolean
}) => {

    const styles: StyleProp<TextStyle> = {
        fontWeight: '900',
        fontSize: size || 20,
        textAlign: center ? 'center' : 'left'
    }

    return (
        <Text>
            <Text
                style={[{
                    color: inverted ? theme.colors.white : theme.colors.primary,
                }, styles]}
            >
                Eco
            </Text>
            <Text
                style={[{
                    color: theme.colors.yellow,
                }, styles]}
            >
                Sync
            </Text>
        </Text>
    )
}