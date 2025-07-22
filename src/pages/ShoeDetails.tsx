import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shoe } from "@/types/shoe";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function ShoeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchShoe = async () => {
      if (!id) return;
      
      try {
        const response = await axios.get(`http://localhost:3000/shoes/${id}`);
        setShoe(response.data);
      } catch (error) {
        console.error("Erro ao buscar calçado:", error);
        toast({
          title: "Erro",
          description: "Calçado não encontrado.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchShoe();
  }, [id, navigate, toast]);

  const handleBuy = () => {
    if (!shoe) return;
    
    // Aqui será implementada a lógica de compra
    toast({
      title: "Compra realizada!",
      description: `${quantity}x ${shoe.name} adicionado ao carrinho.`,
    });
  };

  const handleAddToWishlist = () => {
    if (!shoe) return;
    
    toast({
      title: "Adicionado à lista de desejos!",
      description: `${shoe.name} foi salvo na sua lista.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded mb-4 w-32"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-secondary rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-secondary rounded w-3/4"></div>
              <div className="h-6 bg-secondary rounded w-1/2"></div>
              <div className="h-20 bg-secondary rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Calçado não encontrado</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        onClick={() => navigate("/")} 
        variant="ghost" 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar à lista
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagem do produto */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-square w-full overflow-hidden bg-secondary/50">
                <img
                  src={shoe.imageUrl || "/placeholder.svg"}
                  alt={shoe.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Detalhes do produto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{shoe.name}</h1>
                <p className="text-xl text-muted-foreground">{shoe.brand}</p>
              </div>
              <Badge variant={shoe.inStock ? "default" : "destructive"}>
                {shoe.inStock ? "Em Estoque" : "Esgotado"}
              </Badge>
            </div>
            <p className="text-3xl font-bold text-primary">R$ {shoe.price.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Cor:</span>
                <div 
                  className="rounded-full h-6 w-6 border-2 border-border" 
                  style={{ backgroundColor: shoe.color }} 
                />
                <span className="text-sm text-muted-foreground">{shoe.color}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Tamanho:</span>
              <Badge variant="outline">{shoe.size}</Badge>
            </div>
          </div>

          {/* Seletor de quantidade */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantidade:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-4 py-2 border rounded-md text-center min-w-[60px]">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!shoe.inStock}
              >
                +
              </Button>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3">
            <Button 
              onClick={handleBuy}
              className="w-full"
              size="lg"
              disabled={!shoe.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {shoe.inStock ? "Comprar Agora" : "Produto Esgotado"}
            </Button>
            
            <Button 
              onClick={handleAddToWishlist}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Heart className="mr-2 h-5 w-5" />
              Adicionar à Lista de Desejos
            </Button>
          </div>

          {/* Informações adicionais */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Informações do Produto</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Produto original da marca {shoe.brand}</p>
                <p>• Tamanho: {shoe.size}</p>
                <p>• Disponibilidade: {shoe.inStock ? "Em estoque" : "Esgotado"}</p>
                <p>• Entrega expressa disponível</p>
                <p>• Garantia de 30 dias</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}