import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((s) => s.signIn);
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
    router.replace('/(tabs)/trips' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <ThemedText type="title" style={styles.brandTitle}>JourneyOn</ThemedText>
        <ThemedText style={styles.brandSub}>智能旅行 · 科技之美</ThemedText>
      </View>
      <View style={styles.group}>
        <ThemedText style={styles.label}>邮箱</ThemedText>
        <Input value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
      </View>
      <View style={styles.group}>
        <ThemedText style={styles.label}>密码</ThemedText>
        <Input value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
      </View>
      <Button title={loading ? '登录中…' : '登录'} onPress={onSubmit} />
      <View style={{ height: 12 }} />
      <Link href="/(auth)/register" asChild>
        <TouchableOpacity>
          <ThemedText>没有账号？去注册</ThemedText>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16, justifyContent: 'center', alignItems: 'center' },
  brand: { alignItems: 'center', marginBottom: 8 },
  brandTitle: { textAlign: 'center', letterSpacing: 1, fontSize: 32 },
  brandSub: { opacity: 0.7, textAlign: 'center', marginTop: 4 },
  group: { gap: 6, width: '100%', maxWidth: 460 },
  label: { opacity: 0.9 },
});
