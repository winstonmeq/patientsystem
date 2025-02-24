import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/patient/
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    console.log('startDate', startDate, "+", endDate);

    try {
        const patients = await prisma.patient.findMany({
            skip,
            take: limit,
            where: {
                // Only include patients who have at least one medical record
                medical: {
                    //some:
                    some: {
                        // Apply date filter if provided
                        date: {
                            ...(startDate && { gte: new Date(startDate) }),
                            ...(endDate && { lte: new Date(endDate) }),
                        }
                    }
                }
            },
            include: {
                medical: {
                    where: {
                        date: {
                            ...(startDate && { gte: new Date(startDate) }),
                            ...(endDate && { lte: new Date(endDate) }),
                        },
                    },
                },
            },

            orderBy: {
                createdAt: 'desc',
            },
        });


          // Count total medical records (optionally filtered by date)
    const totalrows = await prisma.medical.count({
        where: {
          ...(startDate && { createdAt: { gte: new Date(startDate) } }),
          ...(endDate && { createdAt: { lte: new Date(endDate) } }),
        },
      });

        return NextResponse.json({ result: patients, totalrows: totalrows });
        
    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.error();
    }
}

