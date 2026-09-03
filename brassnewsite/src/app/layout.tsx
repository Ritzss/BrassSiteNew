import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProvider } from "@/Context/AppContext";
import PWARegistration from "@/components/mobile/PWARegistration";
import MobileBottomNav from "@/components/Navigation/MobileBottomNav";
import PWAInstallPrompt from "@/components/mobile/PWAInstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brass",
  description: "Premium brass products for modern living.",
  applicationName: "Brass",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Brass",
  },
};

export const viewport = {
  themeColor: "#0E4001",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased no-scrollbar`}
        cz-shortcut-listen="true"
      >
        <Toaster theme="system" richColors position="top-right" />
        <AppProvider>
          <PWARegistration />
          <div className="pb-20 md:pb-0">
  {children}
</div>



<MobileBottomNav />
<PWAInstallPrompt />
        </AppProvider>
      </body>
    </html>
  );
}
