import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useSession } from "@/contexts/auth";
import { Layout } from "@/components/layout";
import { BellIcon } from "lucide-react-native";
import { theme } from "@/styles/theme";
import Text from "@/components/Text";
import { useEffect, useState } from "react";
import { dbClient } from "@/data/client";

export default function TabTwoScreen() {
    const { signOut, session } = useSession();
    const [noti, setNoti] = useState<any[]>([]);

    useEffect(() => {
        dbClient
            .from("notification")
            .select("*,notification_read(*)")
            .is("notification_read.id", null)
            .then((data) => {
                setNoti(data?.data || []);
            });
    }, []);
    return (
        <Layout fullScreen withNotification withAppBar withBackButton>
            <View>
                {
                    noti.map((n) => (
                        <NotificationCard
                            title={n.title}
                            description={n.content}
                        />
                    ))
                }
            </View>
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