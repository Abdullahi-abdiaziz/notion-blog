// "use client";

// import React, {
//   useContext,
//   useState,
//   createContext,
//   ReactNode,
//   useEffect,
//   useCallback,
// } from "react";

// // Define the shape of the theme context
// interface ThemeContextType {
//   theme: string;
//   setTheme: (theme: string) => void;
// }

// // Create the context with a default value
// const ThemeContext = createContext<ThemeContextType>({
//   theme: "light",
//   setTheme: () => {}, // Default to a no-op function
// });

// // Hook for consuming the theme context
// export const useTheme = () => useContext(ThemeContext);

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// // ThemeProvider component
// export const ThemeProvider = ({ children }: ThemeProviderProps) => {
//   const [theme, setTheme] = useState<string>("light");

//   // Load the theme only in the browser
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme) {
//       setTheme(storedTheme);
//     }
//   }, []);

//   // Update the body class whenever the theme changes
//   useEffect(() => {
//     if (theme) {
//       document.body.classList.remove("light", "dark");
//       document.body.classList.add(theme);
//     }
//     document.body.classList.add(theme);
//   }, [theme]);

//   // Memoize the theme change handler
//   const changeTheme = useCallback((newTheme: string) => {
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
