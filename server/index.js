
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Expanded mock database of therapists with more locations
const therapists = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    credentials: "PhD, LMFT",
    specialty: "Anxiety & Depression",
    location: "Detroit, MI",
    distance: "2.5 miles",
    availability: "Next week",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Blue Cross", "Aetna", "Cigna"],
    approaches: ["Cognitive Behavioral Therapy", "Mindfulness", "Solution-Focused"],
    acceptingNew: true,
    price: 150,
    languages: ["English", "Spanish"],
    nextAvailable: "Next week",
    coordinates: [42.3314, -83.0458],
    phone: "(313) 555-0123",
    email: "dr.johnson@example.com",
    gender: "Female",
    practiceAddress: {
      street: "123 Main St",
      city: "Detroit",
      state: "MI",
      zip: "48201"
    }
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    credentials: "PsyD, LPC",
    specialty: "Trauma & PTSD",
    location: "Detroit, MI",
    distance: "3.1 miles",
    availability: "This week",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Blue Shield", "Medicare", "United"],
    approaches: ["EMDR", "Trauma-Focused CBT", "Psychodynamic"],
    acceptingNew: true,
    price: 175,
    languages: ["English", "Mandarin"],
    nextAvailable: "This week",
    coordinates: [42.3314, -83.0458],
    phone: "(313) 555-0124",
    email: "dr.chen@example.com",
    gender: "Male",
    practiceAddress: {
      street: "456 Oak Ave",
      city: "Detroit",
      state: "MI",
      zip: "48202"
    }
  },
  // Ann Arbor therapists
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    credentials: "PhD, LP",
    specialty: "Relationship Issues",
    location: "Ann Arbor, MI",
    distance: "1.2 miles",
    availability: "Next week",
    rating: 4.7,
    reviews: 103,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Blue Cross", "Aetna", "Magellan"],
    approaches: ["Emotionally Focused Therapy", "Gottman Method", "Attachment-Based"],
    acceptingNew: true,
    price: 165,
    languages: ["English", "Spanish"],
    nextAvailable: "Next week",
    coordinates: [42.2808, -83.7430],
    phone: "(734) 555-0125",
    email: "dr.rodriguez@example.com",
    gender: "Female",
    practiceAddress: {
      street: "789 University Dr",
      city: "Ann Arbor",
      state: "MI",
      zip: "48104"
    }
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    credentials: "PsyD, LPC",
    specialty: "Anxiety & Depression",
    location: "Ann Arbor, MI",
    distance: "2.3 miles",
    availability: "This week",
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Cigna", "United", "Anthem"],
    approaches: ["Cognitive Behavioral Therapy", "Acceptance and Commitment Therapy", "Mindfulness"],
    acceptingNew: true,
    price: 155,
    languages: ["English"],
    nextAvailable: "This week",
    coordinates: [42.2808, -83.7430],
    phone: "(734) 555-0126",
    email: "dr.wilson@example.com",
    gender: "Male",
    practiceAddress: {
      street: "321 Liberty St",
      city: "Ann Arbor",
      state: "MI",
      zip: "48104"
    }
  },
  // Grand Rapids therapists
  {
    id: "5",
    name: "Dr. Amanda Taylor",
    credentials: "PhD, LMFT",
    specialty: "Family Therapy",
    location: "Grand Rapids, MI",
    distance: "1.5 miles",
    availability: "Next week",
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Blue Cross", "Blue Shield", "Aetna"],
    approaches: ["Systemic Family Therapy", "Narrative Therapy", "Solution-Focused"],
    acceptingNew: true,
    price: 140,
    languages: ["English"],
    nextAvailable: "Next week",
    coordinates: [42.9634, -85.6681],
    phone: "(616) 555-0127",
    email: "dr.taylor@example.com",
    gender: "Female",
    practiceAddress: {
      street: "555 Monroe Ave",
      city: "Grand Rapids",
      state: "MI",
      zip: "49503"
    }
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    credentials: "PsyD, LP",
    specialty: "Addiction & Recovery",
    location: "Grand Rapids, MI",
    distance: "3.2 miles",
    availability: "This week",
    rating: 4.7,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Medicare", "Cigna", "Kaiser"],
    approaches: ["Motivational Interviewing", "12-Step Facilitation", "Relapse Prevention"],
    acceptingNew: true,
    price: 160,
    languages: ["English", "Korean"],
    nextAvailable: "This week",
    coordinates: [42.9634, -85.6681],
    phone: "(616) 555-0128",
    email: "dr.kim@example.com",
    gender: "Male",
    practiceAddress: {
      street: "777 Wealthy St",
      city: "Grand Rapids",
      state: "MI",
      zip: "49506"
    }
  },
  // Lansing therapists
  {
    id: "7",
    name: "Dr. Lisa Martinez",
    credentials: "PhD, LPC",
    specialty: "LGBTQ+ Support",
    location: "Lansing, MI",
    distance: "0.8 miles",
    availability: "Next week",
    rating: 4.8,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Blue Cross", "Aetna", "United"],
    approaches: ["Affirmative Therapy", "Cognitive Behavioral Therapy", "Interpersonal Process"],
    acceptingNew: true,
    price: 145,
    languages: ["English", "Spanish"],
    nextAvailable: "Next week",
    coordinates: [42.7325, -84.5555],
    phone: "(517) 555-0129",
    email: "dr.martinez@example.com",
    gender: "Female",
    practiceAddress: {
      street: "123 Michigan Ave",
      city: "Lansing",
      state: "MI",
      zip: "48912"
    }
  },
  {
    id: "8",
    name: "Dr. Thomas Washington",
    credentials: "PsyD, LMSW",
    specialty: "Grief & Loss",
    location: "Lansing, MI",
    distance: "2.1 miles",
    availability: "This week",
    rating: 4.6,
    reviews: 71,
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Medicare", "Blue Shield", "Magellan"],
    approaches: ["Meaning-Centered Therapy", "Complicated Grief Therapy", "Supportive Counseling"],
    acceptingNew: true,
    price: 135,
    languages: ["English"],
    nextAvailable: "This week",
    coordinates: [42.7325, -84.5555],
    phone: "(517) 555-0130",
    email: "dr.washington@example.com",
    gender: "Male",
    practiceAddress: {
      street: "456 Capitol Ave",
      city: "Lansing",
      state: "MI",
      zip: "48933"
    }
  }
];

