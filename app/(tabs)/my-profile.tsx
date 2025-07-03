import { Text, View } from "react-native";
import { profileFeed } from "@/placeholder";
import { useAuth } from "@/components/AuthProvider";
import React from "react";

export default function MyProfile() {
    const auth = useAuth();
    return (
        <View>
            <Text>
                Hello, {auth.user?.email}!
            </Text>
        </View>
    )
}