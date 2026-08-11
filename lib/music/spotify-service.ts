import { Playlist, MusicMood } from '@/types';
import { INITIAL_PLAYLISTS } from './music-provider';

export async function fetchSpotifyAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await res.json();
    return data.access_token || null;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
}

export async function searchSpotifyPlaylists(query: string, mood?: MusicMood): Promise<Playlist[]> {
  const token = await fetchSpotifyAccessToken();

  if (!token) {
    // Return curated fallback playlists matching mood
    if (mood) {
      return INITIAL_PLAYLISTS.filter((p) => p.mood === mood);
    }
    return INITIAL_PLAYLISTS;
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=8`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!data.playlists?.items) return INITIAL_PLAYLISTS;

    return data.playlists.items.map((item: any) => ({
      id: item.id,
      title: item.name,
      description: item.description || `Curated Spotify playlist for ${query}`,
      provider: 'SPOTIFY',
      externalUrl: item.external_urls?.spotify || `https://open.spotify.com/playlist/${item.id}`,
      coverImage: item.images?.[0]?.url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80',
      songCount: item.tracks?.total || 15,
      durationLabel: `${item.tracks?.total || 15} SONGS`,
      mood: mood || 'CHILL',
      genres: ['Indie', 'Chill', 'Urban'],
    }));
  } catch (error) {
    console.error('Error querying Spotify API:', error);
    return INITIAL_PLAYLISTS;
  }
}
