
import { toast } from "@/components/ui/use-toast";

// API credentials from environment variables or constants
const API_KEY = "96026dea5d04541d19ecc08a2ed28c4a78da950cbb47653ed5eea66a6afbdde5";
const NETWORK_ID = "onlinetherapy";
const BASE_URL = "https://api.online-therapy.com/v1";

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

// Sample data to use when API calls fail
const sampleProviders: OnlineTherapist[] = [
  {
    id: "p1",
    name: "Dr. Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    specialty: "Anxiety & Depression",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 128,
    coordinates: [34.0522, -118.2437],
    credentials: "PhD, Licensed Psychologist",
    languages: ["English", "Spanish"],
    gender: "F",
    availability: "Evenings & Weekends",
    acceptingNewClients: true,
    insurance: "Blue Cross, Aetna, Cigna",
    sessionTypes: ["Video", "Phone", "In-person"]
  },
  {
    id: "p2",
    name: "Dr. Michael Chen",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    specialty: "Trauma & PTSD",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 94,
    coordinates: [37.7749, -122.4194],
    credentials: "PsyD, Licensed Clinical Psychologist",
    languages: ["English", "Mandarin"],
    gender: "M",
    availability: "Weekdays",
    acceptingNewClients: true,
    insurance: "Kaiser, United Healthcare",
    sessionTypes: ["Video", "In-person"]
  },
  {
    id: "p3",
    name: "Emma Rodriguez, LMFT",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    specialty: "Family & Marriage Counseling",
    location: "San Diego, CA",
    rating: 4.7,
    reviews: 76,
    coordinates: [32.7157, -117.1611],
    credentials: "Licensed Marriage and Family Therapist",
    languages: ["English", "Spanish"],
    gender: "F",
    availability: "Flexible scheduling",
    acceptingNewClients: true,
    insurance: "Accepts most major insurances",
    sessionTypes: ["Video", "Phone", "In-person"]
  }
];

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
    
    // Attempt to make the API request with different endpoint formats
    let response;
    let apiUrl;
    
    try {
      // First attempt with original endpoint format
      apiUrl = `${BASE_URL}/providers/search?${queryParams.toString()}`;
      console.log('Calling API at:', apiUrl);
      response = await fetch(apiUrl, { mode: 'cors' });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.log('First API attempt failed, trying alternative endpoint format');
      
      // Second attempt with HasOffers-style endpoint
      apiUrl = `https://${NETWORK_ID}.api.hasoffers.com/Apiv3/json?Target=Affiliate_Offer&Method=findAll&api_key=${API_KEY}`;
      console.log('Trying alternative API at:', apiUrl);
      
      try {
        response = await fetch(apiUrl, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`Alternative API error: ${response.status}`);
        }
      } catch (innerError) {
        // Both API attempts failed, use sample data
        console.log('Both API attempts failed, using sample data');
        throw new Error('API connection failed');
      }
    }
    
    // Process the response if we got here
    const data = await response.json();
    console.log('API response:', data);
    
    // Handle different API response formats
    const providers = Array.isArray(data) ? data : (data.providers || data.response || []);
    
    // Extended data processing - ensure coordinates are tuples
    const enhancedProviders: OnlineTherapist[] = providers.map((provider: any) => {
      // Ensure coordinates are always a tuple of [number, number]
      const coordinates: [number, number] = Array.isArray(provider.coordinates) && provider.coordinates.length >= 2 
        ? [provider.coordinates[0], provider.coordinates[1]]
        : [0, 0]; // Default coordinates if none provided
      
      return {
        ...provider,
        coordinates,
        acceptingNewClients: provider.acceptingNewClients ?? true,
        availability: provider.availability || "Contact for availability",
        insurance: provider.insurance || "Contact for insurance details"
      };
    });
    
    return enhancedProviders;
  } catch (error: any) {
    console.error('Error fetching providers:', error);
    
    // Show user-friendly error toast
    toast({
      title: "Using sample data",
      description: "We're having trouble connecting to the provider database. Showing sample results instead.",
      variant: "default"
    });
    
    // Return sample data as fallback
    // Filter sample data based on location if provided
    if (params.location) {
      const location = params.location.toLowerCase();
      return sampleProviders.filter(provider => 
        provider.location.toLowerCase().includes(location)
      );
    }
    
    return sampleProviders;
  }
}

export async function getLocationSuggestions(query: string): Promise<string[]> {
  try {
    if (!query || query.length < 2) return [];
    
    console.log('Fetching location suggestions for:', query);
    
    // Try real API request first
    try {
      const queryParams = new URLSearchParams({
        apiKey: API_KEY,
        networkId: NETWORK_ID,
        query
      });
      
      const response = await fetch(`${BASE_URL}/locations/suggestions?${queryParams.toString()}`, { mode: 'cors' });
      
      if (!response.ok) {
        throw new Error('Failed to fetch location suggestions');
      }
      
      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.log('API for location suggestions failed, using sample suggestions');
      
      // Sample location suggestions as fallback
      const sampleLocations = [
        "Los Angeles, CA",
        "San Francisco, CA",
        "San Diego, CA",
        "Sacramento, CA",
        "Oakland, CA",
        "San Jose, CA",
        "Long Beach, CA",
        "Fresno, CA"
      ];
      
      // Filter based on the query
      const filteredLocations = sampleLocations.filter(
        location => location.toLowerCase().includes(query.toLowerCase())
      );
      
      return filteredLocations;
    }
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    return [];
  }
}

export async function createAccount(params: AccountCreationParams): Promise<void> {
  try {
    console.log('Creating account for:', params.email);
    
    // Real API implementation
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
    
    // Real API implementation
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

