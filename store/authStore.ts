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
    const token = Cookies.get("token");
    if (token) {
      try {
        const user = jwtDecode<UserType>(token);
        set({ isAuthenticated: true, user });

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
