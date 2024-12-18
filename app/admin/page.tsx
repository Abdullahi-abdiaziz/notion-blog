"use client";
import { withAuth } from "@/components/hoc/WithAuth";
import LoginForm from "@/components/LoginForm";

function page() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default withAuth(page, { redirectAuthenticatedTo: "/dashboard" });
