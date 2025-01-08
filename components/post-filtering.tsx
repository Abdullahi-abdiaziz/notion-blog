"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EyeOff } from "lucide-react";

interface PostFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  onHideFilters: () => void;
}

interface FilterValues {
  device: string;
  country: string;
  tag: string;
}

const devices = ["All Devices", "Mobile", "Desktop", "Tablet"];
const countries = ["All Countries", "US", "UK", "CA", "AU", "DE", "FR"];
const tags = ["All Tags", "Error", "Success", "Warning", "Info"];

export function PostFilters({
  onFilterChange,
  onHideFilters,
}: PostFiltersProps) {
  const [filters, setFilters] = React.useState<FilterValues>({
    device: "All Devices",
    country: "All Countries",
    tag: "All Tags",
  });

  const handleFilterChange = (value: string, type: keyof FilterValues) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Select
        value={filters.device}
        onValueChange={(value) => handleFilterChange(value, "device")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Device" />
        </SelectTrigger>
        <SelectContent>
          {devices.map((device) => (
            <SelectItem key={device} value={device}>
              {device}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.country}
        onValueChange={(value) => handleFilterChange(value, "country")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.tag}
        onValueChange={(value) => handleFilterChange(value, "tag")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tag" />
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        size="sm"
        className="ml-auto"
        onClick={onHideFilters}
      >
        <EyeOff className="h-4 w-4 mr-2" />
        Hide filters
      </Button>
    </div>
  );
}
