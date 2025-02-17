// components/Sidebar.jsx
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { icons } from "./icons"
import Link from 'next/link';

const list = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "dashboard"
  },
  {
    name: "Recall-Liste",
    href: "/recall-list",
    icon: "list_alt"
  },
  {
    name: "Nachrichten",
    href: "/messages",
    icon: "mail"
  },
  {
    name: "Laborergebnisse",
    href: "/lab-results",
    icon: "lab_profile"
  },
  {
    name: "Rezepte",
    href: "/prescriptions",
    icon: "receipt"
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "summarize"
  },
  {
    name: "Performance",
    href: "/performance",
    icon: "insights"
  },
  {
    name: "Wartezimmer",
    href: "/waiting-room",
    icon: "meeting_room"
  },
  {
    name: "Aufgaben",
    href: "/tasks",
    icon: "task"
  },
  {
    name: "Kalender",
    href: "/calendar",
    icon: "calendar_month"
  }
]


export function Sidebar() {
  return (
    <>
      <aside className="bg-blue-900 text-white py-6 px-4 w-64 flex-col hidden md:flex">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded-full bg-white mr-2"></div>
          <span className="text-lg font-semibold">medloop</span>
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
      </aside>
      <Sheet>
        <SheetTrigger className='md:hidden p-4 '>
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-6">
          <div className="flex items-center mb-8 px-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
            <span className="text-lg font-semibold">medloop</span>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              {list.map(item => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground")} href={item.href}>
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </>

  )
}