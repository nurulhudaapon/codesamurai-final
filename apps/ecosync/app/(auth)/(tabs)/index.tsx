import { FlatList, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import Text from "@/components/Text";
import { theme } from "@/styles/theme";
import { Layout } from "@/components/layout";
import Spacer from "@/components/Space";

export default function TabOneScreen() {
  return (
    <Layout fullScreen withAppBar>
      <FlatList
        data={Array(5).fill(0)}
        style={styles.feedContainer}
        ItemSeparatorComponent={() => <Spacer height={10}/>}
        renderItem={() => {
          return <FeedCard />
        }}
      />
    </Layout>
  );
}

const FeedCard = () => {
  return (
    <View style={styles.feedCard}>
      {/* <Text></Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  feedContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  feedCard: {
    width: '100%',
    height: 200,
    padding: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
  }
});
