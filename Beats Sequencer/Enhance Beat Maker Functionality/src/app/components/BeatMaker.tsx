import { useState, useRef, useCallback, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import svgPaths from "../../imports/svg-peu02ns12a";
import { AuthModal } from './AuthModal';
import { SavedBeatsModal } from './SavedBeatsModal';
import { supabase } from '../../lib/supabase';

// Drum sound synthesis using Web Audio API
const createDrumSounds = (audioContext: AudioContext) => {
  const createKick = (time: number) => {
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
      gain.gain.setValueAtTime(1, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(time);
      osc.stop(time + 0.5);
    } catch (_) {}
  };

  const createSnare = (time: number) => {
    try {
      const noise = audioContext.createBufferSource();
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < output.length; i++) output[i] = Math.random() * 2 - 1;
      noise.buffer = noiseBuffer;
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000;
      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.7, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      noise.start(time);
    } catch (_) {}
  };

  const createHihat = (time: number, open: boolean) => {
    try {
      const duration = open ? 0.3 : 0.05;
      const noise = audioContext.createBufferSource();
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < output.length; i++) output[i] = Math.random() * 2 - 1;
      noise.buffer = noiseBuffer;
      const bandpass = audioContext.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 10000;
      const highpass = audioContext.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 7000;
      const gain = audioContext.createGain();
      gain.gain.setValueAtTime(0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
      noise.connect(bandpass);
      bandpass.connect(highpass);
      highpass.connect(gain);
      gain.connect(audioContext.destination);
      noise.start(time);
    } catch (_) {}
  };

  const createClap = (time: number) => {
    for (let i = 0; i < 3; i++) {
      try {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.05, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let j = 0; j < output.length; j++) output[j] = Math.random() * 2 - 1;
        noise.buffer = noiseBuffer;
        const noiseFilter = audioContext.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1500;
        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.4, time + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.01, time + i * 0.03 + 0.05);
        noise.connect(noiseFilter);
        noiseFilter.connect(gain);
        gain.connect(audioContext.destination);
        noise.start(time + i * 0.03);
      } catch (_) {}
    }
  };

  return { createKick, createSnare, createHihat, createClap };
};

const INSTRUMENTS = ['Kick', 'Snare', 'Open Hi-hat', 'Closed Hi-hat', 'Clap'] as const;
const STEPS = 16;

type BeatPattern = boolean[][];

// Lazily get or create an AudioContext only when the user first interacts
let sharedAudioContext: AudioContext | null = null;
function getAudioContext(): AudioContext | null {
  try {
    if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return null;
      sharedAudioContext = new AC();
    }
    return sharedAudioContext;
  } catch (_) {
    return null;
  }
}

