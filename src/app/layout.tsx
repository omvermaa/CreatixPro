import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creatix Pro | Premium Corporate Gifting",
  description: "Premium Corporate Gifting Solutions That Leave a Lasting Impression. Transform your business relationships with bespoke, luxury gift experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="min-h-full flex flex-col antialiased font-serif">{children}</body>
      </html>
    </ClerkProvider>
  );
}
