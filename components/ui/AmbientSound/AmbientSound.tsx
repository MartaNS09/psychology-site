"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./AmbientSound.scss";

const STORAGE_KEY = "ambient-sound-enabled";

function createOcean(ctx: AudioContext, dest: AudioNode) {
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;

  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 520;

  const gain = ctx.createGain();
  gain.gain.value = 0.045;

  src.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  src.start();
  return () => src.stop();
}

function createPad(ctx: AudioContext, dest: AudioNode) {
  const notes = [261.63, 329.63, 392, 493.88, 587.33];
  const oscs = notes.map((freq) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    g.gain.value = 0.018;
    osc.connect(g);
    g.connect(dest);
    osc.start();
    return osc;
  });

  const lfo = ctx.createOscillator();
  const lfoG = ctx.createGain();
  lfo.frequency.value = 0.06;
  lfoG.gain.value = 0.008;
  lfo.connect(lfoG);
  lfo.connect(dest);
  lfo.start();

  return () => {
    lfo.stop();
    oscs.forEach((o) => o.stop());
  };
}

function createBirds(ctx: AudioContext, dest: AudioNode) {
  const timers: ReturnType<typeof setInterval>[] = [];

  const chirp = () => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(4200, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.2);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(g);
    g.connect(dest);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  };

  timers.push(setInterval(chirp, 4500 + Math.random() * 3000));
  timers.push(setInterval(chirp, 7000 + Math.random() * 4000));

  return () => timers.forEach(clearInterval);
}

function createAmbient(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0.55;
  master.connect(ctx.destination);

  const stopOcean = createOcean(ctx, master);
  const stopPad = createPad(ctx, master);
  const stopBirds = createBirds(ctx, master);

  return () => {
    stopBirds();
    stopPad();
    stopOcean();
    master.disconnect();
  };
}

export function AmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setReady(true);
    try {
      setEnabled(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    void ctxRef.current?.close();
    ctxRef.current = null;
  }, []);

  const start = useCallback(async () => {
    stop();
    const ctx = new AudioContext();
    await ctx.resume();
    ctxRef.current = ctx;
    stopRef.current = createAmbient(ctx);
  }, [stop]);

  useEffect(() => {
    if (!ready) return;
    if (enabled) void start();
    else stop();
    return stop;
  }, [enabled, ready, start, stop]);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  if (!ready) return null;

  return (
    <button
      type="button"
      className={`ambient-sound${enabled ? " ambient-sound_on" : ""}`}
      onClick={toggle}
      aria-label={enabled ? "Выключить атмосферу" : "Включить атмосферу: классика, океан, птицы"}
      aria-pressed={enabled}
      title={enabled ? "Выключить звук" : "Включить атмосферу"}
    >
      <span className="ambient-sound__icon" aria-hidden="true">
        {enabled ? "🔊" : "🎵"}
      </span>
      <span className="ambient-sound__label">{enabled ? "Звук" : "Атмосфера"}</span>
    </button>
  );
}
