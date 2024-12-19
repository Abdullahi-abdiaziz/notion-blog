// stores/authStore.js

import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface UserType {
  username: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserType | null;
  logout: () => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  checkAuth: () => {
    // Check if the token exists in cookies
    const token = Cookies.get("token");
    console.log("Token:", token); // Add this line to log the token value to the console
    if (token) {
      try {
        const user = jwtDecode<UserType>(token);
        set({ isAuthenticated: true, user });

        // Redirect to dashboard if user is authenticated
        if (!user) {
          window.location.href = "/admin";
          set({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        set({ isAuthenticated: false, user: null });
        Cookies.remove("token");
      }
    }
  },
  logout: () => {
    Cookies.remove("token");
    set({ isAuthenticated: false, user: null });
    window.location.href = "/admin";
  },
}));

export default useAuthStore;
