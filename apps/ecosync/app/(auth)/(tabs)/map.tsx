import { StyleSheet } from "react-native";
import { Layout } from "@/components/layout";

export default function TabOneScreen() {
  return (
    <Layout fullScreen withAppBar>
      <></>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
