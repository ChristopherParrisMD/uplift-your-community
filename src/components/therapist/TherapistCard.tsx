
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface TherapistCardProps {
  therapist: {
    id: string;
    name: string;
    image: string;
    credentials?: string;
    specialty: string;
    location: string;
    rating: number;
    reviews: number;
    phone?: string;
    email?: string;
    languages?: string[];
    gender?: string;
    practiceAddress?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
}

const TherapistCard: React.FC<TherapistCardProps> = ({ therapist }) => (
  <Card key={therapist.id} className="card-hover overflow-hidden">
    <CardContent className="p-0">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3">
          <img 
            src={therapist.image} 
            alt={therapist.name} 
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div className="p-4 sm:p-6 sm:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg">{therapist.name}</h4>
              {therapist.credentials && (
                <span className="text-sm text-gray-600">{therapist.credentials}</span>
              )}
            </div>
            <div className="flex items-center bg-mindful-50 px-2 py-1 rounded-full text-xs text-mindful-800">
              <Star className="h-3 w-3 mr-1" />
              <span className="font-medium">{therapist.rating}</span>
              <span className="ml-1 text-gray-500">({therapist.reviews})</span>
            </div>
          </div>
          
          <p className="text-gray-600 mt-1">{therapist.specialty}</p>
          
          <div className="flex items-center mt-3 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{therapist.location}</span>
          </div>

          {therapist.practiceAddress && (
            <div className="mt-2 text-sm text-gray-500">
              <p>{therapist.practiceAddress.street}</p>
              <p>{therapist.practiceAddress.city}, {therapist.practiceAddress.state} {therapist.practiceAddress.zip}</p>
            </div>
          )}

          {therapist.phone && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-1" />
              <span>{therapist.phone}</span>
            </div>
          )}

          {therapist.email && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-1" />
              <span>{therapist.email}</span>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {therapist.languages?.map((lang, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {lang}
              </span>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex flex-col">
              {therapist.gender && (
                <span className="text-xs text-gray-500">Gender: {therapist.gender}</span>
              )}
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link to={`/therapist/${therapist.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TherapistCard;
