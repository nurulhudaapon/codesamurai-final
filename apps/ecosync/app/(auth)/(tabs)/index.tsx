import { FlatList, Image, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { theme } from "@/styles/theme";
import { Layout } from "@/components/layout";
import Spacer from "@/components/Space";
import { useEffect, useState } from "react";
import { dbClient } from "@/data/client";
import Text from "@/components/Text";
import { Helpers } from "@ecosync/utils"

const fetchFeeds = async () => {
  const feedQuery = await dbClient.from('post').select('*, user(*)').limit(1000).order('created_at', { ascending: false })
  return feedQuery.data
}

type FeedType = Awaited<ReturnType<typeof fetchFeeds>>

export default function TabOneScreen() {
  const [feeds, setFeeds] = useState<FeedType>([])

  const getPosts = async () => {
    const feeds = await fetchFeeds()
    setFeeds(feeds)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Layout fullScreen withAppBar withNotification>
      <FlatList
        data={feeds}
        style={styles.feedContainer}
        ItemSeparatorComponent={() => <Spacer height={10} />}
        renderItem={({ item }) => {
          return <FeedCard {...item} />
        }}
      />
    </Layout>
  );
}

const FeedCard = (post: NonNullable<FeedType>[number]) => {
  const first_name = post.user?.first_name || 'Zahin'
  const last_name = post.user?.last_name || 'Afsar'
  return (
    <View style={styles.feedContainer}>
      <View style={styles.userContainer}>
        <View style={styles.textAvatar}>
          <Text bold size={12}>{avatarText({ first_name, last_name })}</Text>
        </View>
        <View style={{ gap: 3 }}>
          <Text bold size={12}>{`${first_name} ${last_name}`}</Text>
          <Text subtitle size={10}>{post.created_at && Helpers.Time.formatToDateTime(post.created_at)}</Text>
        </View>
      </View>
      <Text size={12}>{post.content}</Text>
      {post?.attachments?.map((attachment, index) => (
        <Image key={index} source={{ uri: attachment }} style={styles.feedImage} />
      ))}
      {/* <Text>{post.type}</Text> */}
    </View>
  );
}

const avatarText = (user: { first_name?: string | null, last_name?: string | null }) => {
  return `${user.first_name?.at(0) || ''}${user.last_name?.at(0) || ''}`.toUpperCase()
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textAvatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  feedContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10
  },
  feedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10
  }
});
