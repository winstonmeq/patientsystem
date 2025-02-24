

import React from 'react'
import PatientTable from './recordTable'
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import RecordTable from './recordTable';

const Page = async () => {

  const session = await auth.api.getSession({
    headers: await headers()    
  });

 

  if (!session) {
    return redirect('/sign-in')
  }

  const userId = session?.user.id

  return (
    
    <div><RecordTable userId={userId} /></div>
  )
}

export default Page