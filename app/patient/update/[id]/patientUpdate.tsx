"use client";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  barangay: string;
  municipality: string;
  province: string;
  userId: string;
}

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  middleName: z.string().min(0, "Middle Name is required"),
  barangay: z.string().min(1, "Barangay is required"),
  municipality: z.string().min(1, "Municipality is required"),
  province: z.string().min(1, "Province is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
});

export default function PatientEntry({ userId }: { userId: string }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const barangays = [
    "Del Carmen",
    "Poblacion",
    "Labuo",
    "Kamarahan",
    "Greenhill",
    "Camasi",
    "Idaoman",
    "Mabuhay",
    "Tuael",
    "Ilustre",
    "Cabangbangan",
    "F. Cajelo",
    "Sagcungan",
    "Alegria",
    "Lomonay",
    "La Esperanza",
    "New Cebu",
    "Kimahuring",
    "Kisupaan",
    "Salat",
    "Datu Sundungan",
    "Datu Inda",
    "Lama-lama",
    "Bata-bato",
    "Sarayan",
  ];

  const municipalities = ["President Roxas", "Matalam", "Magpet", "Antipas"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId ?? "",
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      barangay: "",
      municipality: "",
      province: "",
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchPatientData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/patient/update/${id}`);
        if (!response.ok) throw new Error("Failed to fetch patient data");
        const responseData = await response.json();
        form.reset({
          userId: responseData.userId,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          middleName: responseData.middleName,
          dateOfBirth: responseData.dateOfBirth,
          barangay: responseData.barangay,
          municipality: responseData.municipality,
          province: responseData.province,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id, form]);



  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/patient/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        router.back();
      } else {
        console.error("Failed to update patient data");
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };


  const handleDelete = async (id: string) => {

      setLoading(true)

    const isConfirmed = window.confirm("Are you sure you want to delete this item?");      
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/patient/update/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error(
        "Error deleting image:",
        error || "An unexpected error occurred"
      );
    }finally {
      setLoading(false)
    }
  };


  if (loading) return <div className="flex justify-center items-center"> 
  <Button disabled>
  <Loader2 className="animate-spin" />
  Please wait
</Button>
</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="py-10">
      <CardContent>
      <div className="flex justify-end">
        <Link href={"/patient"}><Button>Back</Button></Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-8">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <div className="flex flex-row w-full gap-2">
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              new Date(e.target.value).toISOString()
                            )
                          } // Convert to ISO format
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold">Address</h2>
            <div className="flex flex-row gap-3">
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="barangay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barangay</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border rounded-md p-2"
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="">Select Barangay</option>
                          {barangays.map((barangay) => (
                            <option key={barangay} value={barangay}>
                              {barangay}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="municipality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Municipality</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
          <Button type="submit">Update Patient</Button>
          <Button variant="destructive" onClick={() => {handleDelete(`${id}`)}} type="submit">Delete</Button>
         

          </div>
       

        </form>
      </Form>
      </CardContent>
    </Card>
  );
}
