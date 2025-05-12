
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { OnlineTherapist } from "@/services/onlineTherapyService";

interface ProviderCardProps {
  provider: OnlineTherapist;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => (
  <Card key={provider.id} className="card-hover overflow-hidden">
    <CardContent className="p-0">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3">
          <img 
            src={provider.image} 
            alt={provider.name} 
            className="w-full h-full object-cover aspect-square"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/150?text=Provider";
            }}
          />
        </div>
        <div className="p-4 sm:p-6 sm:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg">{provider.name}</h4>
              {provider.credentials && (
                <span className="text-sm text-gray-600">{provider.credentials}</span>
              )}
            </div>
            <div className="flex items-center bg-mindful-50 px-2 py-1 rounded-full text-xs text-mindful-800">
              <Star className="h-3 w-3 mr-1" />
              <span className="font-medium">{provider.rating}</span>
              <span className="ml-1 text-gray-500">({provider.reviews})</span>
            </div>
          </div>
          
          <p className="text-gray-600 mt-1">{provider.specialty}</p>
          
          <div className="flex items-center mt-3 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{provider.location}</span>
          </div>

          {provider.practiceAddress && (
            <div className="mt-2 text-sm text-gray-500">
              <p>{provider.practiceAddress.street}</p>
              <p>{provider.practiceAddress.city}, {provider.practiceAddress.state} {provider.practiceAddress.zip}</p>
            </div>
          )}

          {provider.phone && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-1" />
              <span>{provider.phone}</span>
            </div>
          )}

          {provider.email && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-1" />
              <span>{provider.email}</span>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {provider.languages?.map((lang, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {lang}
              </span>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex flex-col">
              {provider.gender && (
                <span className="text-xs text-gray-500">Gender: {provider.gender}</span>
              )}
            </div>
            <Button size="sm" variant="outline" asChild>
              <a href={`https://online-therapy.com/provider/${provider.id}`} target="_blank" rel="noopener noreferrer">View Profile</a>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ProviderCard;
