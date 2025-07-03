import { MaterialIcons } from "@expo/vector-icons"
import { Pressable } from "react-native"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
export default function LogoutButton() {
    return (
        <Pressable>
            <MaterialIcons color={Colors.light.tint} size={28} name="logout" onPress={() => { router.replace('/') }} />
        </Pressable>
    )
}
