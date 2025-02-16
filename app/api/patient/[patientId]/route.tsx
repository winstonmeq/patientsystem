import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { patientId: string } }) {
  try {
    const { patientId } = await params;

    // console.log(patientId)

    if (!patientId) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
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
