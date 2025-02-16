'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-green-900 flex flex-col">
  

      {/* Centered Welcome Text */}
      <div className="flex flex-col items-center justify-center gap-4 flex-grow">
        <h1 className="text-white text-3xl">Welcome Back</h1>
        <Link href={"/patient"}><Button>Continue</Button></Link>
      </div>
    </div>
  );
}
