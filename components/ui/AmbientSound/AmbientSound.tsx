"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./AmbientSound.scss";

const STORAGE_KEY = "ambient-sound-enabled";
/** Pixabay Music — absolutesound, royalty-free (см. pixabay.com/service/license) */
const AUDIO_SRC = "/audio/ambient.mp3";

export function AmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "metadata";
    audioRef.current = audio;
    setReady(true);

    try {
      setEnabled(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch {
      /* autoplay blocked until user gesture */
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (enabled) void start();
    else stop();
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
      aria-label={enabled ? "Выключить фоновую музыку" : "Включить фоновую музыку"}
      aria-pressed={enabled}
      title={enabled ? "Выключить музыку" : "Включить музыку"}
    >
      <span className="ambient-sound__icon" aria-hidden="true">
        {enabled ? "🔊" : "🎵"}
      </span>
      <span className="ambient-sound__label">{enabled ? "Звук" : "Атмосфера"}</span>
    </button>
  );
}
