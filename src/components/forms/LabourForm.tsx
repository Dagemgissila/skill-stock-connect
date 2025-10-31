import { useState, useEffect } from "react";
import { Labour } from "@/types";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface LabourFormProps {
  labour?: Labour | null;
  onSubmit: (labour: Labour) => void;
  onCancel: () => void;
}

export function LabourForm({ labour, onSubmit, onCancel }: LabourFormProps) {
  const [formData, setFormData] = useState<Partial<Labour>>({
    name: "",
    image: "",
    profession: "",
    price: 0,
    priceUnit: "day",
    rating: 5,
    experience: "",
    skills: [],
    description: "",
    phone: "",
    email: "",
    available: true,
  });
  const [currentSkill, setCurrentSkill] = useState("");

  useEffect(() => {
    if (labour) {
      setFormData(labour);
    }
  }, [labour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: labour?.id || Date.now().toString(),
      ...formData,
    } as Labour);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills?.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), currentSkill.trim()],
      });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter((s) => s !== skill) || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter labour name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+1 234 567 8900"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Profession</Label>
        <Input
          id="profession"
          value={formData.profession}
          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
          placeholder="e.g., Electrician, Plumber"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            placeholder="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceUnit">Price Unit</Label>
          <Select
            value={formData.priceUnit}
            onValueChange={(value: "day" | "hour") =>
              setFormData({ ...formData, priceUnit: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Per Day</SelectItem>
              <SelectItem value="hour">Per Hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Experience</Label>
        <Input
          id="experience"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          placeholder="e.g., 5 years"
          required
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
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the labour's expertise and experience"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skill">Skills</Label>
        <div className="flex gap-2">
          <Input
            id="skill"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="Add a skill"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button type="button" onClick={addSkill}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills?.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeSkill(skill)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="available"
          checked={formData.available}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, available: checked })
          }
        />
        <Label htmlFor="available">Available for work</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {labour ? "Update" : "Create"} Labour
        </Button>
      </div>
    </form>
  );
}
