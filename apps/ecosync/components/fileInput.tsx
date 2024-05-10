import { StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Input from './input';
import { Paperclip } from 'lucide-react-native';
import { theme } from '@/styles/theme';

export default function FileInput({
    onChange
}: {
    onChange: (image: string) => void
}) {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            const url = result.assets[0].base64;
            const base64 = `data:image/jpg;base64,${url}`
            if (base64) {
                onChange(base64);
            }
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <Input editable={false} placeholder='Add attachment' icon={<Paperclip color={theme.colors.black} size={15} />} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
});
