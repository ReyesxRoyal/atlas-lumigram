import { Tabs, usePathname, router } from 'expo-router';
import React from 'react';
import { Platform, Button } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/components/AuthProvider';

export default function TabLayout() {
  const auth = useAuth();
  const colorScheme = useColorScheme();

  async function logout() {
    await auth.logout();
    router.replace('/');
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: '#fff',
            display: usePathname() === '/(tabs)' ? 'none' : 'flex'
          },
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerRight: () => <RectButton onPress={() => logout()}><MaterialIcons color={Colors.light.tint} size={28} name="logout" /></RectButton>,
          headerTitle: "Home",
          headerShown: true
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
          headerRight: () => <RectButton onPress={() => logout()}><MaterialIcons color={Colors.light.tint} size={28} name="logout" /></RectButton>,
          headerTitle: "Search",
          headerShown: true
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='plus.circle' color={color} />,
          headerRight: () => <RectButton onPress={() => logout()}><MaterialIcons color={Colors.light.tint} size={28} name="logout" /></RectButton>,
          headerTitle: "Add a Post",
          headerShown: true
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='heart' color={color} />,
          headerRight: () => <RectButton onPress={() => logout()}><MaterialIcons color={Colors.light.tint} size={28} name="logout" /></RectButton>,
          headerTitle: "Favorites",
          headerShown: true
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: 'Your Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='rectangle.portrait.fill' color={color} />,
          headerRight: () => <RectButton onPress={() => logout()}><MaterialIcons color={Colors.light.tint} size={28} name="logout" /></RectButton>,
          headerTitle: "Your profile",
          headerShown: true
        }}
      />
    </Tabs>
  );
}
