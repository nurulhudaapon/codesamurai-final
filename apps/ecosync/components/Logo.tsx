import { theme } from "@/styles/theme"
import Text from "./Text"
import { StyleProp, TextStyle, View } from "react-native"

export const Logo = ({
    size,
    center
}: {
    size: number,
    center: boolean
}) => {

    const styles: StyleProp<TextStyle> = {
        fontWeight: '900',
        fontSize: size,
        textAlign: center ? 'center' : 'left'
    }

    return (
        <Text>
            <Text
                style={[{
                    color: theme.colors.primary,
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