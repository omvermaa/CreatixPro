import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.creatixpro.com"), // Establishes the authoritative domain
  alternates: {
    canonical: "/", // Resolves to https://www.creatixpro.com/
  },
  title: "Creatix Pro | Premium Corporate Gifting",
  description:
    "Premium Corporate Gifting Solutions That Leave a Lasting Impression. Transform your business relationships with bespoke, luxury gift experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <body className="min-h-full flex flex-col antialiased font-serif">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
