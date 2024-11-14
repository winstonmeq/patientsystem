import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from '@/lib/auth-client'

const Navbar = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
      });

// const handleSignOut = async () => {
//     await auth.api.signOut({
//       headers: headers()
//       })
//       redirect('/sign-in')
//   }


  return (
    <div className='border-b px-4 shadow-sm'>
      <div className='flex items-center justify-between mx-auto max-w-6xl p-2'>
        <div className='font-bold text-2xl'>Patient</div>
        <div className='flex gap-2'>
          {session ? ( <form action={async () => {
            'use server'
            await auth.api.signOut({
              headers: await headers()
            }); 
              redirect('/')
          }}>
            <Button>Logout</Button>

          </form>
          ) : (
            <Link href={'/sign-in'}>
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
