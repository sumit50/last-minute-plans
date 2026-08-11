export interface GeocodeResult {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

export async function geocodeLocation(query: string): Promise<GeocodeResult> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    // Fallback geocoder for Chandigarh area
    return {
      address: query,
      city: 'Chandigarh',
      lat: 30.7333,
      lng: 76.7794,
    };
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
    );
    const data = await res.json();

    if (data.results?.[0]) {
      const loc = data.results[0].geometry.location;
      return {
        address: data.results[0].formatted_address,
        city: query.includes('Mohali') ? 'Mohali' : 'Chandigarh',
        lat: loc.lat,
        lng: loc.lng,
      };
    }
  } catch (error) {
    console.error('Google Maps Geocode Error:', error);
  }

  return {
    address: query,
    city: 'Chandigarh',
    lat: 30.7333,
    lng: 76.7794,
  };
}
