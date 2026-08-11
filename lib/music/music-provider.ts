import { Playlist, MusicMood } from '@/types';

export interface MusicProvider {
  getPlaylistForPlan(planId: string): Promise<Playlist | null>;
  getPlaylistsByMood(mood: MusicMood): Promise<Playlist[]>;
  getAllPlaylists(): Promise<Playlist[]>;
}

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-momo-hugs',
    title: '🥟 MOMO HUNT BANGERS',
    description: 'High energy Punjabi beats and desi hip-hop for driving through sector food markets.',
    provider: 'SPOTIFY',
    externalUrl: 'https://open.spotify.com/search/desi%20hip%20hop',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    songCount: 14,
    durationLabel: '14 songs · 48 min',
    mood: 'HYPE',
    genres: ['Punjabi', 'Desi Hip-Hop', 'High Energy', 'Street'],
  },
  {
    id: 'pl-sunset-chai',
    title: '🌅 SUNSET BUT MAKE IT CINEMATIC',
    description: 'Chill indie Hindi tunes, acoustics, and lo-fi beats for sitting on Sukhna Lake stairs.',
    provider: 'SPOTIFY',
    externalUrl: 'https://open.spotify.com/search/hindi%20indie',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    songCount: 18,
    durationLabel: '18 songs · 1h 02m',
    mood: 'SUNSET',
    genres: ['Indie', 'Chill', 'Hindi Indie', 'Lo-fi'],
  },
  {
    id: 'pl-midnight-maggi',
    title: '🌙 2AM + MAGGI + BAD DECISIONS',
    description: 'Dreamy late-night lo-fi, soft R&B, and calm Hindi vocals for car chat sessions at 2 AM.',
    provider: 'SPOTIFY',
    externalUrl: 'https://open.spotify.com/search/late%20night%20lofi',
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop',
    songCount: 15,
    durationLabel: '15 songs · 52 min',
    mood: 'LATE_NIGHT',
    genres: ['Late Night', 'Lo-fi', 'R&B', 'Dreamy'],
  },
  {
    id: 'pl-date-night',
    title: '❤️ WE\'RE NOT CALLING IT A DATE',
    description: 'Sweet acoustic indie, romantic R&B, and soft Bollywood acoustic tracks.',
    provider: 'SPOTIFY',
    externalUrl: 'https://open.spotify.com/search/romantic%20indie',
    coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
    songCount: 16,
    durationLabel: '16 songs · 56 min',
    mood: 'ROMANTIC',
    genres: ['Romantic', 'Indie', 'R&B', 'Bollywood'],
  },
  {
    id: 'pl-road-trip',
    title: '🏍️ NO DESTINATION. FULL VOLUME.',
    description: 'High octane road trip anthems, Punjabi bangers, and driving rock.',
    provider: 'SPOTIFY',
    externalUrl: 'https://open.spotify.com/search/road%20trip%20bangers',
    coverImage: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=800&auto=format&fit=crop',
    songCount: 20,
    durationLabel: '20 songs · 1h 12m',
    mood: 'ROAD_TRIP',
    genres: ['Road Trip', 'Punjabi', 'Rock', 'High Energy'],
  },
  {
    id: 'pl-focus-lockin',
    title: '🧠 2AM CODING & LOCK IN',
    description: 'Instrumental synthwave, deep focus lo-fi, and ambient soundscapes.',
    provider: 'YOUTUBE_MUSIC',
    externalUrl: 'https://music.youtube.com',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    songCount: 22,
    durationLabel: '22 songs · 1h 25m',
    mood: 'FOCUS',
    genres: ['Synthwave', 'Lo-fi Focus', 'Instrumental', 'Ambient'],
  },
  {
    id: 'pl-hostel-chaos',
    title: '🪩 HOSTEL CHAOS & PARTY',
    description: 'Commercial Punjabi remixes, party anthems, and speaker blowers.',
    provider: 'SPOTIFY',
    externalUrl: 'https://open.spotify.com/search/punjabi%20party',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    songCount: 25,
    durationLabel: '25 songs · 1h 30m',
    mood: 'PARTY',
    genres: ['Party', 'Desi Beats', 'Commercial Punjabi'],
  },
  {
    id: 'pl-sad-walk',
    title: '😭 WALKING ALONE IN THE RAIN',
    description: 'Melancholic acoustic guitar, sad indie pop, and slow acoustic ballads.',
    provider: 'SPOTIFY',
    externalUrl: 'https://open.spotify.com/search/sad%20indie',
    coverImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop',
    songCount: 12,
    durationLabel: '12 songs · 42 min',
    mood: 'SAD',
    genres: ['Sad Girl Autumn', 'Acoustic', 'Melancholy'],
  },
];

class DefaultMusicProvider implements MusicProvider {
  async getPlaylistForPlan(planId: string): Promise<Playlist | null> {
    // Map plan id/slug to playlist
    if (planId.includes('momo') || planId.includes('battle') || planId.includes('arcade')) {
      return INITIAL_PLAYLISTS[0]; // Momo bangers
    }
    if (planId.includes('sunset') || planId.includes('chai') || planId.includes('lake') || planId.includes('bookstore')) {
      return INITIAL_PLAYLISTS[1]; // Sunset cinematic
    }
    if (planId.includes('midnight') || planId.includes('bus') || planId.includes('coin')) {
      return INITIAL_PLAYLISTS[2]; // 2AM Maggi
    }
    if (planId.includes('date') || planId.includes('food')) {
      return INITIAL_PLAYLISTS[3]; // Date night
    }
    return INITIAL_PLAYLISTS[0];
  }

  async getPlaylistsByMood(mood: MusicMood): Promise<Playlist[]> {
    return INITIAL_PLAYLISTS.filter((p) => p.mood === mood);
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    return INITIAL_PLAYLISTS;
  }
}

export const musicProvider = new DefaultMusicProvider();
