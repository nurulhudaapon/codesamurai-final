import 'react-native-get-random-values'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "@/contexts/auth";
import { StatusBar } from "expo-status-bar";
import { Notification } from '@/components/notification';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/styles/theme';
// has dynamic 


// this is some of the other heights of other iPhones
// 59 - iPhone 14 Pro / 14Pro Max
// 50 - iPhone 13 mini
// 47 - iPhone 12 / 12Pro / 13 / 13Pro / 13Pro Max / 14 / 14 Plus
// 44 - on iPhoneX
// 20 - on iOS device

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  console.log(insets.top == 59 ? true : false)

  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} >
      <SessionProvider>
        {/* <Notification/> */}
        <StatusBar style="light"
          // move the status bar down to the top of the screen if the iPhone is 14 Pro or 14 Pro Max
          backgroundColor="transparent"
        />

        <Slot />
      </SessionProvider>
    </SafeAreaView>
  );
}



