import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';

type BeatPattern = boolean[][];

interface SavedBeat {
  id: string;
  name: string;
  pattern: BeatPattern;
  tempo: number;
  created_at: string;
}

interface SavedBeatsModalProps {
  view: 'save' | 'load';
  pattern: BeatPattern;
  tempo: number;
  onLoad: (pattern: BeatPattern, tempo: number) => void;
  onClose: () => void;
}

export function SavedBeatsModal({ view: initialView, pattern, tempo, onLoad, onClose }: SavedBeatsModalProps) {
  const [view, setView] = useState<'save' | 'load'>(initialView);
  const [beatName, setBeatName] = useState('');
  const [beats, setBeats] = useState<SavedBeat[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (view === 'load') fetchBeats();
  }, [view]);

  const fetchBeats = async () => {
    setFetchLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('beats')
        .select('id, name, pattern, tempo, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setBeats((data as SavedBeat[]) ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load beats.');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beatName.trim()) return;
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to save beats.');
      const { error } = await supabase.from('beats').insert({
        user_id: user.id,
        name: beatName.trim(),
        pattern,
        tempo,
      });
      if (error) throw error;
      setSuccessMessage(`"${beatName.trim()}" saved!`);
      setBeatName('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save beat.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = (beat: SavedBeat) => {
    onLoad(beat.pattern, beat.tempo);
    onClose();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeletingId(id);
    setError(null);
    try {
      const { error } = await supabase.from('beats').delete().eq('id', id);
      if (error) throw error;
      setBeats(prev => prev.filter(b => b.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete beat.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
    >
      <div className="relative bg-[#18181b] rounded-[16px] w-full max-w-[480px] mx-[16px] shadow-2xl">
        <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[16px]" />

        {/* Header */}
        <div className="px-[32px] pt-[32px] pb-[20px] border-b border-[#27272a]">
          <div className="flex items-center justify-between">
            {/* Tab switcher */}
            <div className="flex items-center gap-[4px] bg-[#27272a] rounded-[8px] p-[4px] relative">
              <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <button
                type="button"
                onClick={() => { setView('save'); setError(null); setSuccessMessage(null); }}
                className={`px-[14px] py-[6px] rounded-[6px] text-[14px] font-['Geist:Medium',sans-serif] font-medium transition-colors cursor-pointer ${
                  view === 'save'
                    ? 'bg-[#8200db] text-[#f8fafc]'
                    : 'text-[#71717a] hover:text-[#f1f5f9]'
                }`}
              >
                Save Beat
              </button>
              <button
                type="button"
                onClick={() => { setView('load'); setError(null); setSuccessMessage(null); }}
                className={`px-[14px] py-[6px] rounded-[6px] text-[14px] font-['Geist:Medium',sans-serif] font-medium transition-colors cursor-pointer ${
                  view === 'load'
                    ? 'bg-[#8200db] text-[#f8fafc]'
                    : 'text-[#71717a] hover:text-[#f1f5f9]'
                }`}
              >
                My Beats
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-[#71717a] hover:text-[#f1f5f9] transition-colors cursor-pointer p-[4px] rounded-[6px] hover:bg-[#27272a]"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-[32px] py-[28px]">

          {/* Error / Success */}
          {error && (
            <div className="mb-[16px] bg-[#3f0000] border border-[#7f0000] rounded-[8px] px-[14px] py-[10px] text-[#fca5a5] text-[13px] font-['Inter:Regular',sans-serif]">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-[16px] bg-[#052e16] border border-[#14532d] rounded-[8px] px-[14px] py-[10px] text-[#86efac] text-[13px] font-['Inter:Regular',sans-serif]">
              {successMessage}
            </div>
          )}

          {/* Save view */}
          {view === 'save' && (
            <form onSubmit={handleSave} className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[6px]">
                <label className="text-[#a1a1aa] text-[13px] font-['Inter:Medium',sans-serif] font-medium">
                  Beat name
                </label>
                <div className="relative">
                  <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <input
                    type="text"
                    value={beatName}
                    onChange={e => setBeatName(e.target.value)}
                    placeholder="My awesome beat"
                    required
                    disabled={loading}
                    autoFocus
                    className="w-full bg-[#27272a] text-[#f1f5f9] text-[15px] px-[14px] py-[10px] rounded-[8px] outline-none placeholder-[#52525b] font-['Inter:Regular',sans-serif] disabled:opacity-50"
                  />
                </div>
                <p className="text-[#52525b] text-[12px] font-['Inter:Regular',sans-serif]">
                  Tempo: {tempo} BPM
                </p>
              </div>
              <button
                type="submit"
                disabled={loading || !beatName.trim()}
                className="relative w-full bg-[#8200db] text-[#f8fafc] font-['Geist:Medium',sans-serif] font-medium text-[15px] py-[11px] rounded-[8px] hover:bg-[#9200f5] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div aria-hidden="true" className="absolute border border-[#ad46ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
                {loading ? (
                  <span className="flex items-center justify-center gap-[8px]">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Saving…
                  </span>
                ) : 'Save Beat'}
              </button>
            </form>
          )}

          {/* Load view */}
          {view === 'load' && (
            <div>
              {fetchLoading ? (
                <div className="flex items-center justify-center py-[40px]">
                  <svg className="animate-spin text-[#8200db]" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              ) : beats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[40px] gap-[8px]">
                  <svg width="40" height="40" viewBox="0 0 28 28" fill="none" opacity="0.3">
                    <rect x="1" y="10" width="3" height="8" rx="1.5" fill="#8200db"/>
                    <rect x="6" y="6" width="3" height="16" rx="1.5" fill="#ad46ff"/>
                    <rect x="11" y="2" width="3" height="24" rx="1.5" fill="#8200db"/>
                    <rect x="16" y="6" width="3" height="16" rx="1.5" fill="#ad46ff"/>
                    <rect x="21" y="10" width="3" height="8" rx="1.5" fill="#8200db"/>
                  </svg>
                  <p className="text-[#52525b] text-[14px] font-['Inter:Regular',sans-serif]">No saved beats yet</p>
                  <button
                    type="button"
                    onClick={() => setView('save')}
                    className="text-[#ad46ff] text-[14px] font-['Inter:Medium',sans-serif] font-medium hover:text-[#c566ff] transition-colors cursor-pointer"
                  >
                    Save your first beat
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-[8px] max-h-[320px] overflow-y-auto pr-[4px]">
                  {beats.map(beat => (
                    <div
                      key={beat.id}
                      className="relative flex items-center justify-between bg-[#27272a] rounded-[10px] px-[16px] py-[12px] gap-[12px]"
                    >
                      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[10px]" />
                      <div className="flex flex-col gap-[2px] min-w-0">
                        <p className="text-[#f1f5f9] text-[15px] font-['Geist:Medium',sans-serif] font-medium truncate">
                          {beat.name}
                        </p>
                        <p className="text-[#52525b] text-[12px] font-['Inter:Regular',sans-serif]">
                          {beat.tempo} BPM · {formatDate(beat.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-[8px] shrink-0">
                        <button
                          type="button"
                          onClick={() => handleLoad(beat)}
                          className="px-[14px] py-[6px] rounded-[6px] bg-[#8200db] text-[#f8fafc] text-[13px] font-['Geist:Medium',sans-serif] font-medium hover:bg-[#9200f5] transition-colors cursor-pointer relative"
                        >
                          <div aria-hidden="true" className="absolute border border-[#ad46ff] border-solid inset-0 pointer-events-none rounded-[6px]" />
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(beat.id, beat.name)}
                          disabled={deletingId === beat.id}
                          className="p-[6px] rounded-[6px] text-[#71717a] hover:text-[#fca5a5] hover:bg-[#3f0000] transition-colors cursor-pointer disabled:opacity-40"
                          aria-label={`Delete ${beat.name}`}
                        >
                          {deletingId === beat.id ? (
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
