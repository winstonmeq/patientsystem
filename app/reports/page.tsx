"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

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

interface ApiResponse {
  result: Patient[];
  totalrows: number;
}


const ReportsPage = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);
  
  const [filteredPatients, setFilteredPatients] = useState<Patient[] | null>(
    null
  );
  const tableRef = useRef<HTMLDivElement>(null);



  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reports?page=${currentPage}&limit=${rowsPerPage}`);
      if (response.ok) {
        const responseData = await response.json();
        setPatient(responseData.result);
        setFilteredPatients(responseData.result);

        setTotalPages(Math.ceil(responseData.totalrows / rowsPerPage)); // Assuming API returns total count
      } else {
        console.error("Failed to fetch patients");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  },[currentPage]);

  useEffect(() => {
    fetchPatients();
  }, [currentPage, fetchPatients]); // Refetch when page changes


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };




  const handleFilter = async () => {
    setLoading(true);

    try {
      const formattedStartDate = startDate ? startDate.toString().split("T")[0] : undefined;
      const formattedEndDate = endDate ? endDate.toString().split("T")[0] : undefined;

      try {
        const response = await fetch(`/api/reports?startDate=${startDate}&endDate=${endDate}`);
        if (response.ok) {
          const responseData = await response.json();
          setPatient(responseData.result);
          setFilteredPatients(responseData.result);
  
          setTotalPages(Math.ceil(responseData.totalrows / rowsPerPage)); // Assuming API returns total count
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }




    } catch (err) {
      setError("Failed to load patients.");
    } finally {
      setLoading(false);
    }
  };



  

  const handlePrint = () => {
    const printContent = document.createElement("div");
    printContent.innerHTML = `
      <html>
        <head>
          <title>Print Report</title>
          <style>
            @page { size: A4; margin: 10mm; }
            body { font-family: Arial, sans-serif; text-align: center; width: 800px; margin: auto; }
            h1 { font-size: 16px; margin-bottom: 5px; }
            h2 { font-size: 14px; margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Rural Health Unit</h1>
          <h2>Medical Records for the Month of ${startDate} - ${endDate}</h2>
          ${tableRef.current?.innerHTML}
        </body>
      </html>
    `;

    const printWindow = document.createElement("iframe");
    printWindow.style.position = "absolute";
    printWindow.style.width = "0px";
    printWindow.style.height = "0px";
    printWindow.style.border = "none";
    document.body.appendChild(printWindow);

    const doc =
      printWindow.contentDocument || printWindow.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(printContent.innerHTML);
      doc.close();
      printWindow.contentWindow?.focus();
      printWindow.contentWindow?.print();
      document.body.removeChild(printWindow);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;




  return (
    <div className="py-10 ">
      {patient ? (
        <Card className="w-full shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              {/* <div className="px-2">
                <Link href={"/patient"}>
                  {" "}
                  <Button className="flex flex-row justify-end mb-4">
                    Back{" "}
                  </Button>
                </Link>
              </div> */}

              <div className="flex flex-row justify-center">Report Pages</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex gap-4 mt-6">
              <Button onClick={handleFilter}>Filter</Button>
              <Button onClick={handlePrint}>Print</Button>
              </div>
             
            </div>
            <div ref={tableRef}>
              <Table>
                <TableHeader>
                  <TableRow>
                  <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>DoB</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Check Up Date</TableHead>
                    <TableHead>Sign/Symptoms</TableHead>
                    <TableHead>Diagnose</TableHead>
                    <TableHead>Treament</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients?.map((items, index) => 


                  {


                    const startIndex = (currentPage - 1) * rowsPerPage; // Calculate the start index
                    const rowNumber = startIndex + index + 1; // Calculate the current row number

                    console.log(currentPage + "," + index  + ","+ startIndex)

                    return (
                    
                              
               

<TableRow key={items.id}>
  <TableCell>{rowNumber}</TableCell>
  <TableCell>
    {items.lastName}, {items.firstName}
  </TableCell>
  <TableCell>
    {new Date(items.dateOfBirth).toLocaleDateString()}
  </TableCell>
  <TableCell>{items.barangay}</TableCell>
  <TableCell>
    {items.medical?.map((index)=>(
      <div key={index.id}>
        {new Date(index.date).toLocaleDateString()}
      </div>
    )) || "No data"}
  </TableCell>
  <TableCell className="w-48">
  {items.medical?.map((index)=>(
      <div key={index.id}>
        {index.s}
      </div>
    )) || 'no data'}
  </TableCell>

  <TableCell className="w-48">
  {items.medical?.map((index)=>(
      <div key={index.id}>
        {index.a}
      </div>
    )) || 'no data'}
  </TableCell>
  <TableCell className="w-48">
  {items.medical?.map((index)=>(
      <div key={index.id}>
        {index.p}
      </div>
    )) || 'no data'}
  </TableCell>



</TableRow>

                    
                    )
                  }
               
                  
                  
                  )}
                </TableBody>
              </Table>

           
              

            </div>
          </CardContent>
        </Card>
      ) : null}

<div className="flex justify-center mt-4 space-x-4">
                    <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                          Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                          Next
                        </Button>
                    </div>
    </div>
  );
};

export default ReportsPage;
