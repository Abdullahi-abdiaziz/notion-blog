"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AuthProps = {
  requiresAuth: boolean; // Determines if route requires authentication
};

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  { requiresAuth }: AuthProps
) {
  return function ProtectedComponent(props: T) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (requiresAuth && !token) {
        // If authentication is required but no token exists, redirect
        router.push("/admin");
      } else if (!requiresAuth && token) {
        // If no authentication is required but a token exists, redirect
        router.push("/dashboard");
      } else {
        // If the current state matches the requirement
        setIsAuthorized(true);
      }

      setIsChecking(false); // Finish checking
    }, [requiresAuth, router]);

    if (isChecking) {
      // Show loading while checking authentication state
      return (
        <div className="loading loading-dots loading-lg min-h-screen flex justify-center items-center mx-auto"></div>
      );
    }

    if (!isAuthorized) {
      return null; // Avoid rendering unauthorized content
    }

    return <Component {...(props as any)} />;
  };
}
