import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/contexts/theme";
import { Work_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import GridBackground from "@/components/ui/GridBackground";

const worksans = Work_Sans({ subsets: ["latin"], weight: ["300", "500"] });

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
            className={`${worksans.className} font-sans bg-slate-50 dark:bg-slate-900`}
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
