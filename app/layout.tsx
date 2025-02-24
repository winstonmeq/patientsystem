import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./navbar/page";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

// Since this is a Server Component, we can use async
export default async function RootLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the session from Better Auth
 const session = await auth.api.getSession({
    headers: await headers()    
  });




  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap content in SessionProvider for client-side session access */}
          <Navbar />
          <Toaster />
          
          <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Conditionally render Sidebar if session exists */}
            {session?.user && <Sidebar />}
            
            <div className="flex-1 p-4">
              {children}
            </div>
          </div>
      </body>
    </html>
  );
}