
import { useEffect, useState } from "react";
import { Shoe } from "@/types/shoe";
import { ShoeList } from "@/components/ShoeList";
import { ShoeFilters } from "@/components/ShoeFilters";
import { AddShoeDialog } from "@/components/AddShoeDialog";
import axios from "axios";

// Exemplo de calçados para demonstração inicial
const initialShoes: Shoe[] = [
  {
    id: "1",
    name: "Air Max 90",
    brand: "Nike",
    price: 499.99,
    size: 42,
    color: "#000000",
    imageUrl: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000",
    inStock: true,
  },
  {
    id: "2",
    name: "Ultraboost 21",
    brand: "Adidas",
    price: 599.99,
    size: 40,
    color: "#FFFFFF",
    imageUrl: "https://images.unsplash.com/photo-1617689563472-c66428e83d44?q=80&w=1000",
    inStock: true,
  },
  {
    id: "3",
    name: "Old Skool",
    brand: "Vans",
    price: 349.99,
    size: 39,
    color: "#000000",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000",
    inStock: false,
  },
  {
    id: "4",
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 299.99,
    size: 41,
    color: "#FF0000",
    imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000",
    inStock: true,
  },
];

export default function Index() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShoes = shoes.filter((shoe) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      shoe.name.toLowerCase().includes(searchLower) ||
      shoe.brand.toLowerCase().includes(searchLower)
    );
  });

  const handleAddShoe = (newShoe: Shoe) => {
    setShoes([...shoes, newShoe]);
  };

  async function fetchShoes() {
    try {
      const shoesResponse = await axios.get("http://localhost:3000/shoes");

      setShoes(shoesResponse.data);
    } catch (error) {
      console.error("Erro ao buscar calçados:", error);
    }
  }

  useEffect(() => {
    fetchShoes();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Calçados</h1>
          <p className="text-muted-foreground mt-1">Gerencie seu inventário de calçados</p>
        </div>
        <AddShoeDialog onAddShoe={handleAddShoe} />
      </div>

      <ShoeFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <ShoeList shoes={filteredShoes} />
    </div>
  );
}
