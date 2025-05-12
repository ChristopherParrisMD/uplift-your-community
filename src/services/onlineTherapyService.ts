
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
    
    // Extended data processing - enhance provider data
    const enhancedProviders = (data.providers || []).map((provider: OnlineTherapist) => {
      // Add any additional processing here, like default availability data
      return {
        ...provider,
        acceptingNewClients: Math.random() > 0.3, // Simulated data
        availability: ["Weekdays", "Evenings", "Weekends"][Math.floor(Math.random() * 3)], // Simulated data
        insurance: provider.insurance || "Multiple plans accepted"
      };
    });
    
    return enhancedProviders;
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

export async function createAccount(params: AccountCreationParams): Promise<void> {
  try {
    console.log('Creating account for:', params.email);
    
    // This is a simulated API call - in a real app this would send data to the API
    // For demonstration purposes, we'll simulate a successful account creation
    
    // Uncomment and modify this for actual API integration
    /* 
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
    */
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Track the signup event for analytics
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
    
    // This is a simulated API call
    // For demonstration purposes, we'll simulate a successful provider contact
    
    // Uncomment and modify this for actual API integration
    /*
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
    */
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Track the provider contact event for analytics
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
