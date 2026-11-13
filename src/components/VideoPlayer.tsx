"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/** Lekki odtwarzacz: iframe YouTube ładuje się dopiero po kliknięciu (bez autoplayu, bez cookies przed zgodą). */
export function VideoPlayer({ id, title, thumbnail, color }: { id: string; title: string; thumbnail: string; color: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden border border-line bg-surface" style={{ ["--accent" as string]: color }}>
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 block size-full text-left" aria-label={`Odtwórz: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbnail} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <span className="absolute bottom-0 left-0 h-1 w-full bg-accent" />
          <span className="absolute bottom-5 left-5 grid size-14 place-items-center bg-accent text-bg transition-transform group-hover:scale-105">
            <Play aria-hidden size={22} fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
