'use client'
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="h-screen bg-green-900 flex flex-col">
  

      {/* Centered Welcome Text */}
      <div className="flex items-center justify-center flex-grow">
        <h1 className="text-white text-3xl">Welcome</h1>
      </div>
    </div>
  );
}
