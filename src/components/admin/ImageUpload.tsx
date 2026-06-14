"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  previewClassName?: string;
};

export function ImageUpload({ value, onChange, previewClassName = "h-28 w-full max-w-[200px]" }: ImageUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please choose an image file", variant: "destructive" });
      return;
    }
    if (file.size > 32 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum size is 32 MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      toast({ title: "Image uploaded" });
    } catch (error) {
      toast({ title: "Upload failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className={`rounded-lg border border-border object-cover ${previewClassName}`}
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-md"
            onClick={() => onChange("")}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2 w-full sm:w-auto"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-4 h-4" />
        {uploading ? "Uploading..." : value ? "Change Image" : "Upload Image"}
      </Button>
    </div>
  );
}
