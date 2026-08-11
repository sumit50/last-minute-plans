import { NextResponse } from 'next/server';
import { getUserProfileData } from '@/lib/users/service';

export async function GET() {
  try {
    const profileData = await getUserProfileData();
    return NextResponse.json({
      success: true,
      profile: profileData,
    });
  } catch (error: any) {
    console.error('Error fetching profile API:', error);
    return NextResponse.json(
      { success: false, error: 'WE LOST THE PLOT. TRY AGAIN.' },
      { status: 500 }
    );
  }
}
