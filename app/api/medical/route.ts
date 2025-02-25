import { NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the schema for validation
const medicalSchema = z.object({
  userId: z.string(),
  patientId: z.string(),
  age: z.number(),
  date: z.string(),
  wt: z.number(),
  ht: z.number(),
  Temp: z.number(),
  BP: z.string(),
  PR1: z.string(),
  PR2: z.string(),
  s: z.string(),
  a: z.string(),
  p: z.string(),
  remarks: z.string()
});

// Handle POST request to save medical data
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = medicalSchema.parse(body);

    // Save data to Prisma database
    const patient = await prisma.medical.create({
      data: {
        userId: validatedData.userId,
        patientId: validatedData.patientId,
        age: validatedData.age,
        date: validatedData.date,
        wt: validatedData.wt,
        ht: validatedData.ht,
        temp: validatedData.Temp,
        bp: validatedData.BP,
        pr1: validatedData.PR1,
        pr2: validatedData.PR2,
        s: validatedData.s,
        a: validatedData.a,
        p: validatedData.p,
        remarks: validatedData.remarks
      },
    });

    return NextResponse.json(
      { message: "Medical data saved successfully", data: patient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving medical data:", error);
    return NextResponse.json(
      { error: error instanceof z.ZodError ? error.errors : "Invalid data" },
      { status: 400 }
    );
  }
}



// export async function GET() { 

//   try {
//     const medicalData = await prisma.medical.findMany()
    

//     return NextResponse.json({result:medicalData})

//   } catch (error) {

//     console.error("Error fetching patients:", error)

//     return NextResponse.error()
//   }
// }

