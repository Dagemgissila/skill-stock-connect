import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ItemForm } from "@/components/forms/ItemForm";
import { useItem } from "@/context/ItemContext";
import { StockItem } from "@/types";
import { toast } from "sonner";

export function AddItemModal() {
  const { isAddModalOpen, setIsAddModalOpen, addItem } = useItem();

  const handleSubmit = (item: StockItem) => {
    addItem(item);
    toast.success("Item added successfully");
    setIsAddModalOpen(false);
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <ItemForm
          onSubmit={handleSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
