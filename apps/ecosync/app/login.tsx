import { StyleSheet } from "react-native";
import { router } from "expo-router";
import Input from "@/components/input";
import Text from "@/components/Text";
import { useSession } from "@/contexts/auth";
import { Layout } from "@/components/layout";
import Button from "@/components/Button";
import Spacer from "@/components/Space";
import { Logo } from "@/components/Logo";
import { api } from "@/utils/fetch";
import { useState } from "react";
import { dbClient } from "@/data/client";

export default function Login() {
  const { signIn } = useSession();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleInput = (key: string, value: string) => {
    setUser({
      ...user,
      [key]: value
    })
  }

  const handleLogin = async () => {
    setLoader(true)
    try {
      dbClient.from('user').select('*').then(console.log)
      await login(user)
      router.replace("/");
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
    setLoader(false)
  };

  return (
    <Layout withPadding fullScreen style={styles.container}>
      <Logo center size={30} />
      <Text size={12} subtitle>
        Login with your ecosync account
      </Text>
      <Spacer height={20} />
      <Spacer height={10} />
      <Layout style={{ gap: 10 }}>
        <Input onChangeText={v => handleInput(v, 'email')} fullWidth placeholder="Email" />
        <Input
          onChangeText={v => handleInput(v, 'password')}
          fullWidth
          placeholder="Password"
          secureTextEntry
        />
        <Button loader={loader} onPress={handleLogin}>
          Login
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

const getCsrfToken = async () => {
  const token = await api.get('auth/csrf')
  return token.csrfToken
}

const login = async (credentials: {
  email: string,
  password: string,
}) => {
  const token = await getCsrfToken()

  const form = new FormData();
  form.append('email', credentials.email);
  form.append('password', credentials.password);
  form.append('redirect', 'false');
  form.append('callbackUrl', '/');
  form.append('csrfToken', token);
  form.append('json', 'true');

  return api.post('auth/login', form);
}