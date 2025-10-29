import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

type Props = { onPress: () => void };

export default function FloatingChatButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} accessibilityLabel="打开聊天">
      <Ionicons name="chatbubble-ellipses" size={22} color="#0e1117" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.tint,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

