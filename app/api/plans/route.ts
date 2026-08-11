import { NextResponse } from 'next/server';
import { getDbPlans } from '@/lib/plans/service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category') || undefined;
    const budgetMax = searchParams.get('budgetMax') ? Number(searchParams.get('budgetMax')) : undefined;
    const durationMax = searchParams.get('durationMax') ? Number(searchParams.get('durationMax')) : undefined;
    const energyLevel = searchParams.get('energyLevel') || undefined;
    const city = searchParams.get('city') || undefined;
    const search = searchParams.get('search') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 12;

    const data = await getDbPlans({
      category,
      budgetMax,
      durationMax,
      energyLevel,
      city,
      search,
      tag,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    console.error('Error fetching plans from DB:', error);
    return NextResponse.json(
      { success: false, error: 'WE LOST THE PLOT. TRY AGAIN.' },
      { status: 500 }
    );
  }
}
