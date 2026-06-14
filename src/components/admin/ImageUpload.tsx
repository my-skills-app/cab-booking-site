"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  previewClassName?: string;
};

function uploadWithProgress(
  file: File,
  onProgress: (percent: number) => void
): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("image", file);

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data);
        } else {
          reject(new Error(data.error || "Upload failed"));
        }
      } catch {
        reject(new Error("Upload failed"));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
    xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));

    xhr.open("POST", "/api/admin/upload-image");
    xhr.send(formData);
  });
}

export function ImageUpload({ value, onChange, previewClassName = "h-28 w-full max-w-[200px]" }: ImageUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setProgress(0);
    try {
      const data = await uploadWithProgress(file, setProgress);
      onChange(data.url);
      setProgress(100);
      toast({ title: "Image uploaded successfully" });
    } catch (error) {
      toast({ title: "Upload failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {value && !uploading && (
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
            disabled={uploading}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {uploading && (
        <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3 max-w-[280px]">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            Uploading image… {progress}%
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={uploading}
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
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading {progress}%
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            {value ? "Change Image" : "Upload Image"}
          </>
        )}
      </Button>
    </div>
  );
}
