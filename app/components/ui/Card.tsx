import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

type Props = PropsWithChildren<{ title?: string }>;

export function Card({ title, children }: Props) {
  return (
    <View style={styles.card}>
      {title ? (
        <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
          {title}
        </ThemedText>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#111318',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
});

