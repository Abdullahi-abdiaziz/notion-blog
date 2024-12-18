"use client";

import React, {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Optional: Use for decoding tokens

// Define the shape of the authentication context
interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
}

// Shape of user data (replace with actual structure of your token payload)
interface UserType {
  id: string;
  email: string;
  name?: string;
  // Add more fields as needed
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  logout: () => {},
});

// Hook for consuming the authentication context
export const useAuth = (): AuthContextType => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch and validate the token from cookies
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = Cookie.get("token");
        console.log(token);

        if (token) {
          // Decode the token and validate it
          const decoded = jwtDecode<UserType>(token); // Optional, use only if needed
          setUser(decoded); // Set the decoded user data
          console.log(JSON.stringify(decoded));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  // Logout handler: Clear cookies and state
  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
