import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '@/hooks/useAuthStore';
import { Layout as L } from '@/constants/layout';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = useAuthStore((s) => s.signUp);
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    await signUp(name, email, password);
    setLoading(false);
    router.replace('/(tabs)/trips' as any);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: L.screenPadding }}>
        注册 JourneyOn
      </ThemedText>
      <View style={styles.group}>
        <ThemedText style={styles.label}>昵称</ThemedText>
        <Input value={name} onChangeText={setName} placeholder="你的名字" />
      </View>
      <View style={styles.group}>
        <ThemedText style={styles.label}>邮箱</ThemedText>
        <Input value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
      </View>
      <View style={styles.group}>
        <ThemedText style={styles.label}>密码</ThemedText>
        <Input value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
      </View>
      <Button title={loading ? '注册中...' : '注册'} onPress={onSubmit} />
      <View style={{ height: L.cardGap }} />
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity>
          <ThemedText>已有账号？去登录</ThemedText>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: L.screenPadding, gap: L.cardGap, justifyContent: 'center', alignItems: 'center' },
  group: { gap: L.cardGap, width: '100%', maxWidth: 460 },
  label: { opacity: 0.9 },
});
