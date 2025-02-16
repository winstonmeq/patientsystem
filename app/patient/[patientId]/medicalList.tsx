"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import MedicalEntryForm from "@/app/medical/medicalEntry";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  barangay: string;
  municipality: string;
  province: string;
}


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

const MedicalList = ({userId}:{userId:string}) => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [medicals, setMedicals] = useState<Medical[]>([]) // Apply the Patient type here



  useEffect(() => {
    if (!patientId) return;

    const fetchPatientData = async () => {
      try {
        const response = await fetch(`/api/patient/${patientId}`);
        if (!response.ok) throw new Error("Failed to fetch patient data");
        const responseData = await response.json();
        setPatient(responseData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);







// Fetch patients from the API endpoint
  const fetchMedicals = async () => {
    try {
      const response = await fetch(`/api/medical/${patientId}`)

      if (response.ok) {

        const responseData = await response.json()

        console.log(responseData)
        
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


  




  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col justify-center items-center p-4 ">
      {patient ? (
        <Card className="w-full max-w-6xl shadow-lg rounded-lg mb-4">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Individual Treatment Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="font-semibold">Name</Label>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Input id="lastname" value={patient.lastName} readOnly />
                    <span className="text-xs">Last Name</span>
                  </div>
                  <div>
                    <Input id="firstname" value={patient.firstName} readOnly />
                    <span className="text-xs">First Name</span>
                  </div>
                  <div>
                    <Input id="middlename" value={patient.middleName} readOnly />
                    <span className="text-xs">Middle Name</span>
                  </div>

                  <div>
                <Input id="dateOfBirth" value={format(new Date(patient.dateOfBirth), "dd/MM/yyyy")} readOnly />
                <span className="text-xs">DOB</span>
              </div>
                </div>
              </div>

             

              <div>
                <Label className="font-semibold">Address</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input id="barangay" value={patient.barangay} readOnly />
                    <span className="text-xs">Barangay</span>
                  </div>
                  <div>
                    <Input id="municipality" value={patient.municipality} readOnly />
                    <span className="text-xs">Municipality</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center">No patient found.</p>
      )}


<Card className="w-full max-w-6xl shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Medical Record
            </CardTitle>
          </CardHeader>
          <CardContent>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <div>
          <Button className="mb-4">
            <UserPlus className="mr-2 h-4 w-4" /> Add Medical 
          </Button>
          <Button className="mb-4">
              <Link href={'/patient'}>Back</Link>
          </Button>
          </div>
        
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Medical Record</DialogTitle>
          </DialogHeader>
          <MedicalEntryForm onClose={() => setIsModalOpen(false)} onSaveSuccess={handleSave} userId={userId} patientId={patientId?.toString()} />
        </DialogContent>
      </Dialog>

        
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

          {medicals ? (
            medicals.map((items) => (
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
            ))
          ):(null)}



        </TableBody>
      </Table>








          </CardContent>
        </Card>










    </div>
  );
};

export default MedicalList;
