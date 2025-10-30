import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTripStore } from '@/hooks/useTripStore';
import { Button } from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { Layout as L } from '@/constants/layout';

export default function TripsScreen() {
  const trips = useTripStore((s) => s.trips);
  const router = useRouter();
  const [tab, setTab] = useState<'active' | 'archived'>('active');
  const width = Dimensions.get('window').width;
  const x = useRef(new Animated.Value(0)).current;

  const { activeTrips, archivedTrips } = useMemo(() => {
    const active = trips.filter((t) => !t.archived && (t.stage === 'pre' || t.stage === 'on'));
    const archived = trips.filter((t) => t.archived || t.stage === 'post');
    return {
      activeTrips: active,
      archivedTrips: archived,
    };
  }, [trips]);

  const onCreate = () => {
    router.push('/(tabs)/trips/create' as any);
  };

  const switchTo = (next: 'active' | 'archived') => {
    setTab(next);
    const toX = next === 'active' ? 0 : -width;
    Animated.timing(x, { toValue: toX, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  };

  const renderItem = (item: any) => {
    const target = item.archived ? 'post' : item.stage === 'pre' ? 'pre' : 'on';
    return (
      <Link href={`/trip/${item.id}/${target}`} asChild>
        <TouchableOpacity style={styles.bubble}>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          <ThemedText>{item.origin} → {item.destination}</ThemedText>
          <ThemedText style={{ opacity: 0.7 }}>
            {item.startDate} · {item.durationDays}天{item.theme ? ` · ${item.theme}` : ''}
          </ThemedText>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText type="title">我的行程</ThemedText>
        <Button title="新建行程" onPress={onCreate} />
      </View>
      <View style={styles.tabsRow}>
        <TouchableOpacity style={[styles.tabBtn, tab === 'active' && styles.tabActive]} onPress={() => switchTo('active')}>
          <ThemedText style={tab === 'active' ? styles.tabTextActive : styles.tabText}>在途</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, tab === 'archived' && styles.tabActive]} onPress={() => switchTo('archived')}>
          <ThemedText style={tab === 'archived' ? styles.tabTextActive : styles.tabText}>归档</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={{ overflow: 'hidden', width: '100%' }}>
        <Animated.View style={{ flexDirection: 'row', width: width * 2, transform: [{ translateX: x }] }}>
          <View style={{ width }}>
            <FlatList
              data={activeTrips}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: L.screenPadding, gap: L.cardGap }}
              renderItem={({ item }) => renderItem(item)}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
          <View style={{ width }}>
            <FlatList
              data={archivedTrips}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: L.screenPadding, gap: L.cardGap }}
              renderItem={({ item }) => renderItem(item)}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    paddingHorizontal: L.screenPadding,
    paddingTop: L.screenPadding,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabsRow: {
    paddingHorizontal: L.screenPadding,
    paddingTop: 8,
    flexDirection: 'row',
    gap: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#0f1720',
  },
  tabText: { opacity: 0.8 },
  tabTextActive: { fontWeight: '600' as any },
  bubble: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#0f1720',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
});
