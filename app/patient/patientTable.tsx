'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import PatientEntry from "./patientEntry"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from 'lucide-react'

// Define the patient type
interface Patient {
  id: number
  firstName: string
  lastName: string
  middleName: string
  dateOfBirth: string
  barangay: string
  municipality: string
  province: string
}

export default function PatientTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [patients, setPatients] = useState<Patient[]>([]) // Apply the Patient type here
  const [loading, setLoading] = useState(true) // Track loading state
  const [progress, setProgress] = useState(0) // Progress state for the loading bar

  // Fetch patients from the API endpoint
  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patient/')
      if (response.ok && response.body) {
        const reader = response.body.getReader() // Use `getReader()` after confirming `response.body` is not undefined
        const decoder = new TextDecoder()
        let done = false
        let chunk = ''
        let progressInterval = 0

        // Simulate progress bar updates while fetching data
        while (!done) {
          const { value, done: readerDone } = await reader.read() // Properly handle the reader result
          done = readerDone
          if (value) { // Ensure value is not undefined or null
            chunk += decoder.decode(value)
          }
          progressInterval += 10
          setProgress(Math.min(progressInterval, 100)) // Simulating loading progress
          await new Promise((resolve) => setTimeout(resolve, 100)) // Adjust delay for a smoother progress
        }

        const data: Patient[] = JSON.parse(chunk) // Parse the final response
        setPatients(data)
      } else {
        console.error("Failed to fetch patients")
      }
    } catch (error) {
      console.error("Error fetching patients:", error)
    } finally {
      setLoading(false) // Stop loading once the fetch is done
      setProgress(100) // Complete the progress bar
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  // Handle save and reload patient data
  const handleSave = async () => {
    // After saving the new patient, fetch the updated list
    await fetchPatients()
    setIsModalOpen(false) // Close the modal after saving
  }

  return (
    <div className="container mx-auto py-10 relative">
      {/* Loading bar at the top */}
      {loading && (
        <div className="absolute top-0 left-0 w-full">
          <div
            className="h-1 bg-red-500"
            style={{ width: `${progress}%`, transition: 'width 0.5s' }}
          ></div>
        </div>
      )}

      {/* Circular Progress when loading */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div> {/* Spinner */}
        </div>
      )}

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
          <PatientEntry onClose={() => setIsModalOpen(false)} onSaveSuccess={handleSave} />
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
              <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
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
