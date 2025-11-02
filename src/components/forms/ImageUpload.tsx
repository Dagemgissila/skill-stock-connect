import React, { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = "Image",
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="url"
          placeholder="Enter image URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={error ? "border-destructive" : ""}
        />
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button type="button" variant="outline" size="icon">
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-32 rounded-lg object-cover border"
          />
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
