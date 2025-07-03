import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useImagePicker } from "@/hooks/imagepicker";
import storage from "@/lib/storage";
import { router } from "expo-router";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import React from "react";

export default function AddPost() {
    const auth = useAuth()
    const [caption, setCaption] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { image, openImagePicker, reset } = useImagePicker();

    async function save() {
        if (!image) return;
        const imageName = image?.split("/").pop() as string;
        const { downloadUrl, metadata } = await storage.upload(image, imageName);
        firestore.addPost({ caption, image: downloadUrl, createdAt: new Date(), createdBy: auth.user?.uid!! })
        reset();
        router.replace('/(tabs)/home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={image === undefined ? require("@/assets/images/placeholder.png") : { uri: image }} />
            </View>
            {!image && (
                <Pressable>

                    <Text style={styles.photoButton} onPress={openImagePicker}>
                        <MaterialIcons color={"#fff"} size={28} name="photo" />Choose a photo
                    </Text>
                </Pressable>
            )}
            {image && (
                <View>
                    <TextInput style={styles.captionInput} placeholder="Add a caption" onChangeText={(value) => setCaption(value)} />
                    <Pressable>
                        <Text style={styles.photoButton} onPress={() => save()}>
                            Save
                        </Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.resetButton} onPress={() => reset()}>
                            Reset
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignContent: "center",
        backgroundColor: "white",
        padding: 10
    },
    imageContainer: {
        width: "90%",
        aspectRatio: 1,
        borderRadius: 25,
        overflow: "hidden",
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 20
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    photoButton: {
        padding: 20,
        marginTop: 10,
        backgroundColor: Colors.light.tint,
        width: "90%",
        fontSize: 20,
        textAlign: "center",
        alignItems: "center",
        alignSelf: "center",
        color: "#fff",
        borderRadius: 15
    },
    resetButton: {
        padding: 20,
        marginTop: 10,
        backgroundColor: "#fff",
        color: "black",
        width: "90%",
        fontSize: 20,
        textAlign: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 15
    },
    captionInput: {
        borderColor: Colors.light.tint,
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 20
    }
})