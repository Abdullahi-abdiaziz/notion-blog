import { headers } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminDashboard from "@/components/AdminDashboard";

interface User {
  username: string;
  role: string;
}

const Dashboard = async () => {
  // Get cookies from headers
  const headersList = headers();
  const cookieHeader = headersList.get("cookie");
  const token = cookieHeader
    ?.split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  // Redirect if no token is present
  if (!token) {
    redirect("/admin");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    // Check if the user has the "admin" role
    if (decoded.role !== "admin") {
      redirect("/admin");
    }

    // If the user has the "admin" role, render the dashboard
    return (
      <main className="min-h-[00vh] max-w-[1400px] relative mx-auto flex justify-center items-center my-10">
        <AdminDashboard />
      </main>
    );

    // If valid, render the dashboard
  } catch (error) {
    console.error("Invalid token:", error);
    redirect("/admin"); // Redirect if the token is invalid
  }
};

export default Dashboard;
