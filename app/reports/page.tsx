"use client";

import { useState, useEffect, useRef } from "react";
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

const ReportsPage = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[] | null>(
    null
  );
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch("/api/patient");
        if (!response.ok) throw new Error("Failed to fetch patient data");
        const responseData = await response.json();
        setPatient(responseData.result);
        setFilteredPatients(responseData.result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  const handleFilter = () => {
    if (!patient) return;
    const filtered = patient.filter((item) =>
      item.medical.some((record) => {
        const recordDate = new Date(record.date);
        return (
          (!startDate || recordDate >= new Date(startDate)) &&
          (!endDate || recordDate <= new Date(endDate))
        );
      })
    );
    setFilteredPatients(filtered);
  };

  const handlePrint = () => {
    const printContent = document.createElement("div");
    printContent.innerHTML = `
      <html>
        <head>
          <title>Print Report</title>
          <style>
            @page { size: A4; margin: 20mm; }
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
    <div className="flex flex-col justify-center items-center p-4 ">
      {patient ? (
        <Card className="w-full max-w-6xl shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              <div className="px-2">
                <Link href={"/patient"}>
                  {" "}
                  <Button className="flex flex-row justify-end mb-4">
                    Back{" "}
                  </Button>
                </Link>
              </div>

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
              <Button onClick={handleFilter}>Filter</Button>
              <Button onClick={handlePrint}>Print</Button>
            </div>
            <div ref={tableRef}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>DoB</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Diagnose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients?.map((items) => (
                    <TableRow key={items.id}>
                      <TableCell>
                        {items.lastName}, {items.firstName}
                      </TableCell>
                      <TableCell>
                        {new Date(items.dateOfBirth).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{items.barangay}</TableCell>
                      <TableCell>
                        {items.medical.length > 0 ? (
                          <ul>
                            {items.medical
                              .filter((record) => {
                                const recordDate = new Date(record.date);
                                return (
                                  (!startDate ||
                                    recordDate >= new Date(startDate)) &&
                                  (!endDate || recordDate <= new Date(endDate))
                                );
                              })
                              .map((record, index) => (
                                <li key={index}>
                                  {/* {format(new Date(record.date), "MM/dd/yyyy")}{" "} */}
                                  - {record.s}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          "No record"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default ReportsPage;
