import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (id: string, password: string, role: 'student' | 'faculty') => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
} 


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (id, password, role) => {
    // For demo purposes, we'll use hardcoded credentials
    // In production, this should be replaced with actual Supabase authentication
    const demoCredentials = {
      student: {
        id: 'umredkarsumit276@gmail.com',
        password: 'Sumit@1432',
        name: 'Sumit Waghmare'
      },
      student1: {
        id: 'User123',
        password: 'User@123',
        name: 'Unknown Student'
      },
      faculty: {
        id: 'SnehalChaflekar@gmail.com',
        password: 'Snehal@123',
        name: 'Snehal Chaflekar'
      },
      faculty1: {
        id: 'User123',
        password: 'User@123',
        name: 'Unknown Faculty'
      },
    };

    const validCredentials = role === 'student' ? demoCredentials.student1 : demoCredentials.faculty1;

    if (id === validCredentials.id && password === validCredentials.password) {
      set({
        user: {
          id: validCredentials.id,
          name: validCredentials.name,
          role,
        },
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  setUser: (user) => set({ user }),
}));

