import { MediaType, usePermissions } from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

export function useImagePicker() {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [status, requestPermission] = usePermissions();

    async function openImagePicker() {
        if (status === null) {
            const permission = await requestPermission();
            if (permission.granted === false) {
                alert("Permission required to upload an image");
                return;
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    function reset() {
        setImage(undefined);
    }

    return { image, openImagePicker, reset };
}