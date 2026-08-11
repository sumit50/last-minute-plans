import { NextResponse } from 'next/server';
import { getDbPlanBySlug } from '@/lib/plans/service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const plan = await getDbPlanBySlug(slug);

    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'NOTHING HERE. MAKE SOMETHING HAPPEN.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      plan,
    });
  } catch (error: any) {
    console.error('Error fetching plan by slug:', error);
    return NextResponse.json(
      { success: false, error: 'WE LOST THE PLOT. TRY AGAIN.' },
      { status: 500 }
    );
  }
}
