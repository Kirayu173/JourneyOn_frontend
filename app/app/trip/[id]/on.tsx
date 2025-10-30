import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTripStore } from '@/hooks/useTripStore';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';
import { Layout as L } from '@/constants/layout';

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
      <Card title="今日行程">
        <ThemedText>09:00 早餐 · 10:30 神社参观 · 14:00 美术馆</ThemedText>
      </Card>
      <Card title="实时地图">
        <MapPlaceholder />
      </Card>
      <Card title="附近推荐">
        <ThemedText>餐饮 · 咖啡 · 景点 · 打卡</ThemedText>
      </Card>
      <Card title="提醒与天气">
        <ThemedText>暂无延误 · 天气良好</ThemedText>
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
  container: { padding: L.screenPadding, gap: L.cardGap },
});
