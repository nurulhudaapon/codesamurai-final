import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useSession } from "@/contexts/auth";
import { Layout } from "@/components/layout";
import { SwitchCard } from "@/components/switchCard";
import Button from "@/components/Button";
import { BellIcon, LogOut } from "lucide-react-native";
import { theme } from "@/styles/theme";
import Text from "@/components/Text";

export default function TabTwoScreen() {
    const { signOut, session } = useSession();
    return (
        <Layout withNotification withAppBar withBackButton>
            <NotificationCard
                title="New event has been announced"
                description="A new event has been announced in your area. Check it out now."
            />
            <NotificationCard
                title="Your submitted issue has been resolved"
                description="Your submitted issue has been resolved. Thank you for your contribution."
            />
        </Layout>
    );
}

export const NotificationCard = ({ title, description }: {
    title: string;
    description: string;
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <BellIcon size={20} color={theme.colors.white} />
            </View>
            <View>
                <Text bold>{title}</Text>
                <Text size={12} subtitle>{description}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: theme.colors.grey,
        borderBottomWidth: 0.5,
        gap: 10
    },
    buttonContainer: {
        backgroundColor: theme.colors.primary,
        borderRadius: 50,
        padding: 8
    }
});