"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  age: z.number().int().positive("Age must be a positive integer"),
  date: z.coerce.date(),
  wt: z.number().positive("Weight must be a positive number"),
  ht: z.number().positive("Height must be a positive number"),
  temp: z.number().positive("Temperature must be a positive number"),
  bp: z.string().min(0, "Blood Pressure is required"),
  pr1: z.string().min(0, "PR1 is required"),
  pr2: z.string().min(0, "PR2 is required"),
  s: z.string().min(0, "S is required"),
  a: z.string().min(0, "A is required"),
  p: z.string().min(0, "P is required"),
  remarks: z.string().min(0, "Remark is required"),
});




const MedicalUpdatePage = ({medicalId}: {medicalId:string  }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      date: new Date(),
      wt: 0,
      ht: 0,
      temp: 0,
      bp: "",
      pr1: "",
      pr2: "",
      s: "",
      a: "",
      p: "",
      remarks: ""
    },
  });

  useEffect(() => {

    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/medical/${medicalId}`);
        if (!response.ok) throw new Error("Failed to fetch patient data");
        const responseData = await response.json();
        console.log("Fetched data:", responseData);

        form.reset({
          age: responseData.data?.age ?? 0,
          date: responseData.data?.date ? new Date(responseData.data.date) : new Date(),
          wt: responseData.data?.wt ?? 0,
          ht: responseData.data?.ht ?? 0,
          temp: responseData.data?.temp ?? 0,
          bp: responseData.data?.bp || "",
          pr1: responseData.data?.pr1 || "",
          pr2: responseData.data?.pr2 || "",
          s: responseData.data?.s || "",
          a: responseData.data?.a || "",
          p: responseData.data?.p || "",
          remarks: responseData.data?.remarks || ""
        });
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load patient data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [medicalId, form, toast]);


  
  const medicalUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/medical/${medicalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Patient data updated successfully!" });
        router.back();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to update patient data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
      toast({
        title: "Error",
        description: "Something went wrong while updating the data",
        variant: "destructive",
      });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(medicalUpdate)} className="space-y-8">
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Age"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="wt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Weight"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ht"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Height"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="temp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    placeholder="Temperature"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <Input placeholder="Blood Pressure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pr1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PR1</FormLabel>
                <FormControl>
                  <Input placeholder="PR1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pr2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PR2</FormLabel>
                <FormControl>
                  <Input placeholder="PR2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="s"
          render={({ field }) => (
            <FormItem>
              <FormLabel>S</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="S" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>A</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="p"
          render={({ field }) => (
            <FormItem>
              <FormLabel>P</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="P" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="remarks" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};

export default MedicalUpdatePage;