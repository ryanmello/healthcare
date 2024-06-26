import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare",
  description: "Healthcare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true} className="h-full">
        <body
          className={cn(
            "relative h-full font-sans antialiased",
            inter.className
          )}
        >
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="healthcare-theme"
          >
            <main className="flex flex-col md:flex-row">
              <Sidebar />
              <div className="flex-1">{children}</div>
              <Toaster position="top-center" richColors />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
