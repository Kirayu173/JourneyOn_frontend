import { create } from 'zustand';

type User = { id: string; name: string; email: string };

type AuthState = {
  isSignedIn: boolean;
  user?: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (patch: Partial<Omit<User, 'id'>>) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  user: null,
  async signIn(email, _password) {
    await new Promise((r) => setTimeout(r, 300));
    set({ isSignedIn: true, user: { id: 'u1', name: '旅者', email } });
  },
  async signUp(name, email, _password) {
    await new Promise((r) => setTimeout(r, 300));
    set({ isSignedIn: true, user: { id: 'u1', name, email } });
  },
  signOut() {
    set({ isSignedIn: false, user: null });
  },
  updateUser(patch) {
    set((s) => ({ user: s.user ? { ...s.user, ...patch } : s.user }));
  },
}));

