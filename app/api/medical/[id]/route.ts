import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();



export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    console.log('atientId',id)

    if (!id) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
    }
    const objectId = new ObjectId(id);

    const medical = await prisma.medical.findMany({
      where: { patientId: objectId.toString() }, // Ensure conversion
    });


    if (!medical) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json({result:medical, status: 200 });

  } catch (error) {

    console.error('Error fetching patient:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }
}














export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    console.log("Delete ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Medical record ID is required" },
        { status: 400 }
      );
    }

    // Delete the record from Prisma database
    const deletedRecord = await prisma.medical.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Medical record deleted successfully", data: deletedRecord },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting medical record:", error);
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
}
