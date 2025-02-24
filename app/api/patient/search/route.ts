

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lastName = searchParams.get("lastName");

    console.log('lastName', lastName)

    if (!lastName) {
      return NextResponse.json({ error: "Last name is required" }, { status: 400 });
    }

    const searchData= await prisma.patient.findMany({
      where: {
        lastName: {
          contains: lastName,
          mode: "insensitive", // Case-insensitive search
        },
      },
      include: {
        medical: true
      },
    });


    
        const totalrows = await prisma.patient.count(); // Total number of records
    
        return NextResponse.json({result:searchData, totalrows: totalrows})

  } catch (error) {

    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

  }
}
