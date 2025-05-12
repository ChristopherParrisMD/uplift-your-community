
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  specialty: string;
  setSpecialty: (value: string) => void;
  insurance: string;
  setInsurance: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  specialties: string[];
  insuranceOptions: string[];
  sortOptions: Array<{ value: string; label: string }>;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  specialty,
  setSpecialty,
  insurance,
  setInsurance,
  sortBy,
  setSortBy,
  specialties,
  insuranceOptions,
  sortOptions,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger>
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Specialty</SelectItem>
            {specialties.map((spec) => (
              <SelectItem key={spec} value={spec.toLowerCase()}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
        <Select value={insurance} onValueChange={setInsurance}>
          <SelectTrigger>
            <SelectValue placeholder="Select insurance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Insurance</SelectItem>
            {insuranceOptions.map((ins) => (
              <SelectItem key={ins} value={ins.toLowerCase()}>
                {ins}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
