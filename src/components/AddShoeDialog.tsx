
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Shoe } from "@/types/shoe";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const shoeFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  brand: z.string().min(2, { message: "Marca deve ter pelo menos 2 caracteres" }),
  price: z.coerce.number().positive({ message: "Preço deve ser positivo" }),
  size: z.coerce.number().positive({ message: "Tamanho deve ser positivo" }),
  color: z.string().min(1, { message: "Cor é obrigatória" }),
  imageUrl: z.string().optional(),
  inStock: z.boolean().default(true),
});

type ShoeFormValues = z.infer<typeof shoeFormSchema>;

interface AddShoeDialogProps {
  onAddShoe: (shoe: Shoe) => void;
}

export function AddShoeDialog({ onAddShoe }: AddShoeDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ShoeFormValues>({
    resolver: zodResolver(shoeFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      size: 0,
      color: "#000000",
      imageUrl: "",
      inStock: true,
    },
  });

  async function onSubmit(data: ShoeFormValues) {
    const newShoe: any = {
      name: data.name,
      brand: data.brand,
      price: data.price,
      size: data.size,
      color: data.color,
      photoUrl: data.imageUrl,
      stock: data.inStock,
    };

    await axios.post("http://localhost:3000/shoes", newShoe);
    onAddShoe(newShoe);
    setOpen(false);
    form.reset();
    
    toast({
      title: "Calçado adicionado",
      description: `${data.name} foi adicionado com sucesso!`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Calçado
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Calçado</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do calçado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Marca do calçado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tamanho</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input type="color" className="w-12 h-10 p-1" {...field} />
                        <Input 
                          value={field.value} 
                          onChange={field.onChange}
                          placeholder="#000000" 
                          className="flex-1" 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="http://exemplo.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Em Estoque</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-4">
              <Button type="submit">Adicionar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
