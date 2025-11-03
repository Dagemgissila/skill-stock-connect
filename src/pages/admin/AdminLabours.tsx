import { useState } from "react";
import { useLabour } from "@/context/LabourContext";
import { Button } from "@/components/ui/button";
import { AddLabourModal } from "@/components/modals/AddLabourModal";
import { EditLabourSheet } from "@/components/modals/EditLabourSheet";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
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

export default function AdminLabours() {
  const {
    labours,
    deleteLabour,
    setIsAddModalOpen,
    setIsEditSheetOpen,
    setSelectedLabour,
  } = useLabour();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredLabours = labours.filter((labour) =>
    labour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    labour.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteLabour(deleteId);
      toast.success("Labour deleted successfully");
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2">Labour Management</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Manage your labour workforce
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="sm:size-default">
          <Plus className="mr-2 h-4 w-4" />
          Add Labour
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search labours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Labour</TableHead>
              <TableHead className="min-w-[120px]">Profession</TableHead>
              <TableHead className="min-w-[100px]">Price</TableHead>
              <TableHead className="min-w-[80px]">Rating</TableHead>
              <TableHead className="min-w-[150px]">Skills</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="text-right min-w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLabours.map((labour) => (
              <TableRow key={labour.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={labour.image}
                      alt={labour.name}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{labour.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{labour.experience}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{labour.profession}</TableCell>
                <TableCell className="whitespace-nowrap">${labour.price}/{labour.priceUnit}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning flex-shrink-0" />
                    <span className="font-medium">{labour.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {labour.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs whitespace-nowrap">
                        {skill}
                      </Badge>
                    ))}
                    {labour.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{labour.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={labour.available ? "default" : "secondary"} className="whitespace-nowrap">
                    {labour.available ? "Available" : "Busy"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedLabour(labour);
                        setIsEditSheetOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(labour.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddLabourModal />
      <EditLabourSheet />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the labour
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
