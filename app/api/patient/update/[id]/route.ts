

import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req: Request, { params }:{params: Promise<{id: string}>}) {
  try {
    const { id } = await params;

    // console.log(patientId)

    if (!id) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: id },
    
    });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient, { status: 200 });

  } catch (error) {

    console.error('Error fetching patient:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }
}





export async function PUT(request: NextRequest, { params }: { params: Promise<{id: string}> }) {
    try {
      const { id } = await params; // Extract ID from request params
      const body = await request.json(); // Parse request body
  
      console.log("Updating ID:", id, "with data:", body);
  
      if (!id) {
        return NextResponse.json(
          { error: "Patient record ID is required" },
          { status: 400 }
        );
      }
  
      // Update the record in Prisma database
      const updatedRecord = await prisma.patient.update({
        where: { id },
        data: body, // Update with the new data from the request
      });
  
      return NextResponse.json(
        { message: "Patient record updated successfully", data: updatedRecord },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating medical record:", error);
      return NextResponse.json(
        { error: "Failed to update record" },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect(); // Disconnect Prisma after the operation
    }
  }


  
  export async function DELETE(request: NextRequest, { params }: {params: Promise<{id: string}>})
  
  {
    try {
  
      const {id} = await params;
  
      console.log("Delete ID:", id);
  
      if (!id) {
        return NextResponse.json(
          { error: "Patient record ID is required" },
          { status: 400 }
        );
      }
  
      // Delete the record from Prisma database
      const deletedRecord = await prisma.patient.delete({
        where: { id },
      });
  
      return NextResponse.json(
        { message: "Patient Record deleted successfully", data: deletedRecord },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting Patient record:", error);
      return NextResponse.json(
        { error: "Failed to delete record" },
        { status: 500 }
      );
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma after the operation.  Important!
    }
  }