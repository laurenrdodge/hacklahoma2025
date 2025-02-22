import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Board",
  description: "Ethereum Job Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={`antialiased font-sans`}>{children}</body>
    </html>
  );
}
