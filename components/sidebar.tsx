// components/Sidebar.tsx
import React from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { icons, Menu } from "lucide-react"
import Link from 'next/link';
import { Home, Users, FileText, Stethoscope, Settings } from "lucide-react";




interface ListItem {
  name: string;
  href: string;
  icon: string;
}
const list = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Medical", href: "/records", icon: Stethoscope },
  { name: "Patients", href: "/patient", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },

  { name: "Users", href: "/users", icon: Users },
  { name: "Setting", href: "/setting", icon: Settings }
];


export function Sidebar() {
  return (
    <>
      <aside className="bg-green-900 text-white py-6 px-4 w-64 flex-col hidden md:flex">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded-full bg-white mr-2"></div>
          <span className="text-lg font-semibold">Patient</span>
        </div>

        <nav>
          <ul className="space-y-2">
            {list.map(item => (
              <li key={item.name}>
                <Link href={item.href} className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
                <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <Sheet>
        <SheetTitle></SheetTitle>
        <SheetTrigger className='flex flex-col absolute md:hidden p-4 '>
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-6">
          <div className="flex items-center mb-8 px-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
            <span className="text-lg font-semibold">Patient</span>
          </div>
          <nav>
          <ul className="space-y-2">
            {list.map(item => (
              <li key={item.name}>
                <Link href={item.href} className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
                  {/* {icons[item.icon]({ className: 'mr-2 h-4 w-4' })} */}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        </SheetContent>
      </Sheet>
    </>

  )
}