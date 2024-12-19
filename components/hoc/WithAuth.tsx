"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthProps = {
  requiresAuth: boolean; // Determines if route requires authentication
};

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  { requiresAuth }: AuthProps
) {
  return function ProtectedComponent(props: T) {
    const router = useRouter();

    useEffect(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (requiresAuth && !token) {
        router.push("/admin"); // Redirect to /admin if authentication is required but no token
      } else if (!requiresAuth && token) {
        router.push("/dashboard"); // Redirect to /dashboard if no authentication is required but a token exists
      }
    }, [requiresAuth, router]);

    return <Component {...(props as any)} />;
  };
}
