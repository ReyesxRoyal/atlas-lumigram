import { Image, StyleSheet, Platform, View, Text, ImageBackground, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { homeFeed } from "@/placeholder";
import { FlashList } from "@shopify/flash-list";
import HomeImage from "@/components/HomeImage";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import firestore from "@/lib/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import React from "react";


type Post = {
    caption: string;
    image: string;
    createdAt: Date;
    createdBy: string;
}


export default function HomeScreen() {
    const [data, setData] = useState<Post[]>();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            const fetchData = async () => {
                try {
                    const firestoreData = await firestore.getHome();
                    setData(firestoreData);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchData();
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const firestoreData = await firestore.getHome();
                setData(firestoreData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [data])
    const tap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            Alert.alert("tapped!")
        })
        .runOnJS(true);

    return (
        <View style={styles.container}>
            <FlashList
                renderItem={({ item }) => (
                    <HomeImage image={item} />
                )}
                data={data}
                estimatedItemSize={500}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignContent: "center",
        backgroundColor: "white",
        padding: 10,
        height: "100%"
    },
    homeImages: {
        width: "100%",
        gap: 15

    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
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
        resizeMode: "contain"
    }
});
