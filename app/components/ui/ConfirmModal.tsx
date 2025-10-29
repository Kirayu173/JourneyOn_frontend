import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Button } from './Button';

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
};

export default function ConfirmModal({ visible, title, message, onCancel, onConfirm, confirmText = '确认' }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {title ? (
            <ThemedText type="subtitle" style={{ marginBottom: 6 }}>
              {title}
            </ThemedText>
          ) : null}
          <ThemedText style={{ marginBottom: 12 }}>{message}</ThemedText>
          <View style={styles.row}>
            <Button title="取消" variant="ghost" onPress={onCancel} />
            <View style={{ width: 8 }} />
            <Button title={confirmText} onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#111318',
    padding: 16,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
  row: { flexDirection: 'row', justifyContent: 'flex-end' },
});

