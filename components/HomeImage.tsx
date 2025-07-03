import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";
import { useAuth } from "./AuthProvider";
import firestore from "@/lib/firestore";
import React from "react";

type ImageType = {
    image: string,
    caption: string,
    createdBy: string
}

type ImageProps = {
    image: ImageType
}
export default function HomeImage(props: ImageProps) {
    const auth = useAuth()
    const currentUser = auth.user?.uid!!;
    function Fave(userID: string, imageName: string, imageCaption: string, imageCreatedBy: string) {
        firestore.addFavorite(userID, imageName, imageCaption, imageCreatedBy);
    }
    const [hidden, setHidden] = useState(true);
    const tap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            Fave(currentUser, props.image.image, props.image.caption, props.image.createdBy)
        })
        .runOnJS(true);
    const longPress = Gesture.LongPress()
        .onStart(() => {
            setHidden(!hidden);
        })
        .runOnJS(true);
    return (
        <GestureDetector gesture={Gesture.Exclusive(tap, longPress)}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image.image }} />
                <Text style={hidden ? styles.captionHidden : styles.captionUnhidden}>{props.image.caption}</Text>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: "90%",
        aspectRatio: 1,
        borderRadius: 25,
        overflow: "hidden",
        alignSelf: "center",
        marginBottom: 10
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch"
    },
    captionUnhidden: {
        position: "absolute",
        bottom: 0,
        textAlign: "center",
        color: "#fff",
        padding: 20,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    captionHidden: {
        display: "none"
    }
})