import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { useTripStore } from '@/hooks/useTripStore';
import { Button } from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import TaskModal from '@/components/ui/TaskModal';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';
import { Layout as L } from '@/constants/layout';

const isFabric = (global as any)?.nativeFabricUIManager != null;
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental && !isFabric) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PreTripScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = useTripStore((s) => s.getTripById(id));
  const tasks = useTripStore((s) => s.preTripTasks);
  const toggleTask = useTripStore((s) => s.toggleTask);
  const addTask = useTripStore((s) => s.addTask);
  const updateTask = useTripStore((s) => s.updateTask);
  const advance = useTripStore((s) => s.advanceStage);
  const router = useRouter();
  const [ask, setAsk] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<{ id: string; name: string; desc?: string } | null>(null);

  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  }, [fade]);

  useEffect(() => {
    if (trip && (trip.archived || trip.stage === 'post')) {
      router.replace(`/trip/${trip.id}/post`);
    }
  }, [trip, router]);

  if (!trip) return null;
  const locked = trip.archived || trip.stage === 'post';

  return (
    <Animated.ScrollView contentContainerStyle={styles.container} style={{ opacity: fade }}>
      <Card title="行程信息">
        <ThemedText type="subtitle">{trip.title}</ThemedText>
        <ThemedText>{trip.origin} → {trip.destination}</ThemedText>
        <ThemedText style={{ opacity: 0.8 }}>{trip.startDate} · {trip.durationDays}天 · 预算 ¥{trip.budget}{trip.theme ? ` · ${trip.theme}` : ''}</ThemedText>
      </Card>

      <Card title="实时地图">
        <MapPlaceholder />
      </Card>

      <Card title="行程规划">
        <ThemedText>Day 1 · 抵达与美食探索</ThemedText>
        <ThemedText>Day 2 · 文化与自然景点</ThemedText>
      </Card>

      <Card>
        <View style={styles.taskHeader}>
          <ThemedText type="subtitle">任务清单</ThemedText>
          {!locked && (
            <TouchableOpacity onPress={() => setAdding(true)}>
              <View style={styles.addBtn}><Ionicons name="add" size={18} color="#0e1117" /></View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.taskListContainer}>
          {tasks.map((item) => (
            <View key={item.id}>
              <View style={[styles.todoRow, item.done && styles.todoRowDone]}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}
                  disabled={locked}
                  onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); toggleTask(item.id); }}
                >
                  <View style={[styles.checkbox, item.done && styles.checkboxDone]}>{item.done && <Ionicons name="checkmark" size={14} color="#0e1117" />}</View>
                  <ThemedText style={[styles.todoText, item.done && styles.todoTextDone]}>{item.title}</ThemedText>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity disabled={locked} onPress={() => setEditing({ id: item.id, name: item.title, desc: item.description })}>
                  <Ionicons name="information-circle-outline" size={20} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </Card>

      <Card title="提醒与天气">
        <ThemedText>预计多云 12–18℃ · 建议外套与雨具</ThemedText>
      </Card>

      {!locked && (
        <Button title="进入 在途 阶段" onPress={() => setAsk(true)} />
      )}
      <ConfirmModal
        visible={ask}
        title="进入下一阶段"
        message="确认进入 在途 阶段吗？"
        onCancel={() => setAsk(false)}
        onConfirm={() => {
          setAsk(false);
          advance(String(id));
          router.replace(`/trip/${id}/on`);
        }}
      />

      <TaskModal
        visible={adding}
        title="添加任务"
        onCancel={() => setAdding(false)}
        onSubmit={({ name, desc }) => { addTask(name, desc); setAdding(false); }}
      />
      <TaskModal
        visible={!!editing}
        title="任务详情"
        initialName={editing?.name}
        initialDesc={editing?.desc}
        onCancel={() => setEditing(null)}
        onSubmit={({ name, desc }) => { if (editing) { updateTask(editing.id, { title: name, description: desc }); setEditing(null); } }}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: L.screenPadding, gap: L.cardGap },
  taskHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  taskListContainer: { gap: 8 },
  addBtn: { backgroundColor: '#22c55e', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  todoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  todoRowDone: { opacity: 0.8 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: StyleSheet.hairlineWidth, borderColor: '#2a2f3a', marginRight: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f1720' },
  checkboxDone: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  todoText: {},
  todoTextDone: { textDecorationLine: 'line-through' },
});
