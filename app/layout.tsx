import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import localFont from "next/font/local";
import { ThemeProvider } from "@/contexts/theme";
import { Toaster } from "@/components/ui/toaster";
import GridBackground from "@/components/ui/GridBackground";

const geistMono = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geistMono", // Optional CSS variable
  display: "swap", // Recommended for better performance
});

export const metadata: Metadata = {
  title: "Notion Blog",
  description:
    "a Blog site that is controlled by notion as content management system, ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>
          <div
            className={`${geistMono.className} font-sans bg-slate-50 dark:bg-slate-900`}
          >
            <GridBackground>
              <Header />
              {children}
              <Toaster />
              <Footer />
            </GridBackground>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