// Expanded list of locations
const locations = [
  "Detroit, MI",
  "Ann Arbor, MI",
  "Grand Rapids, MI",
  "Lansing, MI",
  "Flint, MI",
  "Warren, MI",
  "Sterling Heights, MI",
  "Dearborn, MI",
  "Livonia, MI",
  "Troy, MI",
  "Farmington Hills, MI",
  "Kalamazoo, MI",
  "Wyoming, MI",
  "Rochester Hills, MI",
  "Southfield, MI",
  "Taylor, MI",
  "St. Clair Shores, MI",
  "Pontiac, MI",
  "Royal Oak, MI",
  "Novi, MI",
  "Battle Creek, MI",
  "Saginaw, MI",
  "Muskegon, MI",
  "Midland, MI",
  "East Lansing, MI"
];

// Enhanced therapist search with better matching
app.get('/api/therapists', async (req, res) => {
  const { location, specialty, insurance, sortBy } = req.query;
  console.log('Search parameters:', { location, specialty, insurance, sortBy });
  
  try {
    // Filter therapists based on search criteria with improved matching
    let filteredTherapists = [...therapists];
    
    if (location) {
      const searchLocation = location.toLowerCase();
      // Enhanced location search, more flexible matching
      filteredTherapists = filteredTherapists.filter(therapist => {
        const therapistLocation = therapist.location.toLowerCase();
        const therapistCity = therapist.practiceAddress.city.toLowerCase();
        const therapistState = therapist.practiceAddress.state.toLowerCase();
        const therapistZip = therapist.practiceAddress.zip;
        
        return therapistLocation.includes(searchLocation) || 
               therapistCity.includes(searchLocation) || 
               therapistState.includes(searchLocation) || 
               therapistZip.includes(searchLocation);
      });
    }
    
    if (specialty) {
      const searchSpecialty = specialty.toLowerCase();
      // Enhanced specialty search
      filteredTherapists = filteredTherapists.filter(therapist => {
        const therapistSpecialty = therapist.specialty.toLowerCase();
        const therapistApproaches = therapist.approaches.map(a => a.toLowerCase());
        
        return therapistSpecialty.includes(searchSpecialty) || 
               therapistApproaches.some(approach => approach.includes(searchSpecialty));
      });
    }
    
    if (insurance) {
      const searchInsurance = insurance.toLowerCase();
      filteredTherapists = filteredTherapists.filter(therapist => 
        therapist.insurance.some(ins => ins.toLowerCase().includes(searchInsurance))
      );
    }

    // Sort results if requested
    if (sortBy) {
      filteredTherapists.sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "price_low":
            return a.price - b.price;
          case "price_high":
            return b.price - a.price;
          case "availability":
            // Sort by next available appointment
            return a.nextAvailable.includes("This") ? -1 : 1;
          default:
            return 0;
        }
      });
    }

    console.log(`Found ${filteredTherapists.length} therapists matching criteria`);
    res.json(filteredTherapists);
  } catch (error) {
    console.error('Error in /api/therapists:', error);
    res.status(500).json({ error: 'Failed to fetch therapists' });
  }
});

// Enhanced location suggestions with fuzzy matching
app.get('/api/locations', (req, res) => {
  const { query } = req.query;
  
  if (query) {
    // Enhanced location matching
    const searchQuery = query.toLowerCase();
    const filtered = locations.filter(loc => 
      loc.toLowerCase().includes(searchQuery)
    );
    
    // Add zipcode handling
    if (/^\d+$/.test(query)) {
      // For numeric queries, check the zip codes in our therapist data
      const zipMatches = therapists
        .filter(t => t.practiceAddress.zip.startsWith(query))
        .map(t => t.location)
        // Remove duplicates
        .filter((loc, index, self) => self.indexOf(loc) === index);
      
      // Add zip matches to filtered locations
      filtered.push(...zipMatches.filter(loc => !filtered.includes(loc)));
    }
    
    console.log(`Location search for "${query}" returned ${filtered.length} results`);
    res.json(filtered);
  } else {
    console.log('Returning all locations');
    res.json(locations);
  }
});

// Add endpoint to get therapist by ID
app.get('/api/therapists/:id', (req, res) => {
  const { id } = req.params;
  const therapist = therapists.find(t => t.id === id);
  
  if (therapist) {
    console.log(`Found therapist with ID: ${id}`);
    res.json(therapist);
  } else {
    console.log(`Therapist with ID: ${id} not found`);
    res.status(404).json({ error: 'Therapist not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Available endpoints:`);
  console.log(`- GET /api/therapists - Search therapists`);
  console.log(`- GET /api/locations - Get location suggestions`);
  console.log(`- GET /api/therapists/:id - Get therapist by ID`);
});
