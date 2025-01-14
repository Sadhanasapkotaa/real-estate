import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/common/HeaderWebsite";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}