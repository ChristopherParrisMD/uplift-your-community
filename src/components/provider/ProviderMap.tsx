
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star, MapPin, Phone, ExternalLink } from "lucide-react";
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
            <Popup className="provider-popup">
              <div className="p-2 min-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={provider.image} 
                    alt={provider.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150?text=Provider";
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-sm">{provider.name}</h4>
                    <p className="text-xs text-gray-600">{provider.specialty}</p>
                  </div>
                </div>
                
                <div className="mb-2 text-xs">
                  <div className="flex items-center mb-1">
                    <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                    <span className="text-gray-500">{provider.location}</span>
                  </div>
                  
                  {provider.phone && (
                    <div className="flex items-center mb-1">
                      <Phone className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-500">{provider.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span>{provider.rating} ({provider.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs h-8"
                    onClick={() => window.open(`https://online-therapy.com/provider/${provider.id}`, '_blank')}
                  >
                    View Profile
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    className="w-full text-xs h-8 bg-mindful-600 hover:bg-mindful-700"
                    onClick={() => window.open(`https://online-therapy.com/connect/${provider.id}`, '_blank')}
                  >
                    Connect Now
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ProviderMap;
