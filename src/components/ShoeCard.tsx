
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shoe } from "@/types/shoe";

interface ShoeCardProps {
  shoe: Shoe;
}

export function ShoeCard({ shoe }: ShoeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:shadow-purple-500/20">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden bg-secondary/50">
          <img
            src={shoe.imageUrl || "/placeholder.svg"}
            alt={shoe.name}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg leading-none tracking-tight">{shoe.name}</h3>
            <p className="text-sm text-muted-foreground">{shoe.brand}</p>
          </div>
          <Badge variant={shoe.inStock ? "default" : "destructive"} className="ml-2">
            {shoe.inStock ? "Em Estoque" : "Esgotado"}
          </Badge>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="rounded-full h-4 w-4" style={{ backgroundColor: shoe.color }} />
          <span className="text-sm text-muted-foreground">Tamanho: {shoe.size}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-semibold text-lg">R$ {shoe.price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
}
