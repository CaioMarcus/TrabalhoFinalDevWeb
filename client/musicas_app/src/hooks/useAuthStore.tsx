// authStore.ts
import {create} from 'zustand';
import { loginApi } from '../services/AuthenticationServices';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  isAuthenticated: boolean;
  authToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAndAuthenticate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  authToken: localStorage.getItem('authToken') || null,
  login: async (username: string, password: string) => {
    const token = await loginApi(username, password);
    set({ isAuthenticated: true, authToken: token });
    console.log("IsAuthSetted")
    localStorage.setItem('authToken', token);    
  },
  logout: () => {
    console.log("Logging Out")
    set({ isAuthenticated: false, authToken: null });
    localStorage.removeItem('authToken');
  },
  checkAndAuthenticate: async () => {
    const storedToken = localStorage.getItem('authToken');
    console.log("Checking Auth")
    if (storedToken) {
      try {
        const decodedToken: { exp: number } = jwtDecode(storedToken);

        if (decodedToken.exp * 1000 > Date.now()) {
          set({ isAuthenticated: true, authToken: storedToken });
          console.log("Setting to true")
        } else {
          localStorage.removeItem('authToken');
        }

      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('authToken');
      }
    }
  },
}));
