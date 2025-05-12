
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Mail, Users, Calendar, Shield } from "lucide-react";
import { OnlineTherapist } from "@/services/onlineTherapyService";
import ConnectProviderModal from "./ConnectProviderModal";

interface ProviderCardProps {
  provider: OnlineTherapist;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  return (
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
            {provider.gender && (
              <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500">
                {provider.gender === "M" ? "Male" : "Female"} Therapist
              </div>
            )}
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
                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                <span className="font-medium">{provider.rating}</span>
                <span className="ml-1 text-gray-500">({provider.reviews})</span>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-gray-700 font-medium">{provider.specialty}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {provider.languages?.map((lang, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                <span>{provider.location}</span>
              </div>

              {provider.practiceAddress && (
                <div className="mt-1 text-xs text-gray-500 pl-5">
                  <p>{provider.practiceAddress.street}</p>
                  <p>{provider.practiceAddress.city}, {provider.practiceAddress.state} {provider.practiceAddress.zip}</p>
                </div>
              )}
            </div>

            {/* Additional provider details */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {provider.acceptingNewClients && (
                <div className="flex items-center text-xs text-green-600">
                  <Users className="h-3 w-3 mr-1" />
                  <span>Accepting New Clients</span>
                </div>
              )}
              
              {provider.availability && (
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{provider.availability}</span>
                </div>
              )}
              
              {provider.insurance && (
                <div className="flex items-center text-xs text-gray-500">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Insurance: {provider.insurance}</span>
                </div>
              )}
            </div>

            {provider.phone && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-1 text-gray-400" />
                <span>{provider.phone}</span>
              </div>
            )}

            {provider.email && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-1 text-gray-400" />
                <span>{provider.email}</span>
              </div>
            )}
            
            <div className="mt-4 flex justify-between items-center">
              <Button 
                size="sm" 
                variant="outline" 
                asChild
                className="w-28"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`https://online-therapy.com/provider/${provider.id}`, '_blank');
                }}
              >
                <a href={`https://online-therapy.com/provider/${provider.id}`} target="_blank" rel="noopener noreferrer">View Profile</a>
              </Button>
              
              <Button 
                size="sm"
                className="bg-mindful-600 hover:bg-mindful-700 text-white w-36"
                onClick={() => setConnectModalOpen(true)}
              >
                Connect Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      <ConnectProviderModal 
        isOpen={connectModalOpen} 
        onClose={() => setConnectModalOpen(false)} 
        provider={provider}
      />
    </Card>
  );
};

export default ProviderCard;
