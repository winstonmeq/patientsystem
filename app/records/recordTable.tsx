'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from 'lucide-react';
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";



interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  barangay: string;
  municipality: string;
  province: string;
  medical: {
    id: string;
    patientId: string;
    userId: string;
    age: string;
    date: string;
    wt: string;
    ht: string;
    temp: string;
    bp: string;
    pr1: string;
    pr2: string;
    s: string;
    a: string;
    p: string;
  }[];
}

export default function RecordTable({ userId }: { userId: string }) {

  
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




  const fetchPatients = useCallback(async (currentPage: number) => {
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

    if (!searchTerm?.trim()) {
      alert('Please enter a search term');
      return;
    }


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
      
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-row gap-4">
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

       

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Birth Date</TableHead>
            <TableHead>Barangay</TableHead>
            <TableHead>Sign/Symptoms</TableHead>
            <TableHead>Diagnose</TableHead>
            <TableHead>Treatment</TableHead>
            <TableHead>Remarks</TableHead>


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
              <TableCell>{patient.medical?.map((index)=>(
                <div key={index.id}>
                  {index.s}
                </div>
              )) || "No medical data"}
              </TableCell>
              <TableCell>{patient.medical?.map((index)=>(
                <div key={index.id}>
                  {index.a}
                </div>
              )) || "No medical data"}
              </TableCell>
              <TableCell>{patient.medical?.map((index)=>(
                <div key={index.id}>
                  {index.p}
                </div>
              )) || "No medical data"}
              </TableCell>

              <TableCell>Remarks</TableCell>
              <TableCell>
                <div className="flex gap-2">
                    <Button onClick={() => router.push(`/patient/${patient.id}?page=${currentPage}`)}>Medical</Button>              
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
