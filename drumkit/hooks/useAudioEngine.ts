"use client";

import { useRef, useCallback } from "react";

export type DrumSound =
  | "kick"
  | "snare"
  | "hi-tom"
  | "lo-tom"
  | "open-hat"
  | "closed-hat";

export interface AudioEngine {
  play: (sound: DrumSound) => AnalyserNode;
}

export function useAudioEngine(): AudioEngine {
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      analyserRef.current = ctxRef.current.createAnalyser();
      analyserRef.current.fftSize = 1024;
      analyserRef.current.smoothingTimeConstant = 0.82;
      analyserRef.current.connect(ctxRef.current.destination);
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (sound: DrumSound): AnalyserNode => {
      const ctx = getCtx();
      const master = ctx.createGain();
      master.connect(analyserRef.current!);

      const now = ctx.currentTime;

      switch (sound) {
        case "kick": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(master);
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
          gain.gain.setValueAtTime(1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.start();
          osc.stop(now + 0.5);
          break;
        }
        case "snare": {
          const bufSize = ctx.sampleRate * 0.2;
          const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const bpf = ctx.createBiquadFilter();
          bpf.type = "bandpass";
          bpf.frequency.value = 1800;
          bpf.Q.value = 0.6;
          const gain = ctx.createGain();
          src.connect(bpf);
          bpf.connect(gain);
          gain.connect(master);
          gain.gain.setValueAtTime(0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          src.start();
          src.stop(now + 0.2);
          // body tone
          const osc = ctx.createOscillator();
          const og = ctx.createGain();
          osc.connect(og);
          og.connect(master);
          osc.frequency.value = 200;
          og.gain.setValueAtTime(0.6, now);
          og.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start();
          osc.stop(now + 0.12);
          break;
        }
        case "hi-tom": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(master);
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.35);
          gain.gain.setValueAtTime(0.9, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start();
          osc.stop(now + 0.35);
          break;
        }
        case "lo-tom": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(master);
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(50, now + 0.45);
          gain.gain.setValueAtTime(0.95, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc.start();
          osc.stop(now + 0.45);
          break;
        }
        case "open-hat": {
          const bufSize = ctx.sampleRate * 0.5;
          const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const hpf = ctx.createBiquadFilter();
          hpf.type = "highpass";
          hpf.frequency.value = 7000;
          const gain = ctx.createGain();
          src.connect(hpf);
          hpf.connect(gain);
          gain.connect(master);
          gain.gain.setValueAtTime(0.5, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          src.start();
          src.stop(now + 0.5);
          break;
        }
        case "closed-hat": {
          const bufSize = ctx.sampleRate * 0.08;
          const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const hpf = ctx.createBiquadFilter();
          hpf.type = "highpass";
          hpf.frequency.value = 9000;
          const gain = ctx.createGain();
          src.connect(hpf);
          hpf.connect(gain);
          gain.connect(master);
          gain.gain.setValueAtTime(0.45, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          src.start();
          src.stop(now + 0.08);
          break;
        }
      }
      return analyserRef.current!;
    },
    [getCtx]
  );

  return { play };
}
