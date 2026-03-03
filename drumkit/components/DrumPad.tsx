"use client";

import { useRef, useCallback } from "react";
import { DrumSound } from "@/hooks/useAudioEngine";

interface Props {
  sound: DrumSound;
  label: string;
  keyLabel: string;
  onPlay: (sound: DrumSound) => void;
}

export default function DrumPad({ sound, label, keyLabel, onPlay }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const addRipple = useCallback((x: number, y: number) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "ripple-span";
    span.style.cssText = `width:${size}px;height:${size}px;left:${x - rect.left - size / 2}px;top:${y - rect.top - size / 2}px`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }, []);

  const activate = useCallback(
    (clientX: number, clientY: number) => {
      onPlay(sound);
      addRipple(clientX, clientY);
      const btn = btnRef.current;
      if (!btn) return;
      btn.dataset.active = "true";
      setTimeout(() => delete btn.dataset.active, 120);
    },
    [sound, onPlay, addRipple]
  );

  return (
    <button
      ref={btnRef}
      onMouseDown={(e) => activate(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        e.preventDefault();
        activate(e.touches[0].clientX, e.touches[0].clientY);
      }}
      className="
        relative flex-1 aspect-square overflow-hidden rounded-[5px] border-none
        bg-[#9aabbd] cursor-pointer
        shadow-[8px_-4px_4px_0px_rgba(0,0,0,0.25)]
        flex flex-col items-center justify-center gap-1.5
        transition-all duration-75
        hover:bg-[#aebecf]
        active:bg-[#c0d3e8] active:translate-x-1 active:-translate-y-0.5
        active:shadow-[2px_-1px_2px_0px_rgba(0,0,0,0.25)]
        data-[active=true]:bg-[#c0d3e8] data-[active=true]:translate-x-1
        data-[active=true]:-translate-y-0.5
        data-[active=true]:shadow-[2px_-1px_2px_0px_rgba(0,0,0,0.25)]
        focus:outline-none
      "
    >
      <span className="text-[11px] font-bold text-white/75 bg-black/20 rounded px-1.5 py-0.5 tracking-wider">
        {keyLabel}
      </span>
      <span className="text-[11px] font-semibold text-white/90 text-center leading-tight">
        {label}
      </span>
    </button>
  );
}
