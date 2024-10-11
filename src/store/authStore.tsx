import { create } from 'zustand';

import { STORAGE_KEY_AUTH } from '@/utils/constants';

interface AuthState {
  access_token: string;
  expiresIn: number;
  refresh_token: string;
}

interface AuthActions {
  setAuth: (auth: AuthState) => void;
  getAuth: () => AuthState;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  access_token: null!,
  expiresIn: null!,
  refresh_token: null!,
  setAuth: (auth: AuthState) =>
    set(() => {
      auth = { ...auth };
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(auth));

      return auth;
    }),
  getAuth: () => get(),
}));
