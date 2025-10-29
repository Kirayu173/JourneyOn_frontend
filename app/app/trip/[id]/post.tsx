import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTripStore } from '@/hooks/useTripStore';

export default function PostTripScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const archive = useTripStore((s) => s.archiveTrip);
  const trip = useTripStore((s) => s.getTripById(id));
  const router = useRouter();
  const [ask, setAsk] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  }, [fade]);

  return (
    <Animated.ScrollView contentContainerStyle={styles.container} style={{ opacity: fade }}>
      <Card title="旅行总结报告">
        <ThemedText>本次旅行 5 天 · 步数 58,000 · 打卡 12 个景点</ThemedText>
      </Card>
      <Card title="回忆相册">
        <ThemedText>图片缩略图占位</ThemedText>
      </Card>
      <Card title="偏好标签">
        <ThemedText>喜欢美食 · 偏爱夜景 · 不早起</ThemedText>
      </Card>
      <Card title="下次建议">
        <ThemedText>避开高峰时段 · 提前订票 · 规划休息</ThemedText>
      </Card>
      {trip && !trip.archived && (
        <Button title="结束并归档" onPress={() => setAsk(true)} />
      )}
      <ConfirmModal
        visible={ask}
        title="归档行程"
        message="确认结束并归档该行程吗？"
        onCancel={() => setAsk(false)}
        onConfirm={() => {
          setAsk(false);
          archive(String(id));
          router.replace('/(tabs)/trips' as any);
        }}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
});

