import { Redirect, Stack, router } from 'expo-router';

import { Text } from '@/components/Themed';
import { useSession } from '@/contexts/auth';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ChevronsDown, ChevronsUp, ClipboardPlus, FilePen, Plus } from 'lucide-react-native';
import { theme } from '@/styles/theme';
import { useState } from 'react';


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
      <Bubble />
    </>
  )
}

const Bubble = () => {
  const [open, setOpen] = useState(false);

  const Icon = open ? ChevronsDown : ChevronsUp;

  return (
    <View style={styles.actions}>
      {open && <BubbleActions />}
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.bubble}>
        <Icon size={30} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  )
}

const BubbleActions = () => {
  const goToReport = () => {
    router.push('/create-report')
  }
  const goToPost = () => {
    router.push('/create-post')
  }
  return (
    <>
      <TouchableOpacity onPress={goToPost} style={styles.bubble}>
        <FilePen size={20} color={theme.colors.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToReport} style={styles.bubble}>
        <ClipboardPlus size={20} color={theme.colors.white} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    bottom: Platform.OS === 'ios' ? 130 : 70,
    right: 20,
  },
  bubble: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    position: "absolute",
    bottom: 70,
    right: 20,
    gap: 10
  }
})
