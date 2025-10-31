import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LabourForm } from "@/components/forms/LabourForm";
import { useLabour } from "@/context/LabourContext";
import { Labour } from "@/types";
import { toast } from "sonner";

export function EditLabourSheet() {
  const { isEditSheetOpen, setIsEditSheetOpen, selectedLabour, updateLabour } =
    useLabour();

  const handleSubmit = (labour: Labour) => {
    if (selectedLabour) {
      updateLabour(selectedLabour.id, labour);
      toast.success("Labour updated successfully");
      setIsEditSheetOpen(false);
    }
  };

  return (
    <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Labour</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <LabourForm
            labour={selectedLabour}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditSheetOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
