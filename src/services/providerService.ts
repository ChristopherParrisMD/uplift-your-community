
import { toast } from "@/components/ui/use-toast";

// API Configuration
const API_KEY = "96026dea5d04541d19ecc08a2ed28c4a78da950cbb47653ed5eea66a6afbdde5";
const NETWORK_ID = "onlinetherapy";
const BASE_URL = "https://api.networktherapy.com/v2";

// Provider Types
export interface Provider {
  id: string;
  name: string;
  credentials?: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  phone?: string;
  email?: string;
  gender?: string;
  languages?: string[];
  coordinates: [number, number];
  practiceAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface SearchParams {
  location?: string;
  specialty?: string;
  insurance?: string;
  sortBy?: string;
  gender?: string;
  language?: string;
  page?: number;
  limit?: number;
}

// API Methods
export const searchProviders = async (params: SearchParams): Promise<Provider[]> => {
  try {
    const queryParams = new URLSearchParams({
      api_key: API_KEY,
      network: NETWORK_ID,
      ...Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v !== ''))
    });

    const response = await fetch(`${BASE_URL}/providers/search?${queryParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch providers');
    }
    
    const data = await response.json();
    
    // Map the API response to our Provider interface
    return data.providers.map((provider: any) => ({
      id: provider.id,
      name: provider.name,
      credentials: provider.credentials,
      specialty: provider.specialties?.[0] || "General Mental Health",
      location: `${provider.address?.city || ''}, ${provider.address?.state || ''}`,
      rating: provider.rating || 4.5,
      reviews: provider.review_count || 0,
      image: provider.profile_image || "https://via.placeholder.com/150",
      phone: provider.phone,
      email: provider.email,
      gender: provider.gender,
      languages: provider.languages || ["English"],
      coordinates: [provider.geo?.lat || 0, provider.geo?.lng || 0],
      practiceAddress: provider.address ? {
        street: provider.address.street,
        city: provider.address.city,
        state: provider.address.state,
        zip: provider.address.zip
      } : undefined
    }));
  } catch (error: any) {
    console.error("Provider search error:", error);
    toast({
      title: "Search Error",
      description: error.message || "Failed to search for providers",
      variant: "destructive"
    });
    return [];
  }
};

export const getLocationSuggestions = async (query: string): Promise<string[]> => {
  try {
    if (!query || query.length < 2) return [];
    
    const response = await fetch(`${BASE_URL}/locations/suggestions?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch location suggestions');
    }
    
    const data = await response.json();
    return data.suggestions.map((suggestion: any) => suggestion.description || suggestion.name);
  } catch (error) {
    console.error("Location suggestions error:", error);
    return [];
  }
};

export const getProviderDetails = async (providerId: string): Promise<Provider | null> => {
  try {
    const response = await fetch(`${BASE_URL}/providers/${providerId}?api_key=${API_KEY}&network=${NETWORK_ID}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch provider details');
    }
    
    const data = await response.json();
    
    // Map the API response to our Provider interface
    return {
      id: data.id,
      name: data.name,
      credentials: data.credentials,
      specialty: data.specialties?.[0] || "General Mental Health",
      location: `${data.address?.city || ''}, ${data.address?.state || ''}`,
      rating: data.rating || 4.5,
      reviews: data.review_count || 0,
      image: data.profile_image || "https://via.placeholder.com/150",
      phone: data.phone,
      email: data.email,
      gender: data.gender,
      languages: data.languages || ["English"],
      coordinates: [data.geo?.lat || 0, data.geo?.lng || 0],
      practiceAddress: data.address ? {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        zip: data.address.zip
      } : undefined
    };
  } catch (error) {
    console.error("Provider details error:", error);
    return null;
  }
};
