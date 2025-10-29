import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { Colors } from '@/constants/theme';

type Props = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: 'primary' | 'ghost';
};

export function Button({ title, onPress, variant = 'primary' }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.base, variant === 'ghost' ? styles.ghost : styles.primary]}>
      <Text style={[styles.text, variant === 'ghost' ? styles.textGhost : styles.textPrimary]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  primary: {
    backgroundColor: Colors.dark.tint,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
  text: { fontWeight: '600' },
  textPrimary: { color: '#0e1117' },
  textGhost: { color: Colors.dark.text },
});

