

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

  

    async function getPatients() {
        const res = await fetch('https://sample.com/patient/')
        if (!res.ok) {
          throw new Error('Failed to fetch patients')
        }
        return res.json()
      }


  return (
    
    <div className='w-full m-2 p-2'><PatientTable /></div>
  )
}

export default Page