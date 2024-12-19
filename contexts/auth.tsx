// "use client";

// import React, {
//   useContext,
//   useState,
//   createContext,
//   ReactNode,
//   useEffect,
// } from "react";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode"; // Ensure proper import
// import { useRouter } from "next/navigation";

// // Define the user type based on your token payload
// interface UserType {
//   username: string;
//   role: string;
// }

// // Define the authentication context type
// interface AuthContextType {
//   user: UserType | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   logout: () => void;
// }

// // Define props for the AuthProvider
// interface AuthProviderProps {
//   children: ReactNode;
// }

// // Create the AuthContext with default values
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Hook for consuming the AuthContext
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<UserType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchToken = async () => {
//       const token = Cookies.get("token");

//       if (token) {
//         try {
//           const decodedToken = jwtDecode<UserType>(token);
//           setUser(decodedToken);

//           // Redirect to dashboard if user is authenticated
//           if (decodedToken) {
//             router.push("/dashboard");
//           }
//         } catch (error) {
//           console.error("Error decoding token:", error);
//           Cookies.remove("token");
//         }
//       }

//       setLoading(false);
//     };

//     fetchToken();
//   }, []);

//   const logout = () => {
//     Cookies.remove("token");
//     setUser(null); // Clear user state
//     router.push("/admin"); // Redirect to admin login page
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, loading, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
