import { Alert, StyleSheet, TouchableOpacity } from "react-native";
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

  const handleInput = (value: string, key: string) => {
    setUser({
      ...user,
      [key]: key === 'email' ? value.toLowerCase() : value,
    })
  }

  const handleLogin = async () => {
    setLoader(true)
    // signIn("token")
    // router.replace("/");
    const res = await dbClient.rpc('login', {
      email: user.email?.toLowerCase(),
      pass: user.password
    });
    const loggedInUser = await dbClient.from('user').select('id').eq('email', user.email).single()
    const token = res.data?.token
    if (token && loggedInUser.data?.id) {
      signIn({ token, userId: loggedInUser.data?.id })
      router.replace("/");
    } else {
      Alert.alert('Ops!', res.error?.message)
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
        <TouchableOpacity onPress={() => router.push('/registration')}>
          <Text size={12} primary center>Create a new account</Text>
        </TouchableOpacity>
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