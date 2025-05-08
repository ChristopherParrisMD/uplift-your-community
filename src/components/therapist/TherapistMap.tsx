
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TherapistMapProps {
  therapists: Array<{
    id: string;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    reviews: number;
    coordinates: [number, number];
  }>;
  mapCenter: [number, number];
}

const TherapistMap: React.FC<TherapistMapProps> = ({ therapists, mapCenter }) => {
  return (
    <div className="h-[600px] rounded-lg overflow-hidden border">
      <MapContainer
        center={mapCenter}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {therapists.map((therapist) => (
          <Marker
            key={therapist.id}
            position={therapist.coordinates as [number, number]}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-bold">{therapist.name}</h4>
                <p className="text-sm text-gray-600">{therapist.specialty}</p>
                <p className="text-sm text-gray-500">{therapist.location}</p>
                <div className="mt-2 flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{therapist.rating} ({therapist.reviews} reviews)</span>
                </div>
                <Button
                  size="sm"
                  className="mt-2 w-full"
                  asChild
                >
                  <Link to={`/therapist/${therapist.id}`}>View Profile</Link>
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TherapistMap;
