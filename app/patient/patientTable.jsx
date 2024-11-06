
'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from "react"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import PatientEntry from "./patientEntry"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from 'lucide-react'

// Sample patient data
const patients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    middleName: "Michael",
    birth: "1990-05-15",
    barangay: "San Antonio",
    municipality: "Quezon City",
    province: "Metro Manila"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    middleName: "Elizabeth",
    birth: "1985-09-22",
    barangay: "Poblacion",
    municipality: "Makati",
    province: "Metro Manila"
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    middleName: "William",
    birth: "1978-12-03",
    barangay: "Santo Niño",
    municipality: "Cebu City",
    province: "Cebu"
  }
]

export default function PatientTable() {

  const [isModalOpen, setIsModalOpen] = useState(false)




  return (
    <div className="container mx-auto py-10">

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="mb-4">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Patient</DialogTitle>
                </DialogHeader>
                <PatientEntry onClose={() => setIsModalOpen(false)} />
              </DialogContent>
            </Dialog>


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Birth Date</TableHead>
            <TableHead>Barangay</TableHead>
            <TableHead>Municipality</TableHead>
            <TableHead>Province</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.firstName}</TableCell>
              <TableCell>{patient.lastName}</TableCell>
              <TableCell>{patient.middleName}</TableCell>
              <TableCell>{patient.birth}</TableCell>
              <TableCell>{patient.barangay}</TableCell>
              <TableCell>{patient.municipality}</TableCell>
              <TableCell>{patient.province}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

   


    </div>
  )
}