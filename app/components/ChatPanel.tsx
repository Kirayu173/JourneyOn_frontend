import React, { useMemo, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Pressable, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useAgentChat } from '@/hooks/useAgentChat';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  tripId?: string | string[];
  stageKey: 'pre' | 'on' | 'post' | 'auto';
};

export default function ChatPanel({ visible, onClose, tripId, stageKey }: Props) {
  const screenWidth = Dimensions.get('window').width;
  const panelWidth = useMemo(() => Math.min(420, screenWidth * 0.9), [screenWidth]);
  const translateX = useRef(new Animated.Value(panelWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [input, setInput] = useState('');
  const { messages, send } = useAgentChat({ tripId: String(tripId ?? ''), stage: stageKey });

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: visible ? 0 : panelWidth,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, panelWidth, translateX, overlayOpacity]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt: GestureResponderEvent, g: PanResponderGestureState) => Math.abs(g.dx) > 8,
      onPanResponderMove: (_evt, g) => {
        const dx = Math.max(0, g.dx); // right swipe only
        translateX.setValue(Math.min(panelWidth, dx));
        overlayOpacity.setValue(1 - Math.min(1, dx / panelWidth));
      },
      onPanResponderRelease: (_evt, g) => {
        const dx = Math.max(0, g.dx);
        if (dx > panelWidth * 0.35) {
          Animated.parallel([
            Animated.timing(translateX, { toValue: panelWidth, duration: 160, useNativeDriver: true }),
            Animated.timing(overlayOpacity, { toValue: 0, duration: 160, useNativeDriver: true }),
          ]).start(() => onClose());
        } else {
          Animated.parallel([
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
            Animated.timing(overlayOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
          ]).start();
        }
      },
    })
  ).current;

  const handleSend = () => {
    if (!input.trim()) return;
    send(input.trim());
    setInput('');
  };

  return (
    <View pointerEvents={visible ? 'auto' : 'none'} style={StyleSheet.absoluteFill}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.35)', opacity: overlayOpacity }]} />
      </Pressable>
      <Animated.View {...pan.panHandlers} style={[styles.panel, { width: panelWidth, transform: [{ translateX }] }]}>      
        <View style={styles.header}>
          <ThemedText type="subtitle">智能体助手</ThemedText>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.messages}>
          {messages.map((m, idx) => (
            <View key={idx} style={[styles.bubble, m.role === 'user' ? styles.user : styles.agent]}>
              <ThemedText>{m.content}</ThemedText>
            </View>
          ))}
        </View>
        <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })}>
          <View style={styles.inputBar}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="向助手提问：如 ‘帮我生成 3 天行程’"
              placeholderTextColor="#94a3b8"
              style={styles.input}
            />
            <TouchableOpacity style={styles.send} onPress={handleSend}>
              <Ionicons name="send" size={18} color="#0e1117" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#111318',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#2a2f3a',
    paddingTop: 12,
    zIndex: 100,
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messages: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 8,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    maxWidth: '86%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#1f2937',
  },
  agent: {
    alignSelf: 'flex-start',
    backgroundColor: '#0b6b55',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0f1720',
    color: Colors.dark.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  send: {
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

