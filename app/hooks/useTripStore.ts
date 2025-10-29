import { create } from 'zustand';

type Task = { id: string; title: string; description?: string; done: boolean };

export type Trip = {
  id: string;
  title: string;
  origin: string;
  destination: string;
  startDate: string; // ISO string
  durationDays: number;
  budget: number; // CNY
  theme?: string; // 情侣出行/商务差旅/家庭出游
  stage: 'pre' | 'on' | 'post';
  archived: boolean;
};

type CreateTripInput = {
  title: string;
  origin: string;
  destination: string;
  startDate: string;
  durationDays: number;
  budget: number;
  theme?: string;
};

type TripStore = {
  trips: Trip[];
  preTripTasks: Task[];
  getTripTitle: (id?: string | string[]) => string | undefined;
  getTripById: (id?: string | string[]) => Trip | undefined;
  toggleTask: (id: string) => void;
  addTask: (title: string, description?: string) => void;
  updateTask: (id: string, patch: Partial<Omit<Task, 'id'>>) => void;
  createTrip: (info: CreateTripInput) => Trip;
  advanceStage: (id: string) => void;
  archiveTrip: (id: string) => void;
  activeTrips: () => Trip[];
  archivedTrips: () => Trip[];
};

export const useTripStore = create<TripStore>((set, get) => ({
  trips: [
    {
      id: '1',
      title: '东京美食之旅',
      origin: '上海',
      destination: '东京',
      startDate: '2025-11-15',
      durationDays: 5,
      budget: 8000,
      theme: '情侣出行',
      stage: 'pre',
      archived: false,
    },
    {
      id: '2',
      title: '川藏线自由行',
      origin: '成都',
      destination: '西藏',
      startDate: '2025-12-01',
      durationDays: 10,
      budget: 12000,
      theme: '家庭出游',
      stage: 'post',
      archived: true,
    },
  ],
  preTripTasks: [
    { id: 't1', title: '办理签证', description: '准备资料并预约', done: false },
    { id: 't2', title: '预订机票', description: '对比价格选择直飞', done: true },
    { id: 't3', title: '打包行李', description: '带好转换插头与雨具', done: false },
  ],
  getTripTitle: (id) => get().trips.find((t) => t.id === String(id))?.title,
  getTripById: (id) => get().trips.find((t) => t.id === String(id)),
  toggleTask: (id) =>
    set((s) => ({
      preTripTasks: s.preTripTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })),
  addTask: (title: string, description?: string) =>
    set((s) => ({ preTripTasks: [{ id: String(Date.now()), title, description, done: false }, ...s.preTripTasks] })),
  updateTask: (id, patch) =>
    set((s) => ({ preTripTasks: s.preTripTasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
  createTrip: (info) => {
    const id = String(Date.now());
    const t: Trip = {
      id,
      title: info.title,
      origin: info.origin,
      destination: info.destination,
      startDate: info.startDate,
      durationDays: info.durationDays,
      budget: info.budget,
      theme: info.theme,
      stage: 'pre',
      archived: false,
    };
    set((s) => ({ trips: [t, ...s.trips] }));
    return t;
  },
  advanceStage: (id) =>
    set((s) => ({
      trips: s.trips.map((t) => {
        if (t.id !== id) return t;
        if (t.archived) return t;
        if (t.stage === 'pre') return { ...t, stage: 'on' };
        if (t.stage === 'on') return { ...t, stage: 'post' };
        return { ...t };
      }),
    })),
  archiveTrip: (id) =>
    set((s) => ({ trips: s.trips.map((t) => (t.id === id ? { ...t, archived: true, stage: 'post' } : t)) })),
  activeTrips: () => get().trips.filter((t) => !t.archived && (t.stage === 'pre' || t.stage === 'on')),
  archivedTrips: () => get().trips.filter((t) => t.archived || t.stage === 'post'),
}));
