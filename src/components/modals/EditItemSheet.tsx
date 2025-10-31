import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ItemForm } from "@/components/forms/ItemForm";
import { useItem } from "@/context/ItemContext";
import { StockItem } from "@/types";
import { toast } from "sonner";

export function EditItemSheet() {
  const { isEditSheetOpen, setIsEditSheetOpen, selectedItem, updateItem } =
    useItem();

  const handleSubmit = (item: StockItem) => {
    if (selectedItem) {
      updateItem(selectedItem.id, item);
      toast.success("Item updated successfully");
      setIsEditSheetOpen(false);
    }
  };

  return (
    <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Item</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <ItemForm
            item={selectedItem}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditSheetOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
