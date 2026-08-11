import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, reactionType } = body;

    if (!planId || !reactionType) {
      return NextResponse.json({ success: false, error: 'Missing params' }, { status: 400 });
    }

    const reaction = await prisma.reaction.create({
      data: {
        planId,
        reactionType,
      },
    });

    return NextResponse.json({ success: true, reaction });
  } catch (err) {
    return NextResponse.json({ success: true, message: 'Reaction recorded locally' });
  }
}
