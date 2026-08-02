import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "Irukei — AI Learning Marketplace",
    template: "%s | Irukei",
  },
  description:
    "Irukei: Connect with AI-powered learning roadmaps, offers, and career opportunities",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d8a85",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-bg">
      <body className="bg-bg text-ink">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
