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
import { Schema } from "@ecosync/db";
import { uid } from "@/utils/uid";

export default function Registration() {
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
    })

    const handleInput = (value: string, key: string) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    const handleLogin = async () => {
        const validatedData = Schema.userSchema.pick({
            first_name: true,
            last_name: true,
            email: true,
            password: true,
            phone: true
        }).safeParse(user)

        if (validatedData.success) {
            setLoader(true)
            const res = await dbClient
                .from("user")
                .insert({
                    id: uid(),
                    ...validatedData.data,
                })
                .select("*")
                .maybeSingle();

            if (res.data) {
                router.replace("/login");
            } else {
                Alert.alert('Ops!', res.error?.message)
            }
            setLoader(false)
        } else {
            console.log(validatedData.error);

            Alert.alert('Ops!', 'Please fill all the required fields')
        }

    };

    return (
        <Layout withPadding fullScreen style={styles.container}>
            <Logo center size={30} />
            <Text size={12} subtitle>
                Create a new ecosync account
            </Text>
            <Spacer height={20} />
            <Spacer height={10} />
            <Layout style={{ gap: 10 }}>
                <Input onChangeText={v => handleInput(v, 'first_name')} fullWidth placeholder="First Name" />
                <Input onChangeText={v => handleInput(v, 'last_name')} fullWidth placeholder="Last Name" />
                <Input onChangeText={v => handleInput(v, 'phone')} fullWidth placeholder="Phone" />
                <Input onChangeText={v => handleInput(v, 'email')} fullWidth placeholder="Email" />
                <Input
                    onChangeText={v => handleInput(v, 'password')}
                    fullWidth
                    placeholder="Password"
                    secureTextEntry
                />
                <Button loader={loader} onPress={handleLogin}>
                    Register
                </Button>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text size={12} primary center>Login to existing account</Text>
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