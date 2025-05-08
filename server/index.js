import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database of therapists
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
  }
];

// API Endpoints
app.get('/api/therapists', async (req, res) => {
  const { location, specialty, insurance, sortBy } = req.query;
  console.log('Search parameters:', { location, specialty, insurance, sortBy });
  
  try {
    // Filter therapists based on search criteria
    let filteredTherapists = [...therapists];
    
    if (location) {
      const searchLocation = location.toLowerCase();
      filteredTherapists = filteredTherapists.filter(therapist => 
        therapist.location.toLowerCase().includes(searchLocation)
      );
    }
    
    if (specialty) {
      const searchSpecialty = specialty.toLowerCase();
      filteredTherapists = filteredTherapists.filter(therapist => 
        therapist.specialty.toLowerCase().includes(searchSpecialty)
      );
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
          default:
            return 0;
        }
      });
    }

    res.json(filteredTherapists);
  } catch (error) {
    console.error('Error in /api/therapists:', error);
    res.status(500).json({ error: 'Failed to fetch therapists' });
  }
});

// Get location suggestions
app.get('/api/locations', (req, res) => {
  const { query } = req.query;
  const locations = [
    "Detroit, MI",
    "Ann Arbor, MI",
    "Grand Rapids, MI",
    "Lansing, MI",
    "Flint, MI",
    "Warren, MI",
    "Sterling Heights, MI",
    "Dearborn, MI"
  ];

  if (query) {
    const filtered = locations.filter(loc => 
      loc.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filtered);
  } else {
    res.json(locations);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 