import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export function MapPlaceholder({ height = 160 }: { height?: number }) {
  return (
    <View style={[styles.box, { height }]}> 
      <ThemedText style={{ opacity: 0.7 }}>实时地图占位（可接入地图 SDK）</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
    backgroundColor: '#0f1720',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

