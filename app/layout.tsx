import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/contexts/theme";
import { Raleway } from "next/font/google";
import Geist from "next/font/local";

export const geist = Geist({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--geist-mono", // CSS variable name (optional)
  weight: "400", // Define font weight if needed
  style: "normal", // Define the style (normal, italic, etc.)
  display: "swap", // Optional (swap, block, fallback)
});

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "500"] });

export const metadata: Metadata = {
  title: "Notion Blog",
  description: "a Blog site that is controlled by notion, ",
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
            className={`${raleway.className} font-sans bg-slate-50 dark:bg-slate-900`}
          >
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
