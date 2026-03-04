import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
}

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

  // Reset state when switching modes
  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, [mode]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });
        if (error) throw error;
        setSuccessMessage('Account created! Check your email to confirm your address.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.');
      setLoading(false);
    }
  };

  const isLogin = mode === 'login';

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
    >
      <div className="relative bg-[#18181b] rounded-[16px] w-full max-w-[420px] mx-[16px] shadow-2xl">
        {/* Border overlay */}
        <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[16px]" />

        {/* Header */}
        <div className="px-[32px] pt-[32px] pb-[24px] border-b border-[#27272a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="1" y="10" width="3" height="8" rx="1.5" fill="#8200db"/>
                <rect x="6" y="6" width="3" height="16" rx="1.5" fill="#ad46ff"/>
                <rect x="11" y="2" width="3" height="24" rx="1.5" fill="#8200db"/>
                <rect x="16" y="6" width="3" height="16" rx="1.5" fill="#ad46ff"/>
                <rect x="21" y="10" width="3" height="8" rx="1.5" fill="#8200db"/>
                <rect x="26" y="12" width="3" height="4" rx="1.5" fill="#ad46ff"/>
              </svg>
              <span className="font-['Geist:Medium',sans-serif] font-medium text-[#f8fafc] text-[18px]">
                Super <span className="text-[#ad46ff]">Beats</span>
              </span>
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

          <div className="mt-[20px]">
            <h2 className="font-['Geist:Medium',sans-serif] font-medium text-[#f8fafc] text-[22px]">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-[#71717a] text-[14px] mt-[4px] font-['Inter:Regular',sans-serif]">
              {isLogin
                ? 'Log in to access your saved beats.'
                : 'Sign up and start making beats today.'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-[32px] py-[28px] flex flex-col gap-[18px]">

          {/* Error message */}
          {error && (
            <div className="bg-[#3f0000] border border-[#7f0000] rounded-[8px] px-[14px] py-[10px] text-[#fca5a5] text-[13px] font-['Inter:Regular',sans-serif]">
              {error}
            </div>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="bg-[#052e16] border border-[#14532d] rounded-[8px] px-[14px] py-[10px] text-[#86efac] text-[13px] font-['Inter:Regular',sans-serif]">
              {successMessage}
            </div>
          )}

          {/* Username — only for signup */}
          {!isLogin && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[#a1a1aa] text-[13px] font-['Inter:Medium',sans-serif] font-medium">
                Username
              </label>
              <div className="relative">
                <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="your_username"
                  required={!isLogin}
                  disabled={loading}
                  className="w-full bg-[#27272a] text-[#f1f5f9] text-[15px] px-[14px] py-[10px] rounded-[8px] outline-none placeholder-[#52525b] font-['Inter:Regular',sans-serif] focus:border-[#8200db] disabled:opacity-50"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[#a1a1aa] text-[13px] font-['Inter:Medium',sans-serif] font-medium">
              Email
            </label>
            <div className="relative">
              <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="w-full bg-[#27272a] text-[#f1f5f9] text-[15px] px-[14px] py-[10px] rounded-[8px] outline-none placeholder-[#52525b] font-['Inter:Regular',sans-serif] disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center justify-between">
              <label className="text-[#a1a1aa] text-[13px] font-['Inter:Medium',sans-serif] font-medium">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  className="text-[#ad46ff] text-[13px] font-['Inter:Medium',sans-serif] font-medium hover:text-[#c566ff] transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={loading}
                className="w-full bg-[#27272a] text-[#f1f5f9] text-[15px] px-[14px] py-[10px] pr-[44px] rounded-[8px] outline-none placeholder-[#52525b] font-['Inter:Regular',sans-serif] disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {!isLogin && (
              <p className="text-[#52525b] text-[12px] font-['Inter:Regular',sans-serif]">
                Minimum 6 characters
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full bg-[#8200db] text-[#f8fafc] font-['Geist:Medium',sans-serif] font-medium text-[15px] py-[11px] rounded-[8px] hover:bg-[#9200f5] transition-colors cursor-pointer mt-[4px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div aria-hidden="true" className="absolute border border-[#ad46ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
            {loading ? (
              <span className="flex items-center justify-center gap-[8px]">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                {isLogin ? 'Logging in…' : 'Creating account…'}
              </span>
            ) : (
              isLogin ? 'Log In' : 'Create Account'
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-[12px]">
            <div className="flex-1 h-px bg-[#27272a]" />
            <span className="text-[#52525b] text-[12px] font-['Inter:Regular',sans-serif]">or continue with</span>
            <div className="flex-1 h-px bg-[#27272a]" />
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="relative w-full flex items-center justify-center gap-[10px] bg-[#27272a] text-[#f1f5f9] font-['Geist:Medium',sans-serif] font-medium text-[15px] py-[10px] rounded-[8px] hover:bg-[#3f3f47] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Footer switch */}
        <div className="px-[32px] pb-[28px] text-center">
          <p className="text-[#71717a] text-[14px] font-['Inter:Regular',sans-serif]">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => onSwitchMode(isLogin ? 'signup' : 'login')}
              className="text-[#ad46ff] hover:text-[#c566ff] transition-colors cursor-pointer font-['Inter:Medium',sans-serif] font-medium"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
