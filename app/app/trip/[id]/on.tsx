import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTripStore } from '@/hooks/useTripStore';

export default function OnTripScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const advance = useTripStore((s) => s.advanceStage);
  const trip = useTripStore((s) => s.getTripById(id));
  const router = useRouter();
  const [ask, setAsk] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  }, [fade]);

  useEffect(() => {
    if (trip && (trip.archived || trip.stage === 'post')) {
      router.replace(`/trip/${trip.id}/post`);
    }
  }, [trip, router]);

  return (
    <Animated.ScrollView contentContainerStyle={styles.container} style={{ opacity: fade }}>
      <Card title="当日日程">
        <ThemedText>09:00 早餐 · 10:30 神社参观 · 14:00 美术馆</ThemedText>
      </Card>
      <Card title="附近推荐">
        <ThemedText>拉面 · 咖啡 · 甜品 · 打卡点</ThemedText>
      </Card>
      <Card title="告警通知">
        <ThemedText>暂无延误或天气预警</ThemedText>
      </Card>
      <Card title="离线地图">
        <ThemedText>示意卡片（可接入地图 SDK）</ThemedText>
      </Card>
      {trip && !trip.archived && trip.stage !== 'post' && (
        <Button title="进入 回顾 阶段" onPress={() => setAsk(true)} />
      )}
      <ConfirmModal
        visible={ask}
        title="进入下一阶段"
        message="确认进入 回顾 阶段吗？"
        onCancel={() => setAsk(false)}
        onConfirm={() => {
          setAsk(false);
          advance(String(id));
          router.replace(`/trip/${id}/post`);
        }}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
});

