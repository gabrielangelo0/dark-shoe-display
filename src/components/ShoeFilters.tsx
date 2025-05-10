
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface ShoeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ShoeFilters({ searchTerm, onSearchChange }: ShoeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Procurar calçados..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" className="gap-2 shrink-0">
        <Filter className="h-4 w-4" />
        Filtros
      </Button>
    </div>
  );
}
