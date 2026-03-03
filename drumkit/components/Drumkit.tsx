"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import WaveformVisualizer from "./WaveformVisualizer";
import DrumPad from "./DrumPad";
import { useAudioEngine, DrumSound } from "@/hooks/useAudioEngine";

const ROWS: {
  label: string;
  pads: { sound: DrumSound; name: string; key: string }[];
}[] = [
  {
    label: "Kick + Snare",
    pads: [
      { sound: "kick", name: "Kick", key: "A" },
      { sound: "snare", name: "Snare", key: "S" },
    ],
  },
  {
    label: "Toms",
    pads: [
      { sound: "hi-tom", name: "Hi Tom", key: "D" },
      { sound: "lo-tom", name: "Lo Tom", key: "F" },
    ],
  },
  {
    label: "Hats",
    pads: [
      { sound: "open-hat", name: "Open Hat", key: "J" },
      { sound: "closed-hat", name: "Closed Hat", key: "K" },
    ],
  },
];

export default function Drumkit() {
  const engine = useAudioEngine();
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const pressedKeys = useRef(new Set<string>());

  // play() creates the AudioContext on first call and returns the AnalyserNode
  const handlePlay = useCallback(
    (sound: DrumSound) => {
      const node = engine.play(sound);
      if (!analyser) setAnalyser(node);
    },
    [engine, analyser]
  );

  // Build key→sound map
  const keyMap = useCallback((): Record<string, DrumSound> => {
    const map: Record<string, DrumSound> = {};
    ROWS.forEach((row) =>
      row.pads.forEach((pad) => (map[pad.key.toLowerCase()] = pad.sound))
    );
    return map;
  }, []);

  useEffect(() => {
    const map = keyMap();
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (pressedKeys.current.has(k)) return;
      pressedKeys.current.add(k);
      if (map[k]) handlePlay(map[k]);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [handlePlay, keyMap]);

  return (
    <div className="min-h-screen bg-[#dae1d1] flex items-center justify-center px-4 py-6">
      <div className="flex flex-col gap-2 items-center w-full max-w-[440px]">

        {/* Waveform Visualizer */}
        <div
          className="w-full rounded-[8px] overflow-hidden"
          style={{
            background: "#028b5a",
            height: "195px",
            boxShadow: "inset 0 0 6px 9px #2d2451",
          }}
        >
          <WaveformVisualizer analyser={analyser} />
        </div>

        {/* Instrument Pads */}
        <div className="bg-[#7d6e78] rounded-[8px] w-full p-8 flex flex-col gap-4">
          {ROWS.map((row) => (
            <div key={row.label} className="flex flex-col gap-3 w-full">
              <p className="text-[12px] font-semibold text-white tracking-wide uppercase">
                {row.label}
              </p>
              <div className="flex items-center justify-between gap-3 w-full">
                {row.pads.map((pad) => (
                  <DrumPad
                    key={pad.sound}
                    sound={pad.sound}
                    label={pad.name}
                    keyLabel={pad.key}
                    onPlay={handlePlay}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-black/40 pt-1">
          Press A · S · D · F · J · K to play
        </p>
      </div>
    </div>
  );
}
