"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  age: z.number().int().positive("Age must be a positive integer"),
  date: z.coerce.date(),
  wt: z.number().positive("Weight must be a positive number"),
  ht: z.number().positive("Height must be a positive number"),
  Temp: z.number().positive("Temperature must be a positive number"),
  BP: z.string().min(0, "Blood Pressure is required"),
  PR1: z.string().min(0, "PR1 is required"),
  PR2: z.string().min(0, "PR2 is required"),
  s: z.string().min(0, "S is required"),
  a: z.string().min(0, "A is required"),
  p: z.string().min(0, "P is required"),
})

export default function MedicalEntryForm({ onClose, onSaveSuccess, userId, patientId }: { onClose: () => void, onSaveSuccess: () => void, userId: string, patientId: any }) {

  const { toast } = useToast(); // ✅ Initialize toast function
  const [loading, setLoading] = useState(true);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId ?? "",
      patientId: patientId ?? "",
      age: 0,
      date: new Date(), 
      wt: 0,
      ht: 0,
      Temp: 0,
      BP: "",
      PR1: "",
      PR2: "",
      s: "",
      a: "",
      p: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {

      setLoading(true)
    
    try {
      console.log("Submitting medical data:", values);
  
      const response = await fetch("/api/medical/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        console.log("Medical data saved successfully");
        toast({
          title: "Success",
          description: "Your form was submitted successfully.",
        });
  
        onSaveSuccess?.(); // Ensure function exists before calling
        onClose?.(); // Ensure function exists before calling
        setLoading(false)
      } else {
        const errorText = await response.text();
        console.error("Failed to save medical data:", errorText);
        toast({
          title: "Error",
          description: "Failed to submit form. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving medical data:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* <div className="flex flex-row gap-2">
      <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input placeholder="User ID" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient ID</FormLabel>
              <FormControl>
                <Input placeholder="Patient ID" {...field} readOnly/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          </div> */}
       
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
          value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Temp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Temperature"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="BP"
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
          name="PR1"
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
          name="PR2"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

