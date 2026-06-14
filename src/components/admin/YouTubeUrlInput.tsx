"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toYouTubeEmbedUrl, isYouTubeUrl } from "@/lib/youtube";

type YouTubeUrlInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
};

export function YouTubeUrlInput({ value, onChange, className, id }: YouTubeUrlInputProps) {
  const [converted, setConverted] = useState(false);

  const handleBlur = () => {
    if (!value.trim()) return;
    const embed = toYouTubeEmbedUrl(value);
    if (embed !== value) {
      onChange(embed);
      setConverted(true);
      setTimeout(() => setConverted(false), 4000);
    }
  };

  const showPendingHint = value.trim() && isYouTubeUrl(value) && !value.includes("/embed/");

  return (
    <div className="space-y-1">
      <Input
        id={id}
        value={value}
        onChange={(e) => {
          setConverted(false);
          onChange(e.target.value);
        }}
        onBlur={handleBlur}
        placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
        className={className}
      />
      {converted && (
        <p className="text-xs text-green-600 font-medium">✓ Converted to embed URL</p>
      )}
      {showPendingHint && !converted && (
        <p className="text-xs text-muted-foreground">Normal YouTube link — auto-converts on blur or save</p>
      )}
    </div>
  );
}
