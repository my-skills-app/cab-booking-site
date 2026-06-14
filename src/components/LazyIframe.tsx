"use client";

import { useEffect, useRef, useState } from "react";

export function LazyIframe({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full bg-muted">
      {visible ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Loading video…
        </div>
      )}
    </div>
  );
}
