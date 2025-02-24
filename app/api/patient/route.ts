import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const {lastName, firstName, middleName, barangay, municipality, province, dateOfBirth, userId } = data

    
    if (!lastName || !firstName  || !barangay || !municipality || !province || !dateOfBirth || !userId ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Parse date if provided
    const parsedDate = dateOfBirth ? new Date(dateOfBirth) : null

    // Save patient data to the database
    const patient = await prisma.patient.create({
      data: {
        lastName,
        firstName,
        middleName,
        dateOfBirth: parsedDate,
        barangay,
        municipality,
        province,
        userId
      },
    })

    return NextResponse.json({ message: 'Patient saved successfully', patient }, { status: 201 })
    
  } catch (error) {
    console.error('Error saving patient data:', error)
    return NextResponse.json({ error: 'Failed to save patient data' }, { status: 500 })
  }
}


// GET /api/patient/
export async function GET(request:NextRequest) {

  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;
 

  try {
    const patients = await prisma.patient.findMany({

      skip,
      take: limit,
      include: {
        medical: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    const totalrows = await prisma.patient.count(); // Total number of records

    return NextResponse.json({result:patients, totalrows: totalrows})

  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.error()
  }
}


