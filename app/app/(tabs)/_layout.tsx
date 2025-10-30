import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabsLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme ?? 'light'];
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tint,
        tabBarStyle: { backgroundColor: '#0e1117', borderTopColor: '#2a2f3a' },
      }}
    >
      <Tabs.Screen
        name="trips/index"
        options={{
          title: '我的行程',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" color={color} size={size} />,
        }}
      />
      {/* Hide inner routes from tab bar */}
      <Tabs.Screen name="trips/create" options={{ href: null }} />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: '个人信息',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
