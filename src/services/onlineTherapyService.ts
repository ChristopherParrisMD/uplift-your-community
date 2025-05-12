
import { toast } from "@/components/ui/use-toast";

const API_KEY = "96026dea5d04541d19ecc08a2ed28c4a78da950cbb47653ed5eea66a6afbdde5";
const NETWORK_ID = "onlinetherapy";
const BASE_URL = "https://api.online-therapy.com";

export interface OnlineTherapist {
  id: string;
  name: string;
  image: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  coordinates: [number, number];
  credentials?: string;
  email?: string;
  phone?: string;
  languages?: string[];
  gender?: string;
  practiceAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export async function searchProviders(params: {
  location?: string;
  specialty?: string;
  insurance?: string;
  sortBy?: string;
}): Promise<OnlineTherapist[]> {
  try {
    // Build the URL with query parameters
    const queryParams = new URLSearchParams();
    
    // Add the API key and network ID
    queryParams.append('apiKey', API_KEY);
    queryParams.append('networkId', NETWORK_ID);
    
    // Add search parameters
    if (params.location) queryParams.append('location', params.location);
    if (params.specialty && params.specialty !== 'any') queryParams.append('specialty', params.specialty);
    if (params.insurance && params.insurance !== 'any') queryParams.append('insurance', params.insurance);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);

    const response = await fetch(`${BASE_URL}/providers/search?${queryParams.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch providers');
    }
    
    const data = await response.json();
    return data.providers || [];
  } catch (error: any) {
    console.error('Error fetching providers:', error);
    toast({
      title: "Error",
      description: error.message || "Failed to fetch providers. Please try again.",
      variant: "destructive"
    });
    return [];
  }
}

export async function getLocationSuggestions(query: string): Promise<string[]> {
  try {
    if (!query || query.length < 2) return [];
    
    const queryParams = new URLSearchParams({
      apiKey: API_KEY,
      networkId: NETWORK_ID,
      query
    });
    
    const response = await fetch(`${BASE_URL}/locations/suggestions?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch location suggestions');
    }
    
    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    return [];
  }
}
