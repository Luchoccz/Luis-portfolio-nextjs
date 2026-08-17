import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luis Colmenares | Frontend Developer",
  description: "Frontend developer portfolio built from the CV and mockup provided by the user.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="ambient-background" aria-hidden="true">
          <span className="ambient-orb orb-cyan" />
          <span className="ambient-orb orb-electric" />
          <span className="ambient-orb orb-blue" />
        </div>
        <div className="page-content">
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
