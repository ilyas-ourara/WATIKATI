
import { useEffect, useRef } from 'react';

export const useThinkingSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Créer un oscillateur pour générer un son de thinking électronique
    const createThinkingSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configuration pour un son cyber/électronique
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.type = 'sine';
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
      
      return { oscillator, audioContext };
    };

    audioRef.current = { play: createThinkingSound } as any;
  }, []);

  const playThinkingSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Son de thinking subtil et électronique
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(300, audioContext.currentTime + 0.3);
      oscillator.frequency.linearRampToValueAtTime(150, audioContext.currentTime + 0.6);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6);
      
      oscillator.type = 'triangle';
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.6);
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  return { playThinkingSound };
};
