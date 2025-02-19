import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

// export async function GET(
//   req: NextRequest, // Use NextRequest type for the request
//   { params }: { params: { id: string } } // Correctly type the params
// ) {
//   try {
//     const { id } = params;

//     console.log("patientId", id);

//     if (!id) {
//       return NextResponse.json(
//         { error: "Patient ID is required" },
//         { status: 400 }
//       );
//     }

//     let medicalRecords;

//     try {
//       const objectId = new ObjectId(id);

//       medicalRecords = await prisma.medical.findMany({
//         where: { patientId: objectId.toString() },
//       });
//     } catch (objectIdError) {
//       console.error("Invalid ObjectId:", objectIdError);
//       return NextResponse.json(
//         { error: "Invalid Patient ID format" },
//         { status: 400 }
//       );
//     }

//     if (!medicalRecords || medicalRecords.length === 0) {
//       return NextResponse.json(
//         { error: "No medical records found for this patient." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ result: medicalRecords }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching patient:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }





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