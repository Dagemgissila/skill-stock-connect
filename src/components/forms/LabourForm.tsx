import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Labour } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { FormSelect } from "./FormSelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { labourSchema, LabourFormData } from "@/schemas/labourSchema";

interface LabourFormProps {
  labour?: Labour | null;
  onSubmit: (labour: Labour) => void;
  onCancel: () => void;
}

export function LabourForm({ labour, onSubmit, onCancel }: LabourFormProps) {
  const form = useForm<LabourFormData>({
    resolver: zodResolver(labourSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      profession: "",
      price: 0,
      priceUnit: "hour",
      experience: 0,
      rating: 0,
      description: "",
      skills: [],
      available: true,
      imageUrl: "",
    },
  });

  const [currentSkill, setCurrentSkill] = React.useState("");
  const skills = form.watch("skills");

  useEffect(() => {
    if (labour) {
      form.reset({
        name: labour.name,
        phone: labour.phone,
        email: labour.email || "",
        profession: labour.profession,
        price: labour.price,
        priceUnit: labour.priceUnit,
        experience: labour.experience,
        rating: labour.rating || 0,
        description: labour.description,
        skills: labour.skills,
        available: labour.available,
        imageUrl: labour.imageUrl || "",
      });
    }
  }, [labour, form]);

  const handleFormSubmit = (data: LabourFormData) => {
    const labourData: Labour = {
      id: labour?.id || Date.now().toString(),
      name: data.name,
      phone: data.phone,
      profession: data.profession,
      price: data.price,
      priceUnit: data.priceUnit,
      experience: data.experience,
      description: data.description,
      skills: data.skills,
      available: data.available,
      email: data.email || undefined,
      rating: data.rating || undefined,
      imageUrl: data.imageUrl || undefined,
    };
    onSubmit(labourData);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      form.setValue("skills", [...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue("skills", skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input {...field} type="tel" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} type="email" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="profession" render={({ field }) => (
            <FormItem><FormLabel>Profession *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem><FormLabel>Price *</FormLabel><FormControl><Input {...field} type="number" step="0.01" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="priceUnit" render={({ field }) => (
            <FormItem><FormLabel>Price Unit *</FormLabel><FormControl>
              <FormSelect label="" value={field.value} onChange={field.onChange} options={[
                { value: "hour", label: "Per Hour" }, { value: "day", label: "Per Day" }, { value: "project", label: "Per Project" }
              ]} />
            </FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="experience" render={({ field }) => (
            <FormItem><FormLabel>Experience (years) *</FormLabel><FormControl><Input {...field} type="number" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="rating" render={({ field }) => (
            <FormItem><FormLabel>Rating (0-5)</FormLabel><FormControl><Input {...field} type="number" step="0.1" min="0" max="5" /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Description *</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="skills" render={() => (
          <FormItem><FormLabel>Skills *</FormLabel>
            <div className="flex gap-2">
              <Input value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); }}} placeholder="Add a skill" />
              <Button type="button" onClick={addSkill}>Add</Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
          <FormItem><FormControl>
            <ImageUpload label="Image URL" value={field.value || ""} onChange={field.onChange} error={form.formState.errors.imageUrl?.message} />
          </FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="available" render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <FormLabel className="!mt-0">Available for Work</FormLabel>
          </FormItem>
        )} />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{labour ? "Update" : "Create"} Labour</Button>
        </div>
      </form>
    </Form>
  );
}
