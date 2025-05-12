
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnlineTherapist } from "@/services/onlineTherapyService";

interface ProviderMapProps {
  providers: OnlineTherapist[];
  mapCenter: [number, number];
}

const ProviderMap: React.FC<ProviderMapProps> = ({ providers, mapCenter }) => {
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
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            position={provider.coordinates as [number, number]}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-bold">{provider.name}</h4>
                <p className="text-sm text-gray-600">{provider.specialty}</p>
                <p className="text-sm text-gray-500">{provider.location}</p>
                <div className="mt-2 flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{provider.rating} ({provider.reviews} reviews)</span>
                </div>
                <Button
                  size="sm"
                  className="mt-2 w-full"
                  asChild
                >
                  <a href={`https://online-therapy.com/provider/${provider.id}`} target="_blank" rel="noopener noreferrer">View Profile</a>
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ProviderMap;
