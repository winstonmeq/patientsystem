'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PatientEntry from "./patientEntry";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from 'lucide-react';
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";



interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  barangay: string;
  municipality: string;
  province: string;
}

export default function PatientTable({ userId }: { userId: string }) {

  
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);




  const fetchPatients =  useCallback(async (currentPage:number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/patient?page=${currentPage}&limit=${rowsPerPage}`, {
        cache: "no-store", // Ensures caching
      });
      if (response.ok) {
        const responseData = await response.json();
        setPatients(responseData.result);
        setTotalPages(Math.ceil(responseData.totalrows / rowsPerPage)); // Assuming API returns total count
      } else {
        console.error("Failed to fetch patients");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  },[]);


 

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage, fetchPatients]); // Refetch when page changes


   // Update URL when currentPage changes
   useEffect(() => {
    router.replace(`?page=${currentPage}`);
  }, [currentPage, router]);



  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  

  const filterData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/patient/search?lastName=${searchTerm}`);
      if (response.ok) {
        const responseData = await response.json();
        setPatients(responseData.result);
        setTotalPages(responseData.totalrows / rowsPerPage); // Assuming API returns total count
      } else {
        console.error("Failed to fetch patients");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleSave = async () => {
    await fetchPatients(currentPage);
    setIsModalOpen(false);
  };

  return (
    <Card className="py-10">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    <CardContent>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-row gap-4">
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Patient
            </Button>
          </DialogTrigger>

          <Input
            type="text"
            placeholder="Search by Last Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 border rounded"
          />

          <Button onClick={filterData}>Filter</Button>
          </div>
         

        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <PatientEntry onClose={() => setIsModalOpen(false)} onSaveSuccess={handleSave} userId={userId} />
       
       
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
            <TableHead>Action</TableHead>
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
              <TableCell>
                <div className="flex gap-2">
                {/* <Link href={`/patient/${patient.id}`}><Button>Medical</Button></Link>
                <Button variant={'outline'} asChild><Link href={`/patient/update/${patient.id}`}>Edit</Link></Button> */}
               {/* <Button onClick={() => router.push(`/patient/${patient.id}?page=${currentPage}`)}>Medical</Button> */}
               <Button variant="outline" onClick={() => router.push(`/patient/update/${patient.id}?page=${currentPage}`)}>Edit</Button>
               
                </div>
              </TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
      <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
      </div>
      </CardContent>
    </Card>
  );
}
