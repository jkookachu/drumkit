"use client";

import { useRef, useEffect } from "react";

interface Props {
  analyser: AnalyserNode | null;
}

export default function WaveformVisualizer({ analyser }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx2d = canvas.getContext("2d")!;
    const dataArray = analyser
      ? new Uint8Array(analyser.fftSize)
      : new Uint8Array(512).fill(128);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const W = canvas.width;
      const H = canvas.height;

      if (analyser) {
        analyser.getByteTimeDomainData(dataArray);
      }

      ctx2d.clearRect(0, 0, W, H);
      ctx2d.lineWidth = 3;
      ctx2d.strokeStyle = "rgba(180, 255, 200, 0.9)";
      ctx2d.shadowBlur = 16;
      ctx2d.shadowColor = "rgba(100, 255, 150, 0.8)";
      ctx2d.beginPath();

      const sliceWidth = W / dataArray.length;
      let x = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * H) / 2;
        i === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y);
        x += sliceWidth;
      }
      ctx2d.lineTo(W, H / 2);
      ctx2d.stroke();
      ctx2d.shadowBlur = 0;
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [analyser]);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
}
