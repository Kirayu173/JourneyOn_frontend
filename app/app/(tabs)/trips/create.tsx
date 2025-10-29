import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/theme';
import { useTripStore } from '@/hooks/useTripStore';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const THEMES = ['情侣出行', '商务差旅', '家庭出游'];

export default function CreateTripScreen() {
  const createTrip = useTripStore((s) => s.createTrip);
  const router = useRouter();

  const [title, setTitle] = useState('新行程');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [durationDays, setDurationDays] = useState('3');
  const [budget, setBudget] = useState('3000');
  const [theme, setTheme] = useState<string | undefined>(undefined);

  const onPickDate = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange: (_, d) => d && setDate(d),
        mode: 'date',
        is24Hour: true,
      });
    } else {
      setShowPicker(true);
    }
  };

  const valid = useMemo(() => {
    return (
      !!title.trim() &&
      !!origin.trim() &&
      !!destination.trim() &&
      Number.isFinite(Number(durationDays)) && Number(durationDays) > 0 &&
      Number.isFinite(Number(budget)) && Number(budget) >= 0
    );
  }, [title, origin, destination, durationDays, budget]);

  const onSubmit = () => {
    if (!valid) return;
    const t = createTrip({
      title: title.trim(),
      origin: origin.trim(),
      destination: destination.trim(),
      startDate: date.toISOString().slice(0, 10),
      durationDays: Number(durationDays),
      budget: Number(budget),
      theme,
    });
    router.replace(`/trip/${t.id}/pre`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ padding: 16 }}>创建行程</ThemedText>
      <View style={styles.form}>
        <ThemedText style={styles.label}>行程名称</ThemedText>
        <Input value={title} onChangeText={setTitle} placeholder="例如：东京美食之旅" />

        <ThemedText style={styles.label}>出发地</ThemedText>
        <Input value={origin} onChangeText={setOrigin} placeholder="请输入出发城市" />

        <ThemedText style={styles.label}>目的地</ThemedText>
        <Input value={destination} onChangeText={setDestination} placeholder="请输入目的地" />

        <ThemedText style={styles.label}>出发日期</ThemedText>
        <TouchableOpacity onPress={onPickDate}>
          <View style={styles.fakeInput}>
            <ThemedText>{date.toISOString().slice(0, 10)}</ThemedText>
          </View>
        </TouchableOpacity>
        {Platform.OS === 'ios' && showPicker && (
          <DateTimePicker
            value={date}
            onChange={(_, d) => d && setDate(d)}
            mode="date"
            display="inline"
          />
        )}

        <ThemedText style={styles.label}>行程时长（天）</ThemedText>
        <Input value={durationDays} onChangeText={setDurationDays} keyboardType="number-pad" placeholder="例如：5" />

        <ThemedText style={styles.label}>预算金额（¥）</ThemedText>
        <Input value={budget} onChangeText={setBudget} keyboardType="number-pad" placeholder="例如：8000" />

        <ThemedText style={styles.label}>旅行主题（可选）</ThemedText>
        <View style={styles.themeRow}>
          {THEMES.map((t) => (
            <TouchableOpacity key={t} onPress={() => setTheme(t)}>
              <View style={[styles.themeChip, theme === t && styles.themeChipActive]}>
                <ThemedText>{t}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Button title="创建行程" onPress={onSubmit} disabled={!valid} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { paddingHorizontal: 16, gap: 8 },
  label: { opacity: 0.8, marginTop: 8 },
  fakeInput: {
    backgroundColor: '#0f1720',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  themeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  themeChip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#0f1720',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2f3a',
  },
  themeChipActive: {
    backgroundColor: Colors.dark.tint,
  },
});

