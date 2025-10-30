import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { Colors } from '@/constants/theme';

type Props = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: 'primary' | 'ghost' | 'outline';
  disabled?: boolean;
};

export function Button({ title, onPress, variant = 'primary', disabled }: Props) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[
      styles.base,
      variant === 'ghost' ? styles.ghost : variant === 'outline' ? styles.outline : styles.primary,
      disabled && styles.disabled,
    ]}>
      <Text style={[
        styles.text,
        variant === 'ghost' ? styles.textGhost : styles.textPrimary,
        disabled && styles.textDisabled,
      ]}>{title}</Text>
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
  outline: {
    backgroundColor: '#0f1720',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
  disabled: {
    opacity: 0.6,
  },
  text: { fontWeight: '600' },
  textPrimary: { color: '#0e1117' },
  textGhost: { color: Colors.dark.text },
  textDisabled: { opacity: 0.8 },
});
