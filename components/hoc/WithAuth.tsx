"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth";

type WithAuthOptions = {
  redirectAuthenticatedTo?: string;
  redirectUnauthenticatedTo?: string;
};

/**
 * Higher-Order Component to handle authentication-based redirection.
 */
export function withAuth<T extends {}>(
  WrappedComponent: React.ComponentType<T>,
  options?: WithAuthOptions
) {
  const {
    redirectAuthenticatedTo = "/dashboard",
    redirectUnauthenticatedTo = "/admin",
  } = options || {};

  return (props: T) => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current path
    const { isAuthenticated, loading } = useAuth(); // Customize based on your `useAuth` logic

    useEffect(() => {
      if (!loading) {
        if (isAuthenticated && pathname === "/admin") {
          router.replace(redirectAuthenticatedTo); // Redirect authenticated users
        } else if (!isAuthenticated && pathname !== "/admin") {
          router.replace(redirectUnauthenticatedTo); // Redirect unauthenticated users
        }
      }
    }, [isAuthenticated, loading, pathname, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
