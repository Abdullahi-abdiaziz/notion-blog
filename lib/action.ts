import { toast } from "@/hooks/use-toast";

export const subscribeAction = async (email: string, reset: () => void) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      toast({
        variant: "success",
        title: "🟢 Success",
        description: `${data.message}`,
      });
      reset();
    } else {
      toast({
        variant: "error",
        title: "🔴 Uh oh! Something went wrong.",
        description: data.message,
      });
    }
  } catch (error: any) {
    toast({
      variant: "error",
      title: "🔴 Uh oh! Something went wrong.",
      description: error.message,
    });
  }
};

export const loginAction = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      toast({
        variant: "success",
        title: "🟢 Success",
        description: `${data.message}`,
      });
    } else {
      toast({
        variant: "error",
        title: "🔴 Uh oh! Something went wrong.",
        description: data.error,
      });
    }
  } catch (error: any) {
    toast({
      variant: "error",
      title: "🔴 Uh oh! Something went wrong.",
      description: error.error,
    });
  }
};

export const verifyToken = async (token: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch("/api/verify-token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      toast({
        variant: "success",
        title: "🟢 Success",
        description: `${data.message}`,
      });
    } else {
      toast({
        variant: "error",
        title: "🔴 Uh oh! Something went wrong.",
        description: data.error,
      });
    }
  } catch (error: any) {
    toast({
      variant: "error",
      title: "🔴 Uh oh! Something went wrong.",
      description: error.message,
    });
  }
};
