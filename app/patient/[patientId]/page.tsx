

import React from 'react'
import MedicalData from './medicalList'

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const Page = async () => {

  const session = await auth.api.getSession({
    headers: await headers()    
  });

 

  if (!session) {
    return redirect('/')
  }

  const userId = session?.user.id

  return (
    
    <div className='w-full'><MedicalData userId={userId} /></div>
  )
}

export default Page