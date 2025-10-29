import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const base = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const themed = {
    ...base,
    colors: {
      ...base.colors,
      background: Colors[colorScheme ?? 'light'].background as string,
      text: Colors[colorScheme ?? 'light'].text as string,
    },
  } as typeof base;

  return (
    <ThemeProvider value={themed}>
      <Stack>
        {/* Entry decides auth vs app tabs */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Trip detail flow */}
        <Stack.Screen name="trip/[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
