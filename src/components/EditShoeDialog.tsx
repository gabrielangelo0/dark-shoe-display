import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shoe } from "@/types/shoe";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface EditShoeDialogProps {
  shoe: Shoe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShoeUpdated: () => void;
}

export function EditShoeDialog({ shoe, open, onOpenChange, onShoeUpdated }: EditShoeDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    size: 0,
    color: "#000000",
    imageUrl: "",
    inStock: true,
  });

  // Update form data when shoe changes
  useEffect(() => {
    if (shoe) {
      setFormData({
        name: shoe.name,
        brand: shoe.brand,
        price: shoe.price,
        size: shoe.size,
        color: shoe.color,
        imageUrl: shoe.imageUrl || "",
        inStock: shoe.inStock,
      });
    }
  }, [shoe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shoe) return;

    try {
      await axios.put(`http://localhost:3000/shoes/${shoe.id}`, {
        name: formData.name,
        brand: formData.brand,
        price: formData.price,
        size: formData.size,
        color: formData.color,
        imageUrl: formData.imageUrl,
        inStock: formData.inStock,
      });

      toast({
        title: "Sucesso!",
        description: "Calçado atualizado com sucesso.",
      });

      onShoeUpdated();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar calçado.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Calçado</DialogTitle>
          <DialogDescription>
            Atualize as informações do calçado abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Tamanho</Label>
              <Input
                id="size"
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Cor</Label>
            <Input
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
            />
            <Label htmlFor="inStock">Em estoque</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}