// components/Sidebar.tsx
import React from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from 'next/link';

interface ListItem {
  name: string;
  href: string;
  icon: string;
}

const list: ListItem[] = [
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
        <SheetTitle></SheetTitle>
        <SheetTrigger className='flex flex-col absolute md:hidden p-4 '>
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-6">
          <div className="flex items-center mb-8 px-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
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
        </SheetContent>
      </Sheet>
    </>

  )
}