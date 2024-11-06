

import React from 'react'
import PatientEntry from './patientEntry'
import PatientTable from './patientTable'

const Page = () => {

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