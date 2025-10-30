import React, { useMemo, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Input } from './Input';
import { Button } from './Button';

type Props = {
  visible: boolean;
  initialName?: string;
  initialEmail?: string;
  onCancel: () => void;
  onSubmit: (v: { name: string; email: string }) => void;
};

export default function ProfileEditModal({ visible, initialName, initialEmail, onCancel, onSubmit }: Props) {
  const [name, setName] = useState(initialName ?? '');
  const [email, setEmail] = useState(initialEmail ?? '');

  React.useEffect(() => {
    setName(initialName ?? '');
    setEmail(initialEmail ?? '');
  }, [initialName, initialEmail, visible]);

  const disabled = useMemo(() => !name.trim() || !email.trim(), [name, email]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <ThemedText type="subtitle" style={{ marginBottom: 8 }}>编辑个人信息</ThemedText>
          <ThemedText style={styles.label}>昵称（必填）</ThemedText>
          <Input value={name} onChangeText={setName} placeholder="请输入昵称" />
          <ThemedText style={[styles.label, { marginTop: 10 }]}>邮箱（必填）</ThemedText>
          <Input value={email} onChangeText={setEmail} placeholder="请输入邮箱" keyboardType="email-address" autoCapitalize="none" />
          <View style={{ height: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            <Button title="取消" variant="ghost" onPress={onCancel} />
            <Button title="保存" onPress={() => onSubmit({ name: name.trim(), email: email.trim() })} disabled={disabled} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', backgroundColor: '#111318', padding: 16, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: '#2a2f3a' },
  label: { opacity: 0.8, marginBottom: 6, marginTop: 4 },
});

