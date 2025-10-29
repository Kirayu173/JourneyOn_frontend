import React, { useState } from 'react';
import { Stack, useLocalSearchParams, Slot } from 'expo-router';
import { View } from 'react-native';
import { useTripStore } from '@/hooks/useTripStore';
import FloatingChatButton from '@/components/FloatingChatButton';
import ChatPanel from '@/components/ChatPanel';

export default function TripLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [chatOpen, setChatOpen] = useState(false);
  const tripTitle = useTripStore((s) => s.getTripTitle(id));
  const trip = useTripStore((s) => s.getTripById(id));

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: true, title: tripTitle || `行程 #${id}`, animation: 'slide_from_right', contentStyle: { backgroundColor: '#0e1117' } }} />
      <Slot />
      {!trip?.archived && (
        <>
          <FloatingChatButton onPress={() => setChatOpen(true)} />
          <ChatPanel visible={chatOpen} onClose={() => setChatOpen(false)} tripId={id} stageKey="auto" />
        </>
      )}
    </View>
  );
}
