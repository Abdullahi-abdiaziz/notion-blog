"use client";

import withAuth from "@/components/hoc/WithAuth";
import LoginForm from "@/components/LoginForm";

function page() {
  return (
    <section>
      <LoginForm />
    </section>
  );
}

export default page;
