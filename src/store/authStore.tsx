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
  logout: (cb?: () => void) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  access_token: null!,
  expiresIn: null!,
  refresh_token: null!,

  /**
   * 设置登录信息
   * @param auth
   * @returns
   */
  setAuth: (auth: AuthState) =>
    set(() => {
      auth = { ...auth };
      // TODO 使用localstorage存放登录信息不合适
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(auth));

      return auth;
    }),

  /**
   * 获取登录信息
   * @returns
   */
  getAuth: () => get(),

  /**
   * 登出
   */
  logout: (cb?: () => void) => {
    // TODO 使用localstorage存放登录信息不合适
    localStorage.removeItem(STORAGE_KEY_AUTH);

    set(() => {
      return {
        access_token: null!,
        expiresIn: null!,
        refresh_token: null!,
      };
    });

    if (typeof cb === 'function') {
      cb();
    }
  },
}));
