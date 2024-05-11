import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useSession } from "@/contexts/auth";
import { Layout } from "@/components/layout";
import { SwitchCard } from "@/components/switchCard";
import Button from "@/components/Button";
import { LogOut } from "lucide-react-native";
import { theme } from "@/styles/theme";

const settings = [

]

export default function TabTwoScreen() {
  const { signOut, session } = useSession();
  return (
    <Layout withAppBar style={styles.container}>
      <SwitchCard
        title="Allow Location Access"
        description="Allow the app to access your current location for better services."
      />
      <SwitchCard
        title="Share Activity Data"
        description="Allow the app to collect and share your activity data for analytics purposes."
      />
      <Layout withPadding>
        <Button
          block
          iconRight={<LogOut size={20} color={theme.colors.white}/>}
          onPress={() => {
            signOut();
          }}
        >Sign Out</Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
