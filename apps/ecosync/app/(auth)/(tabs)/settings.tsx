import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import Button from "@/components/Button";
import { useSession } from "@/contexts/auth";

export default function TabTwoScreen() {
  const { signOut, session } = useSession();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          signOut();
        }}
      >Sign Out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
