
import React from "react";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import ProviderCard from "./ProviderCard";
import ProviderMap from "./ProviderMap";
import { OnlineTherapist } from "@/services/onlineTherapyService";

interface SearchResultsProps {
  providers: OnlineTherapist[];
  showMap: boolean;
  toggleMapView: () => void;
  mapCenter: [number, number];
  error: string;
}

const ProviderSearchResults: React.FC<SearchResultsProps> = ({
  providers,
  showMap,
  toggleMapView,
  mapCenter,
  error
}) => {
  if (providers.length === 0 && !error) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold">Online Therapy Providers</h3>
          {providers.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Found {providers.length} therapists who can help you with online sessions
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{providers.length} results found</span>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMapView}
            className="flex items-center gap-2"
          >
            <Map className="h-4 w-4" />
            {showMap ? "Show List" : "Show Map"}
          </Button>
        </div>
      </div>
      
      {providers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <h4 className="text-lg font-medium text-gray-700 mb-2">No providers found</h4>
            <p className="text-gray-500 mb-4">We couldn't find any providers matching your search criteria.</p>
            <p className="text-gray-500">Try adjusting your filters or search in a different location.</p>
          </div>
        </div>
      ) : showMap ? (
        <ProviderMap providers={providers} mapCenter={mapCenter} />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderSearchResults;
