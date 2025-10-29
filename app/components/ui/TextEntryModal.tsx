import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Input } from './Input';
import { Button } from './Button';

type Props = {
  visible: boolean;
  title?: string;
  placeholder?: string;
  onCancel: () => void;
  onSubmit: (text: string) => void;
};

export default function TextEntryModal({ visible, title, placeholder, onCancel, onSubmit }: Props) {
  const [text, setText] = useState('');
  const submit = () => {
    const v = text.trim();
    if (!v) return;
    onSubmit(v);
    setText('');
  };
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {title ? <ThemedText type="subtitle" style={{ marginBottom: 8 }}>{title}</ThemedText> : null}
          <Input value={text} onChangeText={setText} placeholder={placeholder} />
          <View style={{ height: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            <Button title="取消" variant="ghost" onPress={onCancel} />
            <Button title="添加" onPress={submit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', backgroundColor: '#111318', padding: 16, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: '#2a2f3a' },
});

