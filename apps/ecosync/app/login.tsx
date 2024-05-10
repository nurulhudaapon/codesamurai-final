import { Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import Input from "@/components/input";
import Text from "@/components/Text";
import { useSession } from "@/contexts/auth";
import { Layout } from "@/components/layout";
import Button from "@/components/Button";
import Spacer from "@/components/Space";
import logo from '../assets/logo/ecocync.png';
import { dbClient } from "@/data/client";

export default function Login() {
  const { signIn } = useSession();

  const handleLogin = () => {
    signIn();
    dbClient.from('role').select('*').then(r => {
      console.log(r);
    })
    router.replace("/");
  };

  return (
    <Layout withPadding fullScreen>
      {/* <Image
        style={{ width: 90, height: 90, resizeMode: 'center' }}
        source={logo}
      /> */}
      <Text bold>
        Login to ecosync
      </Text>
      <Spacer height={20} />
      <Layout style={{ gap: 10 }}>
        <Input fullWidth placeholder="Username(not required)" />
        <Input
          fullWidth
          placeholder="Password(not required)"
          secureTextEntry
        />
        <Button onPress={handleLogin}>
          Login
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
  }
});
