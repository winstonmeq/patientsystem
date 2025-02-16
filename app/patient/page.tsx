

import React from 'react'
import PatientEntry from './patientEntry'
import PatientTable from './patientTable'
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const Page = async () => {

  const session = await auth.api.getSession({
    headers: await headers()    
  });

 

  if (!session) {
    return redirect('/sign-in')
  }

  const userId = session?.user.id

  return (
    
    <div className='w-full'><PatientTable userId={userId} /></div>
  )
}

export default Page