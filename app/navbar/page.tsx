'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()

  const {
    data: session,
    isPending, // loading state
    error // error object
  } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in") // redirect to login page
        }
      }
    })
  }


  return (
    <div className='border-b px-4'>
      <div className='flex items-center justify-between mx-auto max-w-6xl p-2'>
        <div className='font-bold text-2xl'>Patient System</div>
        <div className='flex gap-2'>
          {session ? (
            <Button onClick={handleSignOut}>Logout</Button>
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
