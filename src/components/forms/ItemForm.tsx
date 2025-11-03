import { useState, useEffect } from "react";
import { StockItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItemFormProps {
  item?: StockItem | null;
  onSubmit: (item: StockItem) => void;
  onCancel: () => void;
}

export function ItemForm({ item, onSubmit, onCancel }: ItemFormProps) {
  const [formData, setFormData] = useState<Partial<StockItem>>({
    name: "",
    image: "",
    price: 0,
    quantity: 0,
    description: "",
    supplierName: "",
    category: "",
    status: "in-stock",
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  useEffect(() => {
    // Auto-calculate status based on quantity
    if (formData.quantity !== undefined) {
      let newStatus: "in-stock" | "low-stock" | "out-of-stock";
      if (formData.quantity === 0) {
        newStatus = "out-of-stock";
      } else if (formData.quantity < 20) {
        newStatus = "low-stock";
      } else {
        newStatus = "in-stock";
      }
      if (formData.status !== newStatus) {
        setFormData((prev) => ({ ...prev, status: newStatus }));
      }
    }
  }, [formData.quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: item?.id || Date.now().toString(),
      ...formData,
    } as StockItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter item name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Construction Materials"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value) })
            }
            placeholder="0"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplierName">Supplier Name</Label>
        <Input
          id="supplierName"
          value={formData.supplierName}
          onChange={(e) =>
            setFormData({ ...formData, supplierName: e.target.value })
          }
          placeholder="Enter supplier name (optional)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe the item"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: "in-stock" | "low-stock" | "out-of-stock") =>
            setFormData({ ...formData, status: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {item ? "Update" : "Create"} Item
        </Button>
      </div>
    </form>
  );
}
