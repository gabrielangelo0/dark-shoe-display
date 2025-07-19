
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Shoe } from "@/types/shoe";
import { Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ShoeCardProps {
  shoe: Shoe;
  onEdit: (shoe: Shoe) => void;
  onDelete: (id: string) => void;
}

export function ShoeCard({ shoe, onEdit, onDelete }: ShoeCardProps) {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(shoe.id);
    setShowDeleteDialog(false);
  };
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:shadow-purple-500/20 cursor-pointer group">
      <div onClick={() => navigate(`/shoe/${shoe.id}`)}>
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full overflow-hidden bg-secondary/50">
            <img
              src={shoe.photoUrl || "/placeholder.svg"}
              alt={shoe.name}
              className="h-full w-full object-cover transition-all group-hover:scale-105"
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
      </div>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-semibold text-lg">R$ {shoe.price.toFixed(2)}</p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/shoe/${shoe.id}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(shoe);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o calçado <strong>{shoe.name}</strong> da {shoe.brand}?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
