import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./navbar/page";
import { Toaster } from "@/components/ui/toaster";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Patient System",
  description: "Local Health Center Patient System Records",
};

export default function RootLayout({ children }
  : Readonly<{
    children: React.ReactNode;
  }>
  
) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Toaster />

      </body>
    </html>
  );
}
