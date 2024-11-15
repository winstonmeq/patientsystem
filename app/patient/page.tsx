

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
    return redirect('/')
  }

  

  return (
    
    <div className='w-full'><PatientTable /></div>
  )
}

export default Page