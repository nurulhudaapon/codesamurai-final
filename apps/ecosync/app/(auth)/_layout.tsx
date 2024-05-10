import { Redirect, Stack, router } from 'expo-router';

import { Text } from '@/components/Themed';
import { useSession } from '@/contexts/auth';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { theme } from '@/styles/theme';


export default function AppLayout() {
  const { session, isLoading } = useSession();
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <ReprotBubble />
    </>
  )
}

const ReprotBubble = () => {
  const goToReport = () => {
    router.push('/report')
  }

  return (
    <TouchableOpacity onPress={goToReport}>
      <View style={styles.bubble}>
        <Plus size={30} color={theme.colors.white} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 50,
  },
})
