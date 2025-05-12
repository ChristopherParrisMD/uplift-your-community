
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchFilters from "@/components/therapist/SearchFilters";
import LocationSearch from "@/components/therapist/LocationSearch";
import SearchResults from "@/components/provider/ProviderSearchResults";
import { useOnlineProviderSearch } from "@/hooks/useOnlineProviderSearch";
import { specialties, insuranceOptions, sortOptions } from "@/constants/therapistSearch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OnlineProviderSearch = () => {
  const {
    searchLocation,
    specialty,
    insurance,
    sortBy,
    providers,
    loading,
    error,
    suggestions,
    showMap,
    mapCenter,
    setSpecialty,
    setInsurance,
    setSortBy,
    handleLocationChange,
    handleSearch,
    toggleMapView,
    setLocationAndSearch
  } = useOnlineProviderSearch();

  const [activeFilters, setActiveFilters] = useState<{
    specialty: string | null;
    insurance: string | null;
  }>({
    specialty: null,
    insurance: null
  });

  const hasActiveFilters = activeFilters.specialty || activeFilters.insurance;
  
  const handleApplyFilters = () => {
    setActiveFilters({
      specialty: specialty !== 'any' ? specialty : null,
      insurance: insurance !== 'any' ? insurance : null
    });
    handleSearch();
  };
  
  const clearFilter = (filterType: 'specialty' | 'insurance') => {
    if (filterType === 'specialty') {
      setSpecialty('any');
      setActiveFilters(prev => ({ ...prev, specialty: null }));
    } else {
      setInsurance('any');
      setActiveFilters(prev => ({ ...prev, insurance: null }));
    }
    handleSearch();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-6">Find an Online Therapy Provider</h2>
      
      <Tabs defaultValue="location">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="location">Search by Location</TabsTrigger>
          <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
        </TabsList>
        
        <TabsContent value="location" className="space-y-4">
          <LocationSearch
            searchLocation={searchLocation}
            handleLocationChange={handleLocationChange}
            handleSearch={handleSearch}
            loading={loading}
            suggestions={suggestions}
            setLocationAndSearch={setLocationAndSearch}
          />
          
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 items-center mt-4">
              <span className="text-sm text-gray-500">Active filters:</span>
              
              {activeFilters.specialty && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Specialty: {activeFilters.specialty}
                  <button 
                    onClick={() => clearFilter('specialty')} 
                    className="ml-1 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {activeFilters.insurance && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Insurance: {activeFilters.insurance}
                  <button 
                    onClick={() => clearFilter('insurance')} 
                    className="ml-1 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="filters">
          <SearchFilters 
            specialty={specialty}
            setSpecialty={setSpecialty}
            insurance={insurance}
            setInsurance={setInsurance}
            sortBy={sortBy}
            setSortBy={setSortBy}
            specialties={specialties}
            insuranceOptions={insuranceOptions}
            sortOptions={sortOptions}
          />

          <button 
            className="bg-mindful-600 hover:bg-mindful-700 text-white px-4 py-2 rounded-md flex items-center mt-6" 
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Apply Filters
              </>
            )}
          </button>
        </TabsContent>
      </Tabs>
      
      <SearchResults 
        providers={providers}
        showMap={showMap}
        toggleMapView={toggleMapView}
        mapCenter={mapCenter}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default OnlineProviderSearch;
