import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'expo-router';
import ProfileEditModal from '@/components/ui/ProfileEditModal';
import { Card } from '@/components/ui/Card';
import { Layout as L } from '@/constants/layout';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const updateUser = useAuthStore((s) => s.updateUser);
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [editing, setEditing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://avatars.githubusercontent.com/u/1?v=4' }} style={styles.avatar} />
        <ThemedText type="title">个人信息</ThemedText>
      </View>
      <View style={{ width: '100%', maxWidth: 460 }}>
        <Card title="账户信息">
          <ThemedText style={styles.label}>昵称</ThemedText>
          <View style={styles.inputLike}><ThemedText>{name}</ThemedText></View>
          <ThemedText style={styles.label}>邮箱</ThemedText>
          <View style={styles.inputLike}><ThemedText>{email}</ThemedText></View>
          <View style={{ height: 12 }} />
          <Button title="编辑信息" variant="outline" onPress={() => setEditing(true)} />
        </Card>
      </View>
      <View style={{ height: L.cardGap }} />
      <Button title="退出登录" variant="ghost" onPress={() => { signOut(); router.replace('/(auth)/login' as any); }} />
      <ProfileEditModal
        visible={editing}
        initialName={name}
        initialEmail={email}
        onCancel={() => setEditing(false)}
        onSubmit={({ name: n, email: e }) => {
          setEditing(false);
          setName(n);
          setEmail(e);
          updateUser({ name: n, email: e });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: L.screenPadding, alignItems: 'center', gap: L.cardGap },
  header: { alignItems: 'center', gap: L.cardGap },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#222' },
  label: { opacity: 0.8, marginTop: 8, marginBottom: 6 },
  inputLike: { backgroundColor: '#111318', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: '#2a2f3a' },
});
