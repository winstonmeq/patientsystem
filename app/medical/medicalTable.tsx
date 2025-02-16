'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import React, { useState, useEffect } from "react"



interface Medical {
  id: string
  patientId: string
  userId: string
  age: string
  date: string
  wt: string
  ht: string
  temp: string
  bp: string
  pr1: string
  pr2: string
  s: string
  a: string
  p: string

}





export default function MedicalTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [medicals, setMedicals] = useState<Medical[]>([]) // Apply the Patient type here
  const [loading, setLoading] = useState(true) // Track loading state
  const [progress, setProgress] = useState(0) // Progress state for the loading bar

  // Fetch patients from the API endpoint
  const fetchMedicals = async () => {
    try {
      const response = await fetch('/api/medical/')
      if (response.ok) {

        const responseData = await response.json()

        console.log(responseData.result)
        
        setMedicals(responseData.result)

      } else {
        console.error("Failed to fetch patients")
      }
    } catch (error) {
      console.error("Error fetching patients:", error)
    } finally {
      setLoading(false) // Stop loading once the fetch is done
      
    }
  }

  useEffect(() => {
    fetchMedicals()
  }, [])

  // Handle save and reload patient data
  const handleSave = async () => {
    // After saving the new patient, fetch the updated list
    await fetchMedicals()
    setIsModalOpen(false) // Close the modal after saving
  }


  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/medical/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {

        fetchMedicals()
        const responseData = await response.json()
        console.log(responseData.message);
      }
    } catch (error) {
      console.error(
        "Error deleting image:",
        error || "An unexpected error occurred"
      );
    }
  };



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


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Temp</TableHead>
            <TableHead>BP</TableHead>
            <TableHead>PR1</TableHead>
            <TableHead>PR2</TableHead>
            <TableHead>S</TableHead>
            <TableHead>A</TableHead>
            <TableHead>P</TableHead>
            <TableHead>Action</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {medicals.map((items) => (
            <TableRow key={items.id}>
                <TableCell>{new Date(items.date).toLocaleDateString()}</TableCell>
              <TableCell>{items.age}</TableCell>
              <TableCell>{items.wt}</TableCell>
              <TableCell>{items.ht}</TableCell>
              <TableCell>{items.temp}</TableCell>
              <TableCell>{items.bp}</TableCell>
              <TableCell>{items.pr1}</TableCell>
              <TableCell>{items.pr2}</TableCell>
              <TableCell>{items.s}</TableCell>
              <TableCell>{items.a}</TableCell>
              <TableCell>{items.p}</TableCell>
              <TableCell><Link href={`/medical/${items.id}`}>Edit</Link></TableCell>
              <TableCell><Button onClick={() => {handleDelete(items.id)}}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
