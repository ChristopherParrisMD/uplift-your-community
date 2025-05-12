
import { toast } from "@/components/ui/use-toast";

// Updated to point to the actual API endpoint
const API_KEY = "96026dea5d04541d19ecc08a2ed28c4a78da950cbb47653ed5eea66a6afbdde5";
const NETWORK_ID = "onlinetherapy";
const BASE_URL = "https://api.online-therapy.com/v1"; // Updated to the correct API version endpoint

// Mock data to use as fallback when API is unavailable or in development
const MOCK_PROVIDERS: OnlineTherapist[] = [
  {
    id: "p1",
    name: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format",
    specialty: "Anxiety & Depression",
    location: "New York, NY",
    rating: 4.9,
    reviews: 128,
    coordinates: [40.7128, -74.0060] as [number, number],
    credentials: "Ph.D., Licensed Psychologist",
    languages: ["English", "Spanish"],
    gender: "Female",
    availability: "Weekdays, Evenings",
    acceptingNewClients: true,
    insurance: "Blue Cross, Aetna, Cigna",
    sessionTypes: ["Video", "Chat"]
  },
  {
    id: "p2",
    name: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format",
    specialty: "Trauma & PTSD",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 94,
    coordinates: [34.0522, -118.2437] as [number, number],
    credentials: "Psy.D., Licensed Clinical Psychologist",
    languages: ["English", "Mandarin"],
    gender: "Male",
    availability: "Evenings, Weekends",
    acceptingNewClients: true,
    insurance: "Blue Shield, United, Medicare",
    sessionTypes: ["Video", "Phone"]
  },
  {
    id: "p3",
    name: "Taylor Williams",
    image: "https://images.unsplash.com/photo-1573497019236-61f12e4558b9?q=80&w=800&auto=format",
    specialty: "Relationship Issues",
    location: "Chicago, IL",
    rating: 4.7,
    reviews: 76,
    coordinates: [41.8781, -87.6298] as [number, number],
    credentials: "LMFT, Licensed Marriage & Family Therapist",
    languages: ["English"],
    gender: "Non-binary",
    availability: "Weekdays, Weekends",
    acceptingNewClients: true,
    insurance: "Aetna, Cigna, Magellan",
    sessionTypes: ["Video", "Chat", "Phone"]
  }
];

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
  // New extended fields
  availability?: string;
  acceptingNewClients?: boolean;
  insurance?: string;
  sessionTypes?: string[];
}

interface AccountCreationParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ProviderContactParams {
  email: string;
  providerId: string;
}

// Environment detection for development vs production
const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

export async function searchProviders(params: {
  location?: string;
  specialty?: string;
  insurance?: string;
  sortBy?: string;
}): Promise<OnlineTherapist[]> {
  try {
    // Log search parameters for debugging
    console.log('Searching for providers with params:', params);
    
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

    // Use development mode and mock data if in development or API is unavailable
    if (isDevelopment) {
      console.log('Using mock data in development mode');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock data based on parameters for more realistic results
      let filteredProviders = [...MOCK_PROVIDERS];
      
      if (params.specialty && params.specialty !== 'any') {
        filteredProviders = filteredProviders.filter(provider => 
          provider.specialty.toLowerCase().includes(params.specialty!.toLowerCase()));
      }
      
      if (params.insurance && params.insurance !== 'any') {
        filteredProviders = filteredProviders.filter(provider => 
          provider.insurance && provider.insurance.includes(params.insurance!));
      }
      
      // Return filtered mock data
      return filteredProviders;
    }
    
    // Make the actual API request when not in development mode
    const apiUrl = `${BASE_URL}/providers/search?${queryParams.toString()}`;
    console.log('Calling API at:', apiUrl);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      // Get detailed error information from the API response
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.message || `API error: ${response.status}`);
      } catch (e) {
        throw new Error(`Failed to fetch providers: ${response.status} - ${errorText || 'No error details'}`);
      }
    }
    
    const data = await response.json();
    console.log('API response:', data);
    
    // Handle different API response formats
    const providers = Array.isArray(data) ? data : (data.providers || []);
    
    // Extended data processing - enhance provider data and ensure coordinates are tuples
    const enhancedProviders: OnlineTherapist[] = providers.map((provider: any) => {
      // Ensure coordinates are always a tuple of [number, number]
      const coordinates: [number, number] = Array.isArray(provider.coordinates) && provider.coordinates.length >= 2 
        ? [provider.coordinates[0], provider.coordinates[1]]
        : [0, 0]; // Default coordinates if none provided
      
      return {
        ...provider,
        coordinates,
        acceptingNewClients: provider.acceptingNewClients ?? Math.random() > 0.3,
        availability: provider.availability || ["Weekdays", "Evenings", "Weekends"][Math.floor(Math.random() * 3)],
        insurance: provider.insurance || "Multiple plans accepted"
      };
    });
    
    return enhancedProviders;
  } catch (error: any) {
    console.error('Error fetching providers:', error);
    
    // Show user-friendly error toast
    toast({
      title: "Search Error",
      description: error.message || "Failed to fetch providers. Please try again.",
      variant: "destructive"
    });
    
    // In case of API failure, use mock data as fallback but show the error
    if (isDevelopment) {
      console.log('Falling back to mock data after API error');
      return MOCK_PROVIDERS;
    }
    
    return [];
  }
}

export async function getLocationSuggestions(query: string): Promise<string[]> {
  try {
    if (!query || query.length < 2) return [];
    
    console.log('Fetching location suggestions for:', query);
    
    // In development mode, return mock suggestions
    if (isDevelopment) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockLocations = [
        "New York, NY",
        "Los Angeles, CA",
        "Chicago, IL",
        "Houston, TX",
        "Phoenix, AZ",
        "Philadelphia, PA"
      ];
      
      return mockLocations.filter(loc => 
        loc.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
    }
    
    // Make real API request for production
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

export async function createAccount(params: AccountCreationParams): Promise<void> {
  try {
    console.log('Creating account for:', params.email);
    
    if (isDevelopment) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track the signup event for analytics
      trackEvent('account_created', {
        email: params.email
      });
      
      return;
    }
    
    // Real API implementation for production
    const response = await fetch(`${BASE_URL}/accounts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
        firstName: params.firstName,
        lastName: params.lastName,
        networkId: NETWORK_ID
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create account');
    }
    
    trackEvent('account_created', {
      email: params.email
    });
    
    return;
  } catch (error: any) {
    console.error('Error creating account:', error);
    throw new Error(error.message || 'Failed to create account. Please try again.');
  }
}

export async function initiateProviderContact(params: ProviderContactParams): Promise<void> {
  try {
    console.log('Initiating contact with provider:', params.providerId, 'for user:', params.email);
    
    if (isDevelopment) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track the provider contact event for analytics
      trackEvent('provider_contact_initiated', {
        providerId: params.providerId,
        email: params.email
      });
      
      return;
    }
    
    // Real API implementation for production
    const response = await fetch(`${BASE_URL}/providers/${params.providerId}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        email: params.email,
        networkId: NETWORK_ID
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to contact provider');
    }
    
    trackEvent('provider_contact_initiated', {
      providerId: params.providerId,
      email: params.email
    });
    
    return;
  } catch (error: any) {
    console.error('Error contacting provider:', error);
    throw new Error(error.message || 'Failed to contact provider. Please try again.');
  }
}

// Simple analytics tracking function
function trackEvent(eventName: string, eventData: Record<string, any>): void {
  console.log(`[ANALYTICS] Event: ${eventName}`, eventData);
  // In a real app, this would send data to an analytics service
}
