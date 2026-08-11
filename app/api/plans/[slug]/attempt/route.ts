import { NextResponse } from 'next/server';
import { recordPlanAttempt } from '@/lib/attempts/service';
import { prisma } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const plan = await prisma.plan.findUnique({ where: { slug } });
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Default to demo user if not authenticated
    const demoUser = await prisma.user.findFirst();
    const userId = body.userId || demoUser?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const result = await recordPlanAttempt({
      userId,
      planId: plan.id,
      actualCost: Number(body.actualCost || plan.budgetMax),
      actualDuration: Number(body.actualDuration || plan.durationMax),
      rating: Number(body.rating || 5),
      review: body.review || '',
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Error logging plan attempt:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'WE LOST THE PLOT. TRY AGAIN.' },
      { status: 400 }
    );
  }
}
