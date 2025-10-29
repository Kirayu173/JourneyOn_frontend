import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const updateUser = useAuthStore((s) => s.updateUser);
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://avatars.githubusercontent.com/u/1?v=4' }} style={styles.avatar} />
        <ThemedText type="title">个人信息</ThemedText>
      </View>
      <View style={styles.card}>
        <ThemedText style={styles.label}>昵称</ThemedText>
        <View style={styles.inputLike}><ThemedText>{name}</ThemedText></View>
        <ThemedText style={styles.label}>邮箱</ThemedText>
        <View style={styles.inputLike}><ThemedText>{email}</ThemedText></View>
        <View style={{ height: 12 }} />
        <Button title="编辑信息" variant="outline" onPress={() => {
          Alert.prompt('编辑昵称', '输入新的昵称', [
            { text: '取消', style: 'cancel' },
            { text: '确定', onPress: (newName) => {
              if (newName) {
                setName(newName);
                Alert.prompt('编辑邮箱', '输入新的邮箱', [
                  { text: '取消', style: 'cancel' },
                  { text: '确定', onPress: (newEmail) => {
                    if (newEmail) {
                      setEmail(newEmail);
                      updateUser({ name: newName, email: newEmail });
                    }
                  }}
                ], 'plain-text', email);
              }
            }}
          ], 'plain-text', name);
        }} />
      </View>
      <View style={{ height: 16 }} />
      <Button title="退出登录" variant="ghost" onPress={() => { signOut(); router.replace('/(auth)/login' as any); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', gap: 16 },
  header: { alignItems: 'center', gap: 12 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#222' },
  card: { width: '100%', maxWidth: 460, backgroundColor: '#0f1720', borderWidth: StyleSheet.hairlineWidth, borderColor: '#2a2f3a', borderRadius: 14, padding: 16 },
  label: { opacity: 0.8, marginTop: 8, marginBottom: 6 },
  inputLike: { backgroundColor: '#111318', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: '#2a2f3a' },
});
