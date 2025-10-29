import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  selected?: boolean;
};

export function Chip({ label, selected }: Props) {
  return (
    <TouchableOpacity style={[styles.chip, selected && styles.selected]}>
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#0f1720',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
  selected: {
    backgroundColor: '#0b6b55',
  },
  text: { color: '#e5e7eb' },
  textSelected: { color: '#e5e7eb' },
});

