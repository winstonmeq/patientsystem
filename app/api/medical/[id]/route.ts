import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();


export async function GET(_req: Request, { params }:{params: Promise<{id: string}>}) {
  try {
    const { id } = await params;

    // console.log(patientId)

    if (!id) {
      return NextResponse.json({ error: 'Medical ID is required' }, { status: 400 });
    }

    const getRecord = await prisma.medical.findUnique({
      where: { id: id },
      
     
    });

    if (!id) {
      return NextResponse.json({ error: 'medical not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Medical record find successfully", data: getRecord },
      { status: 200 }
    );

  } catch (error) {

    console.error('Error fetching medical:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma after the operation.  Important!
}
}





export async function PUT(request: NextRequest, { params }: { params:  Promise<{id: string}> }) {
    try {

      const { id } = await params;

      const body = await request.json(); // Parse request body
  
      console.log("Updating ID:", id, "with data:", body);
  
      if (!id) {
        return NextResponse.json(
          { error: "Medical record ID is required" },
          { status: 400 }
        );
      }
  
      // Update the record in Prisma database
      const updatedRecord = await prisma.medical.update({
        where: { id },
        data: body, // Update with the new data from the request
      });
  
      return NextResponse.json(
        { message: "Medical record updated successfully", data: updatedRecord },
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
  } finally {
      await prisma.$disconnect(); // Disconnect Prisma after the operation.  Important!
  }
}



