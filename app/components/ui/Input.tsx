import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#94a3b8"
      {...props}
      style={[styles.input, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#0f1720',
    color: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
});

