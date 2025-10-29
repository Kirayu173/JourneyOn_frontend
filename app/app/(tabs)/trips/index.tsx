import React, { useMemo } from 'react';
import { View, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTripStore } from '@/hooks/useTripStore';
import { Button } from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';

export default function TripsScreen() {
  const trips = useTripStore((s) => s.trips);
  const router = useRouter();

  const { activeTrips, archivedTrips, sections } = useMemo(() => {
    const active = trips.filter((t) => !t.archived && (t.stage === 'pre' || t.stage === 'on'));
    const archived = trips.filter((t) => t.archived || t.stage === 'post');
    return {
      activeTrips: active,
      archivedTrips: archived,
      sections: [
        { title: '在途', data: active },
        { title: '归档', data: archived },
      ],
    };
  }, [trips]);

  const onCreate = () => {
    router.push('/(tabs)/trips/create' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText type="title">我的行程</ThemedText>
        <Button title="新建行程" onPress={onCreate} />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderSectionHeader={({ section }) => (
          <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
        )}
        renderItem={({ item }) => {
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
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { opacity: 0.7, marginTop: 8, marginBottom: 8 },
  bubble: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#0f1720',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
});

