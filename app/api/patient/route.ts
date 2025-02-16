import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const {lastName, firstName, middleName, barangay, municipality, province, dateOfBirth, userId } = data
    if (!lastName || !firstName || !middleName || !barangay || !municipality || !province || !dateOfBirth || !userId ) {
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
export async function GET() {

 

  try {
    const patients = await prisma.patient.findMany({
      include: {
        medical: true
      }
    })
    

    return NextResponse.json({result:patients})

  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.error()
  }
}


