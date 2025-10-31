import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LabourForm } from "@/components/forms/LabourForm";
import { useLabour } from "@/context/LabourContext";
import { Labour } from "@/types";
import { toast } from "sonner";

export function AddLabourModal() {
  const { isAddModalOpen, setIsAddModalOpen, addLabour } = useLabour();

  const handleSubmit = (labour: Labour) => {
    addLabour(labour);
    toast.success("Labour added successfully");
    setIsAddModalOpen(false);
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Labour</DialogTitle>
        </DialogHeader>
        <LabourForm
          onSubmit={handleSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
