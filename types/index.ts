export type EnergyLevel = 'BASICALLY_DEAD' | 'NORMAL_HUMAN' | 'LETS_GO' | 'BAD_DECISIONS';
export type GroupSize = 'JUST_ME' | '2_PEOPLE' | '3_5_PEOPLE' | 'BIG_GROUP' | 'ITS_COMPLICATED';
export type CategoryType = 'WITH_FRIENDS' | 'DATE' | 'SOLO' | 'AT_HOME' | 'CHAOS';
export type ReactionType = 'WOULD_DO_AGAIN' | 'NEVER_AGAIN' | 'ACTUALLY_FUN' | 'TERRIBLE_IDEA' | 'SAVED' | 'NEED_TO_TRY';
export type MusicMood = 'CHILL' | 'HYPE' | 'LATE_NIGHT' | 'ROMANTIC' | 'CHAOTIC' | 'ROAD_TRIP' | 'FOCUS' | 'PARTY' | 'SUNSET' | 'SAD';
export type MusicProviderType = 'SPOTIFY' | 'YOUTUBE_MUSIC' | 'APPLE_MUSIC';

export interface Playlist {
  id: string;
  title: string;
  description: string;
  provider: MusicProviderType;
  externalUrl: string;
  coverImage: string;
  songCount: number;
  durationLabel: string;
  mood: MusicMood;
  genres: string[];
  createdAt?: string;
}

export interface PlanStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  durationMinutes?: number;
  locationHint?: string;
}

export interface PlanAttempt {
  id: string;
  planId: string;
  userId?: string;
  username: string;
  userAvatar?: string;
  actualCost: number;
  actualDurationMinutes: number;
  review: string;
  ratingType: ReactionType;
  photoUrl?: string;
  completedAt: string;
}

export interface PlanReactionCount {
  WOULD_DO_AGAIN: number;
  NEVER_AGAIN: number;
  ACTUALLY_FUN: number;
  TERRIBLE_IDEA: number;
  SAVED: number;
  NEED_TO_TRY: number;
}

export interface Plan {
  id: string;
  slug: string;
  title: string;
  description: string;
  budget: number;
  budgetLabel: string;
  durationMinutes: number;
  durationLabel: string;
  groupSizeMin: number;
  groupSizeMax: number;
  groupSizeLabel: string;
  groupSizeType: GroupSize;
  energyLevel: EnergyLevel;
  category: CategoryType;
  tags: string[];
  coverImage?: string;
  locationCity: string;
  locationArea?: string;
  rules: string[];
  creatorName: string;
  creatorAvatar?: string;
  isFeatured?: boolean;
  tryCount: number;
  ratingPercentage: number;
  steps: PlanStep[];
  attempts?: PlanAttempt[];
  reactions?: PlanReactionCount;
  playlistId?: string;
  playlist?: Playlist;
  isSaved?: boolean;
  createdAt: string;
}

export interface BoredomFlowState {
  location: string;
  groupSize: GroupSize;
  budget: number;
  energyLevel: EnergyLevel;
  duration: number;
  musicChoice: 'PICK_FOR_ME' | 'ILL_CHOOSE' | 'NO_MUSIC';
  selectedMood?: MusicMood;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
  name: string;
  city: string;
}
