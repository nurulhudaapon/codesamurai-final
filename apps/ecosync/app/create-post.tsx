import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Input from "@/components/input";
import Text from "@/components/Text";
import { Layout } from "@/components/layout";
import Button from "@/components/Button";
import Spacer from "@/components/Space";
import { useState } from "react";
import FileInput from "@/components/fileInput";
import { ListIcon } from "lucide-react-native";
import { Select } from "@/components/Select";
import { dbClient } from "@/data/client";
import { uid } from "@/utils/uid";
import { theme } from "@/styles/theme";
import { upload } from "@/utils/cloudinary";
import { Schema } from '@ecosync/db'
import { useSession } from "@/contexts/auth";


const options = [
    { label: "Event", value: "event" },
    { label: "Announcement", value: "announcement" },
    { label: "Post", value: "post" },
]

export default function Report() {
    const [loader, setLoader] = useState(false);
    const { userId } = useSession();
    const [post, setPost] = useState({
        content: '',
        attachments: [],
        type: '',
    })

    const handle = (key: string, value: any) => {
        setPost({
            ...post,
            [key]: value
        })
    }

    const removeImage = (index: number) => {
        const newImages = post.attachments.filter((_, i) => i !== index);
        setPost({
            ...post,
            attachments: newImages
        })
    }

    const handleLogin = async () => {
        const validatedData = Schema.postSchema.pick({
            attachments: true,
            content: true,
            type: true,
        }).safeParse(post)
    
        if (validatedData.success) {
            setLoader(true)
            const attachments: string[] = [];
            post.attachments.forEach(async (attachment) => {
                attachments.push(await upload(attachment));
            })
            const res = await dbClient.from('post').insert({
                id: uid(),
                created_by_user_id: userId,
                ...validatedData.data,
            }).select('*');
            if (res.data) {
                Alert.alert('Success', 'Post created successfully');
                router.back();
            }
            setLoader(false)
        } else {
            Alert.alert('Ops!', 'Please fill all the required fields')
        }
    };

    return (
        <Layout withBackButton withNotification withAppBar fullScreen style={styles.container}>
            <ScrollView style={{ padding: 20 }}>
                <Text size={12} subtitle>
                    Create a new post
                </Text>
                <Spacer height={10} />
                <Layout style={{ gap: 10 }}>
                    <FileInput
                        onChange={(f) => {
                            handle('attachments', [...post.attachments, f])
                        }}
                    />
                    {
                        post.attachments.map((at, i) => (
                            <TouchableOpacity key={i} onPress={v => removeImage(i)}>
                                <Image source={{ uri: at }} style={styles.image} />
                            </TouchableOpacity>
                        ))
                    }
                    <Select
                        placeholder="Select Post Type"
                        options={options}
                        onSelect={s => handle('type', s)}
                        value={post.type}
                        icon={<ListIcon color={theme.colors.black} size={15} />}
                    />
                    <Input
                        textArea
                        fullWidth
                        placeholder="Content"
                        onChangeText={v => handle('content', v)}
                    />
                    <Button loader={loader} onPress={handleLogin}>
                        Submit
                    </Button>
                </Layout>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
    },
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'center',
        borderWidth: 0.5,
        borderColor: theme.colors.primary,
        borderRadius: 5,
    }
});