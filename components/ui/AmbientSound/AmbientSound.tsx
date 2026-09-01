"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./AmbientSound.scss";

const STORAGE_KEY = "ambient-sound-enabled";

/** Пентатоника — мягкая мелодия без лицензионных треков (генерируется в браузере). */
const MELODY_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

function playSoftNote(ctx: AudioContext, dest: AudioNode, freq: number, start: number, duration = 1.4) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(0.032, start + 0.06);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function createMelody(ctx: AudioContext, dest: AudioNode) {
  const bus = ctx.createGain();
  bus.gain.value = 0.85;
  bus.connect(dest);

  const pickNotes = () => {
    const count = 2 + Math.floor(Math.random() * 2);
    const pool = [...MELODY_NOTES];
    const picked: number[] = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  };

  const phrase = () => {
    const t = ctx.currentTime;
    pickNotes().forEach((freq, i) => playSoftNote(ctx, bus, freq, t + i * 0.42));
  };

  phrase();
  const timer = window.setInterval(phrase, 5200 + Math.random() * 2800);
  return () => window.clearInterval(timer);
}

function createBirds(ctx: AudioContext, dest: AudioNode) {
  const timers: number[] = [];

  const chirp = () => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.exponentialRampToValueAtTime(3400, t + 0.07);
    osc.frequency.exponentialRampToValueAtTime(2100, t + 0.22);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.012, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + 0.42);
  };

  timers.push(window.setInterval(chirp, 9000 + Math.random() * 7000));
  return () => timers.forEach((id) => window.clearInterval(id));
}

function createAmbient(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);

  const stopMelody = createMelody(ctx, master);
  const stopBirds = createBirds(ctx, master);

  return () => {
    stopBirds();
    stopMelody();
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
      aria-label={enabled ? "Выключить атмосферу" : "Включить лёгкую мелодию и звуки природы"}
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
