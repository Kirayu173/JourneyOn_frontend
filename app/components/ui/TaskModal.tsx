import React, { useMemo, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Input } from './Input';
import { Button } from './Button';

type Props = {
  visible: boolean;
  title?: string;
  nameLabel?: string;
  descLabel?: string;
  initialName?: string;
  initialDesc?: string;
  onCancel: () => void;
  onSubmit: (v: { name: string; desc?: string }) => void;
};

export default function TaskModal({ visible, title, nameLabel = '任务名称', descLabel = '任务说明', initialName, initialDesc, onCancel, onSubmit }: Props) {
  const [name, setName] = useState(initialName ?? '');
  const [desc, setDesc] = useState(initialDesc ?? '');

  React.useEffect(() => {
    setName(initialName ?? '');
    setDesc(initialDesc ?? '');
  }, [initialName, initialDesc, visible]);

  const disabled = useMemo(() => !name.trim(), [name]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {title ? <ThemedText type="subtitle" style={{ marginBottom: 8 }}>{title}</ThemedText> : null}
          <ThemedText style={styles.label}>{nameLabel}（必填）</ThemedText>
          <Input value={name} onChangeText={setName} placeholder="请输入任务名称" />
          <ThemedText style={[styles.label, { marginTop: 10 }]}>{descLabel}</ThemedText>
          <Input value={desc} onChangeText={setDesc} placeholder="例如：需要准备哪些材料" />
          <View style={{ height: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            <Button title="取消" variant="ghost" onPress={onCancel} />
            <Button title="保存" onPress={() => onSubmit({ name: name.trim(), desc: desc.trim() || undefined })} disabled={disabled} />
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

