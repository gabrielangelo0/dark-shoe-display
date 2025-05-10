
import { Shoe } from "@/types/shoe";
import { ShoeCard } from "./ShoeCard";

interface ShoeListProps {
  shoes: Shoe[];
}

export function ShoeList({ shoes }: ShoeListProps) {
  if (shoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Nenhum calçado encontrado</h2>
        <p className="text-muted-foreground">Adicione novos calçados para vê-los aqui.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {shoes.map((shoe) => (
        <ShoeCard key={shoe.id} shoe={shoe} />
      ))}
    </div>
  );
}
