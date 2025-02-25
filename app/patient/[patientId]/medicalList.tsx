"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import MedicalEntryForm from "@/app/medical/medicalEntry";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import MedicalUpdatePage from "@/app/medical/medicalUpdate";

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
  remarks: string;
}

const MedicalList = ({ userId }: { userId: string }) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1"; // Get current page from URL

  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [medicals, setMedicals] = useState<Medical[]>([]); // Apply the Patient type here

  const router = useRouter();

  
  const [modalOpenStates, setModalOpenStates] = useState<{[id: string | number]: boolean}>({});

  const handleOpenChange = (id: string | number, isOpen: boolean) => {
    setModalOpenStates(prevState => ({
      ...prevState,
      [id]: isOpen,
    }));
  };

  const isModalOpen3 = (id: string | number): boolean => {
    return modalOpenStates[id] || false; // Return true if open for this ID, false otherwise
  };



  const fetchPatientData = useCallback(async () => {
    // Use useCallback
    try {
      const response = await fetch(`/api/patient/${patientId}`);
      if (!response.ok) throw new Error("Failed to fetch patient data");
      const responseData = await response.json();
      setPatient(responseData);

      console.log(responseData);

      setMedicals(responseData.medical);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [patientId]); // Dependencies of fetchPatientData

  useEffect(() => {
    if (!patientId) return;

    fetchPatientData();
  }, [patientId, fetchPatientData]);

  // Handle save and reload patient data
  const handleSave = async () => {
    // After saving the new patient, fetch the updated list
    // await fetchMedicals()
    await fetchPatientData();
    setIsModalOpen(false); // Close the modal after saving
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!isConfirmed) return; // Stop execution if the user cancels

    try {
      const response = await fetch(`/api/medical/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPatientData();
        const responseData = await response.json();
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
    <div className="py-10 ">
      {patient ? (
        <Card className="w-full  shadow-lg rounded-lg mb-4">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              <div className="px-2">
                <Link href={`/records?page=${currentPage}`}>
                  <Button className="flex flex-row justify-end mb-4">
                    Back
                  </Button>
                </Link>
              </div>

              <div className="flex flex-row justify-center">
                Individual Treatment Record
              </div>
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
                    <Input
                      id="middlename"
                      value={patient.middleName}
                      readOnly
                    />
                    <span className="text-xs">Middle Name</span>
                  </div>

                  <div>
                    <Input
                      id="dateOfBirth"
                      value={format(
                        new Date(patient.dateOfBirth),
                        "dd/MM/yyyy"
                      )}
                      readOnly
                    />
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
                    <Input
                      id="municipality"
                      value={patient.municipality}
                      readOnly
                    />
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

      <Card className="w-full shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Medical Record
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4">
                <UserPlus className="mr-2 h-4 w-4" /> Add Medical
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Medical Record</DialogTitle>
              </DialogHeader>
              <MedicalEntryForm
                onClose={() => setIsModalOpen(false)}
                onSaveSuccess={handleSave}
                userId={userId}
                patientId={patientId?.toString()}
              />
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
                <TableHead>Remarks</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            
              {medicals?.map((items) => {
             
                return (
                  <TableRow key={items.id}>
                    <TableCell>
                      {new Date(items.date).toLocaleDateString()}
                    </TableCell>
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
                    <TableCell>{items.remarks}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog
                         open={isModalOpen3(items.id)}
                         onOpenChange={(isOpen) => handleOpenChange(items.id, isOpen)}
                        >
                          <DialogTrigger asChild>
                            <Button className="mb-4">Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Medical Record</DialogTitle>
                            </DialogHeader>

                            <MedicalUpdatePage medicalId={items.id} />
                            
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() => {
                            handleDelete(items.id);
                          }}
                        >
                          X
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
               })} 
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalList;
