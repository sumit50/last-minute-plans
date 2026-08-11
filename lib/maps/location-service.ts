import { LocationCoordinates } from '@/types';

export interface LocationService {
  getCurrentLocation(): Promise<LocationCoordinates>;
  getNearbySpots(city: string): LocationCoordinates[];
}

export const CHANDIGARH_SPOTS: LocationCoordinates[] = [
  { name: 'Sector 17 Plaza', city: 'Chandigarh', lat: 30.7398, lng: 76.7827 },
  { name: 'Sukhna Lake Promenade', city: 'Chandigarh', lat: 30.7421, lng: 76.8188 },
  { name: 'Sector 35 Food Belt', city: 'Chandigarh', lat: 30.7241, lng: 76.7645 },
  { name: 'Panjab University StuC', city: 'Chandigarh', lat: 30.7588, lng: 76.7686 },
  { name: 'Sector 19 Palika Bazaar', city: 'Chandigarh', lat: 30.7314, lng: 76.7901 },
  { name: 'Phase 3B2 Food Lights', city: 'Mohali', lat: 30.7046, lng: 76.7179 },
  { name: 'Sector 7 Cafe Promenade', city: 'Chandigarh', lat: 30.7352, lng: 76.8012 },
  { name: 'Sector 10 Museum & Gallery', city: 'Chandigarh', lat: 30.7485, lng: 76.7944 },
];

class DefaultLocationService implements LocationService {
  async getCurrentLocation(): Promise<LocationCoordinates> {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        return {
          name: 'Your Current Spot',
          city: 'Chandigarh',
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      } catch (err) {
        console.warn('Geolocation fallback to default city spot');
      }
    }
    return CHANDIGARH_SPOTS[0];
  }

  getNearbySpots(city: string): LocationCoordinates[] {
    return CHANDIGARH_SPOTS.filter(spot => spot.city.toLowerCase() === city.toLowerCase() || city.toLowerCase().includes('chandigarh') || city.toLowerCase().includes('mohali'));
  }
}

export const locationService = new DefaultLocationService();
