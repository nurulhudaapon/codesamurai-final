import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Input from "@/components/input";
import Text from "@/components/Text";
import { Layout } from "@/components/layout";
import Button from "@/components/Button";
import Spacer from "@/components/Space";
import { useState } from "react";
import FileInput from "@/components/fileInput";
import { ListIcon, User } from "lucide-react-native";
import { Select } from "@/components/Select";
import { dbClient } from "@/data/client";
import { CheckBox } from "@/components/checkBox";
import { uid } from "@/utils/uid";
import { validate } from "@/utils/validation";
import { theme } from "@/styles/theme";
import { upload } from "@/utils/cloudinary";
import useLocation from "@/hooks/location";
import { useSession } from "@/contexts/auth";

const options = [
    { label: "Waste Management", value: "waste_management" },
    { label: "Overflowing Bins", value: "overflowing_bins" },
    { label: "Littering", value: "littering" },
    { label: "Illegal Dumping", value: "lllegal_dumping" },
    { label: "Damaged Infrustructure", value: "damaged_infrustructure" },
]

export default function Report() {
    const [loader, setLoader] = useState(false);
    const { userId } = useSession();
    const [issue, setIssue] = useState({
        isAnonymous: false,
        attachment: "",
        issueType: "",
        message: ""
    })

    const location = useLocation();

    const handleInput = (key: string, value: any) => {
        setIssue({
            ...issue,
            [key]: value
        })
    }

    const handle = async () => {
        const error = validate(issue, ['message', 'issueType', 'attachment'])
        if (!error) {
            setLoader(true)
            const image = await upload(issue.attachment);
            const res = await dbClient.from('issue').insert({
                id: uid(),
                title: '',
                created_by_user_id: userId,
                description: issue.message,
                latitude: location?.coords.latitude || 0,
                longitude: location?.coords.longitude || 0,
                attachments: [image],
                type: issue.issueType,
            }).select('*');
            if (res.data) {
                Alert.alert('Success', 'Issue reported successfully');
                router.back();
            }
            setLoader(false)
        } else {
            Alert.alert('Ops!', 'Please fill all the required fields')
        }
    };

    return (
        <Layout withBackButton withNotification withAppBar withPadding fullScreen style={styles.container}>
            <Text size={12} subtitle>
                Report your issue
            </Text>
            <Spacer height={10} />
            <Layout style={{ gap: 10 }}>
                <FileInput
                    onChange={(f) => {
                        handleInput('attachment', f)
                    }}
                />
                {
                    issue.attachment &&
                    <TouchableOpacity onPress={v => handleInput('attachment', null)}>
                        <Image source={{ uri: issue.attachment }} style={styles.image} />
                    </TouchableOpacity>
                }
                <Select
                    placeholder="Select Issue Type"
                    options={options}
                    onSelect={s => {
                        setIssue({
                            ...issue,
                            issueType: s
                        });
                    }}
                    value={issue.issueType}
                    icon={<ListIcon color={theme.colors.black} size={15} />}
                />
                <Input
                    textArea
                    fullWidth
                    placeholder="Message"
                    onChangeText={v => handleInput('message', v)}
                />
                <CheckBox
                    label="Is Anonymous"
                    selected={issue.isAnonymous}
                    onSelect={() => {
                        handleInput('isAnonymous', !issue.isAnonymous)
                    }}
                />
                <Button loader={loader} onPress={handle}>
                    Submit
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