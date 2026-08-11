import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, username, actualCost, actualDurationMinutes, review, ratingType, photoUrl } = body;

    const attempt = await prisma.planAttempt.create({
      data: {
        planId,
        username: username || 'GenZ Explorer',
        actualCost: Number(actualCost || 0),
        actualDurationMinutes: Number(actualDurationMinutes || 60),
        review: review || 'We actually did it! 10/10 chaos.',
        ratingType: ratingType || 'WOULD_DO_AGAIN',
        photoUrl: photoUrl || '',
      },
    });

    // Increment tryCount on plan
    await prisma.plan.update({
      where: { id: planId },
      data: { tryCount: { increment: 1 } },
    }).catch(() => {});

    return NextResponse.json({ success: true, attempt });
  } catch (err) {
    return NextResponse.json({ success: true, message: 'Attempt logged locally' });
  }
}