export function BeatMaker() {
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [pattern, setPattern] = useState<BeatPattern>(() =>
    Array(INSTRUMENTS.length).fill(null).map(() => Array(STEPS).fill(false))
  );
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [savedBeatsModal, setSavedBeatsModal] = useState<'save' | 'load' | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setAuthModal(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const nextStepTimeRef = useRef<number>(0);
  const currentStepRef = useRef<number>(0);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const patternRef = useRef<BeatPattern>(pattern);
  patternRef.current = pattern;
  const tempoRef = useRef(tempo);
  tempoRef.current = tempo;

  const toggleStep = useCallback((instrumentIndex: number, stepIndex: number) => {
    setPattern(prev => {
      const newPattern = prev.map(row => [...row]);
      newPattern[instrumentIndex][stepIndex] = !newPattern[instrumentIndex][stepIndex];
      return newPattern;
    });
  }, []);

  const playStepNow = useCallback((step: number, time: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const sounds = createDrumSounds(ctx);
    patternRef.current.forEach((instrumentPattern, instrumentIndex) => {
      if (instrumentPattern[step]) {
        switch (instrumentIndex) {
          case 0: sounds.createKick(time); break;
          case 1: sounds.createSnare(time); break;
          case 2: sounds.createHihat(time, true); break;
          case 3: sounds.createHihat(time, false); break;
          case 4: sounds.createClap(time); break;
        }
      }
    });
  }, []);

  const scheduler = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const secondsPerBeat = 60.0 / tempoRef.current;
    const secondsPerStep = secondsPerBeat / 4;

    while (nextStepTimeRef.current < ctx.currentTime + 0.1) {
      playStepNow(currentStepRef.current, nextStepTimeRef.current);
      setCurrentStep(currentStepRef.current);
      nextStepTimeRef.current += secondsPerStep;
      currentStepRef.current = (currentStepRef.current + 1) % STEPS;
    }

    timerIdRef.current = setTimeout(scheduler, 25);
  }, [playStepNow]);

  const startPlayback = useCallback(async () => {
    const ctx = getAudioContext();
    if (!ctx) {
      alert('Web Audio API is not supported in this browser.');
      return;
    }
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    setIsPlaying(true);
    currentStepRef.current = 0;
    nextStepTimeRef.current = ctx.currentTime;
    scheduler();
  }, [scheduler]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(null);
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, startPlayback, stopPlayback]);

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 20 && value <= 300) {
      setTempo(value);
    }
  };

  const saveBeat = useCallback(() => {
    if (!user) {
      setAuthModal('login');
      return;
    }
    setSavedBeatsModal('save');
  }, [user]);

  const loadBeat = useCallback(() => {
    if (!user) {
      setAuthModal('login');
      return;
    }
    setSavedBeatsModal('load');
  }, [user]);

  const handleLoadBeat = useCallback((loadedPattern: BeatPattern, loadedTempo: number) => {
    stopPlayback();
    setPattern(loadedPattern);
    setTempo(loadedTempo);
  }, [stopPlayback]);

  const newBeat = useCallback(() => {
    if (confirm('Clear the current beat?')) {
      stopPlayback();
      setPattern(Array(INSTRUMENTS.length).fill(null).map(() => Array(STEPS).fill(false)));
      setTempo(120);
    }
  }, [stopPlayback]);

  return (
    <div className="bg-[#09090b] flex flex-col min-h-screen">

      {/* Top Header */}
      <header className="w-full bg-[#09090b] border-b border-[#27272a] px-[40px] py-[16px] flex items-center justify-between shrink-0">
        {/* Logo / Title */}
        <div className="flex items-center gap-[10px]">
          {/* Waveform icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="10" width="3" height="8" rx="1.5" fill="#8200db"/>
            <rect x="6" y="6" width="3" height="16" rx="1.5" fill="#ad46ff"/>
            <rect x="11" y="2" width="3" height="24" rx="1.5" fill="#8200db"/>
            <rect x="16" y="6" width="3" height="16" rx="1.5" fill="#ad46ff"/>
            <rect x="21" y="10" width="3" height="8" rx="1.5" fill="#8200db"/>
            <rect x="26" y="12" width="3" height="4" rx="1.5" fill="#ad46ff"/>
          </svg>
          <span className="font-['Geist:Medium',sans-serif] font-medium text-[#f8fafc] text-[22px] tracking-tight">
            Super <span className="text-[#ad46ff]">Beats</span>
          </span>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-[12px]">
          {user ? (
            <>
              <span className="text-[#a1a1aa] text-[14px] font-['Inter:Regular',sans-serif] max-w-[180px] truncate">
                {user.user_metadata?.username || user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="px-[18px] py-[8px] rounded-[8px] text-[#f1f5f9] font-['Geist:Medium',sans-serif] font-medium text-[15px] hover:bg-[#27272a] transition-colors cursor-pointer relative"
              >
                <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px]" />
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setAuthModal('login')}
                className="px-[18px] py-[8px] rounded-[8px] text-[#f1f5f9] font-['Geist:Medium',sans-serif] font-medium text-[15px] hover:bg-[#27272a] transition-colors cursor-pointer relative"
              >
                <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px]" />
                Log In
              </button>
              <button
                onClick={() => setAuthModal('signup')}
                className="px-[18px] py-[8px] rounded-[8px] bg-[#8200db] text-[#f8fafc] font-['Geist:Medium',sans-serif] font-medium text-[15px] hover:bg-[#9200f5] transition-colors cursor-pointer relative"
              >
                <div aria-hidden="true" className="absolute border border-[#ad46ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchMode={(mode) => setAuthModal(mode)}
        />
      )}

      {/* Saved Beats Modal */}
      {savedBeatsModal && (
        <SavedBeatsModal
          view={savedBeatsModal}
          pattern={pattern}
          tempo={tempo}
          onLoad={handleLoadBeat}
          onClose={() => setSavedBeatsModal(null)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center p-[40px]">
        <div className="max-w-[1400px] w-full">

          {/* Playback Tools */}
          <div className="bg-[#18181b] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-start justify-between px-[40px] py-[16px] relative w-full flex-wrap gap-[16px]">
                {/* Left Side - Tempo and Playback */}
                <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#f1f5f9] text-[16px]">Tempo</p>
                    <div className="bg-[#27272a] content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[2px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[2px]" />
                      <input
                        type="number"
                        value={tempo}
                        onChange={handleTempoChange}
                        className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#f1f5f9] text-[16px] bg-transparent border-none outline-none w-[60px] text-center"
                        min="20"
                        max="300"
                      />
                    </div>
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic text-[#71717a] text-[14px]">BPM</p>
                  </div>
                  <button
                    onClick={togglePlayback}
                    className="bg-[#8200db] content-stretch flex gap-[4px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#9200f5] transition-colors"
                  >
                    <div aria-hidden="true" className="absolute border border-[#ad46ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <div className="overflow-clip relative shrink-0 size-[20px]">
                      <div className="absolute inset-[12.5%]">
                        <div className="absolute inset-[-5%]">
                          {isPlaying ? (
                            // Stop icon (two vertical bars)
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <rect x="3" y="2" width="3.5" height="12" rx="1" fill="#F8FAFC" />
                              <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="#F8FAFC" />
                            </svg>
                          ) : (
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
                              <g>
                                <path d={svgPaths.p3031a300} stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                <path d={svgPaths.p2aad7200} stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              </g>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f8fafc] text-[16px]">
                      {isPlaying ? 'Stop' : 'Playback'}
                    </p>
                  </button>
                </div>

                {/* Right Side - Save/Load/New */}
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <button
                    onClick={saveBeat}
                    className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative shrink-0 cursor-pointer hover:bg-[#27272a] rounded-[8px] transition-colors"
                  >
                    <div className="bg-[#27272a] content-stretch flex items-center p-[4px] relative rounded-[4px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="overflow-clip relative rounded-[4px] shrink-0 size-[20px]">
                        <div className="absolute inset-[18.75%_9.38%]">
                          <div className="absolute inset-[-6%_-4.62%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.75 14">
                              <path d={svgPaths.pb0ea00} stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f5f9] text-[16px]">Save Beat</p>
                  </button>

                  <button
                    onClick={loadBeat}
                    className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative shrink-0 cursor-pointer hover:bg-[#27272a] rounded-[8px] transition-colors"
                  >
                    <div className="bg-[#27272a] content-stretch flex items-center p-[4px] relative rounded-[4px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="overflow-clip relative rounded-[4px] shrink-0 size-[20px]">
                        <div className="absolute inset-[15.63%_7.68%]">
                          <div className="absolute inset-[-5.45%_-4.43%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4272 15.25">
                              <path d={svgPaths.p14df6180} stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f5f9] text-[16px]">Open Beat</p>
                  </button>

                  <button
                    onClick={newBeat}
                    className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative shrink-0 cursor-pointer hover:bg-[#27272a] rounded-[8px] transition-colors"
                  >
                    <div className="bg-[#27272a] content-stretch flex items-center p-[4px] relative rounded-[4px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="overflow-clip relative rounded-[4px] shrink-0 size-[20px]">
                        <div className="absolute inset-[9.38%_15.63%]">
                          <div className="absolute inset-[-4.62%_-5.45%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.25 17.75">
                              <path d={svgPaths.p2543cf1} stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f5f9] text-[16px]">New Beat</p>
                  </button>
                </div>
              </div>
            </div>
            
          </div>

          {/* Sequencer Grid */}
          <div className="bg-[#18181b] relative rounded-bl-[12px] rounded-br-[12px] p-[40px] overflow-x-auto">
            <div aria-hidden="true" className="absolute border-2 border-t-0 border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-bl-[12px] rounded-br-[12px]" />
            <div className="flex gap-[24px] min-w-max">
              {/* Track Titles */}
              <div className="content-stretch flex flex-col gap-[8px] relative shrink-0">
                {/* "Tracks" label aligns with step numbers row */}
                <div className="content-stretch flex items-center justify-center p-[8px] relative shrink-0 h-[44px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[20px]">Beats Tracks</p>
                </div>
                {/* Instrument names */}
                <div className="content-stretch flex flex-col gap-[12px] relative">
                  {INSTRUMENTS.map((instrument) => (
                    <div key={instrument} className="flex items-center h-[56px] px-[8px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#9f9fa9] text-[20px] whitespace-nowrap">{instrument}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="flex flex-col">
                {/* Step Numbers */}
                <div className="flex gap-[16px] mb-[8px] h-[44px] items-center">
                  {Array.from({ length: STEPS }, (_, i) => (
                    <div key={i} className="w-[40px] flex items-center justify-center">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[#3f3f47] text-[14px]">{i + 1}</p>
                    </div>
                  ))}
                </div>

                {/* Instrument Rows */}
                <div className="content-stretch flex flex-col gap-[12px] items-start relative">
                  {INSTRUMENTS.map((instrument, instrumentIndex) => (
                    <div key={instrument} className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0">
                      {Array.from({ length: STEPS }, (_, stepIndex) => {
                        const isActive = pattern[instrumentIndex][stepIndex];
                        const isCurrent = isPlaying && currentStep === stepIndex;
                        const isEvenBeat = stepIndex % 2 === 0;

                        return (
                          <button
                            key={stepIndex}
                            onClick={() => toggleStep(instrumentIndex, stepIndex)}
                            className={`relative rounded-[8px] shrink-0 size-[40px] cursor-pointer transition-all duration-75 active:scale-95 hover:brightness-125 ${
                              isActive
                                ? isCurrent
                                  ? 'bg-[#c566ff]'
                                  : 'bg-[#8200db]'
                                : isCurrent
                                  ? 'bg-[#52525b]'
                                  : isEvenBeat
                                    ? 'bg-[#3f3f47]'
                                    : 'bg-[#27272a]'
                            }`}
                          >
                            <div
                              aria-hidden="true"
                              className={`absolute border border-solid inset-0 pointer-events-none rounded-[8px] ${
                                isCurrent ? 'border-[#c566ff]' : 'border-[#4a5565]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}