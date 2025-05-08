
import React from "react";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import TherapistCard from "./TherapistCard";
import TherapistMap from "./TherapistMap";

interface Therapist {
  id: string;
  name: string;
  image: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  coordinates: [number, number];
  [key: string]: any;
}

interface SearchResultsProps {
  therapists: Therapist[];
  showMap: boolean;
  toggleMapView: () => void;
  mapCenter: [number, number];
  error: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  therapists,
  showMap,
  toggleMapView,
  mapCenter,
  error
}) => {
  if (therapists.length === 0 && !error) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Therapists near you</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{therapists.length} results found</span>
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
      
      {therapists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No therapists found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search in a different location.</p>
        </div>
      ) : showMap ? (
        <TherapistMap therapists={therapists} mapCenter={mapCenter} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
