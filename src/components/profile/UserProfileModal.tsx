import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Flame,
  BookOpen,
  CheckCircle2,
  Trash2,
  LogOut,
  Cloud,
  Check,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Copy,
  Edit3,
  Save,
  ShieldAlert,
  Info
} from 'lucide-react';
import { getAuthDiagnostics } from '../../lib/firebase';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const {
    stats,
    resetAllData,
    user,
    isAuthLoading,
    authError,
    clearAuthError,
    signInWithGoogle,
    signOut,
    isSyncing,
    lastSyncedAt,
    isDark,
    guestName,
    updateGuestName
  } = useApp();

  const [signingIn, setSigningIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(guestName || 'Ramesh');

  if (!isOpen) return null;

  const authDiag = getAuthDiagnostics();
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  const currentLevelXp = (stats.level - 1) * 150;
  const nextLevelXp = stats.level * 150;
  const levelProgress = Math.min(
    100,
    Math.round(((stats.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  const getRankName = (lvl: number) => {
    if (lvl >= 10) return 'Tense Master';
    if (lvl >= 7) return 'Grammar Scholar';
    if (lvl >= 4) return 'Tense Explorer';
    if (lvl >= 2) return 'Grammar Apprentice';
    return 'Tense Beginner';
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    clearAuthError();
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const error = err as Error;
      setLocalError(error.message || 'Google sign-in could not be completed.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress, XP, and streak? This will sync to your profile.')) {
      resetAllData();
      onClose();
    }
  };

  const handleCopyDomain = async () => {
    try {
      await navigator.clipboard.writeText(authDiag.hostname);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2500);
    } catch {
      // Fallback
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2500);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateGuestName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  const displayName = user?.displayName || guestName || 'Ramesh';
  const email = user?.email || 'Active Local Profile';
  const photoURL = user?.photoURL;
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'R';

  const displayedError = localError || authError;
  const isDomainError =
    displayedError &&
    (displayedError.includes('unauthorized-domain') ||
      displayedError.includes('not authorized') ||
      displayedError.includes('Authorized domains'));
  const isPopupBlocked =
    displayedError && (displayedError.includes('popup') || displayedError.includes('blocked'));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto transition-colors duration-150 ${
          isDark
            ? 'bg-[#0E0E10] border-zinc-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between sticky top-0 z-10 transition-colors ${
            isDark ? 'bg-[#0E0E10] border-zinc-800' : 'bg-white border-slate-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-base font-serif italic font-bold">
              Account &amp; Learning Profile
            </h3>
            {user && (
              <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className={`min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 rounded-xl transition-colors ${
              isDark
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Error Banner & Dedicated Firebase Domain Assistant */}
          {displayedError && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{displayedError}</p>
                  <button
                    onClick={() => {
                      setLocalError(null);
                      clearAuthError();
                    }}
                    className="mt-1.5 text-[11px] font-mono underline hover:text-rose-300 block"
                  >
                    Dismiss notification
                  </button>
                </div>
              </div>

              {/* Specific Guided Solution for Firebase Unauthorized Domain */}
              {isDomainError && (
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-3 animate-in fade-in duration-200 ${
                    isDark
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-500">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Authorize this Domain in Firebase Console</span>
                  </div>
                  <p className="leading-relaxed opacity-90">
                    Firebase blocks OAuth popups until the hosting domain is added to your project's
                    authorized domains list.
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono font-bold opacity-80">
                      Current App Domain to Authorize:
                    </span>
                    <div
                      className={`flex items-center gap-2 p-2 rounded-xl border font-mono text-[11px] break-all ${
                        isDark
                          ? 'bg-zinc-950/80 border-amber-500/30 text-emerald-400'
                          : 'bg-white border-amber-300 text-emerald-700'
                      }`}
                    >
                      <span className="flex-1 select-all">{authDiag.hostname}</span>
                      <button
                        onClick={handleCopyDomain}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold text-[11px] flex items-center gap-1 shrink-0 transition-colors"
                      >
                        {copiedDomain ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={authDiag.consoleSettingsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <span>Open Firebase Console</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={handleOpenInNewTab}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold text-xs transition-colors ${
                        isDark
                          ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-200'
                          : 'border-slate-300 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <span>Open App in New Tab</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* 3 Step Guide */}
                  <ol className="list-decimal list-inside space-y-1 text-[11px] opacity-80 pt-1 font-mono">
                    <li>Click <strong>Copy</strong> above to copy this app domain.</li>
                    <li>Click <strong>Open Firebase Console</strong> and scroll to <em>Authorized domains</em>.</li>
                    <li>Click <em>Add domain</em>, paste the copied domain, and click <strong>Save</strong>.</li>
                  </ol>
                </div>
              )}

              {/* Specific Solution for Popup Blocked in Iframe */}
              {isPopupBlocked && (
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                    isDark
                      ? 'bg-sky-950/20 border-sky-500/30 text-sky-200'
                      : 'bg-sky-50 border-sky-200 text-sky-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-sky-400">
                    <Info className="w-4 h-4" />
                    <span>Popup Blocked by Browser or Iframe</span>
                  </div>
                  <p className="leading-relaxed opacity-90">
                    Your browser has restricted opening new popups from the embedded preview window.
                    Opening the app in a standalone tab allows Google sign-in to open directly.
                  </p>
                  <button
                    onClick={handleOpenInNewTab}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <span>Open in Standalone Tab to Sign In</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* User Account Card with Editable Learner Name */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-4">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-serif italic text-xl font-bold flex items-center justify-center shadow-xs">
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {isEditingName && !user ? (
                    <form onSubmit={handleSaveName} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Enter your name"
                        className={`text-sm font-semibold px-2 py-0.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                          isDark
                            ? 'bg-zinc-800 border-zinc-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="p-1 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400"
                        title="Save name"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingName(false)}
                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <>
                      <h4 className="text-base font-serif italic font-bold truncate">
                        {displayName}
                      </h4>
                      {!user && (
                        <button
                          onClick={() => {
                            setNameInput(displayName);
                            setIsEditingName(true);
                          }}
                          className={`p-1 rounded-md transition-colors ${
                            isDark
                              ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                              : 'text-slate-400 hover:text-slate-800 hover:bg-slate-200'
                          }`}
                          title="Edit learner profile name"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
                    Lv.{stats.level}
                  </span>
                </div>
                <p
                  className={`text-xs font-mono truncate mt-0.5 ${
                    isDark ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  {email}
                </p>
                <p className="text-[11px] font-mono text-emerald-500 font-semibold mt-0.5">
                  Rank: {getRankName(stats.level)}
                </p>
              </div>
            </div>

            {/* Cloud Sync Status */}
            <div
              className={`mt-3 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                isDark ? 'border-zinc-800/80 text-zinc-400' : 'border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Cloud className={`w-3.5 h-3.5 ${user ? 'text-emerald-500' : 'text-zinc-500'}`} />
                <span>
                  {user
                    ? isSyncing
                      ? 'Syncing to cloud...'
                      : lastSyncedAt
                        ? `Synced to Firebase (${lastSyncedAt})`
                        : 'Connected to Firebase'
                    : 'Active local session (all XP, mistakes & quizzes saved)'}
                </span>
              </div>
              {isSyncing && <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />}
            </div>
          </div>

          {/* Authentication Action Section */}
          {!user ? (
            <div
              className={`p-4 rounded-2xl border text-center space-y-3 ${
                isDark
                  ? 'bg-gradient-to-b from-emerald-950/20 to-zinc-900/40 border-emerald-900/30'
                  : 'bg-emerald-50/50 border-emerald-200/80'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-500">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cloud Multi-Device Backup</span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-zinc-300' : 'text-slate-600'
                }`}
              >
                Sign in with Google to automatically back up your XP, 12-tense completion, daily streak, and mistake notebook across any browser.
              </p>

              {/* Google Sign-in Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={signingIn || isAuthLoading}
                className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all duration-150 shadow-sm ${
                  isDark
                    ? 'bg-white hover:bg-zinc-100 text-zinc-900 border-zinc-200 hover:scale-[1.01]'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 hover:scale-[1.01]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {signingIn || isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>Signing in with Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.98 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Preview Iframe Helper */}
              {isInIframe && (
                <div
                  className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                    isDark ? 'border-zinc-800/80 text-zinc-400' : 'border-emerald-200/60 text-slate-500'
                  }`}
                >
                  <span>Running in AI Studio Preview?</span>
                  <button
                    type="button"
                    onClick={handleOpenInNewTab}
                    className="flex items-center gap-1 font-semibold text-emerald-500 hover:text-emerald-400 hover:underline"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between pt-1">
              <span
                className={`text-xs font-mono flex items-center gap-1.5 ${
                  isDark ? 'text-zinc-400' : 'text-slate-500'
                }`}
              >
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Session active</span>
              </span>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className={`flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                  isDark
                    ? 'border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
                    : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {signingOut ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* XP Progress Bar */}
          <div
            className={`space-y-1.5 p-4 rounded-2xl border ${
              isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className={isDark ? 'text-zinc-400' : 'text-slate-600'}>
                Level {stats.level} Progress
              </span>
              <span className="text-emerald-500">{stats.xp} / {nextLevelXp} XP</span>
            </div>
            <div
              className={`w-full h-2 rounded-full overflow-hidden ${
                isDark ? 'bg-zinc-800' : 'bg-slate-200'
              }`}
            >
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <span
              className={`text-[10px] block pt-1 font-mono ${
                isDark ? 'text-zinc-500' : 'text-slate-400'
              }`}
            >
              Earn XP by completing lessons, answering practice questions, and taking quizzes!
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto mb-1" />
              <span className="text-sm font-serif italic font-bold block">
                {stats.streakDays} Days
              </span>
              <span
                className={`text-[9px] uppercase font-mono font-bold ${
                  isDark ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
                Streak
              </span>
            </div>

            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="text-sm font-serif italic font-bold block">
                {stats.completedLessons.length} / 12
              </span>
              <span
                className={`text-[9px] uppercase font-mono font-bold ${
                  isDark ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
                Lessons
              </span>
            </div>

            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50 border-teal-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-teal-500 mx-auto mb-1" />
              <span className="text-sm font-serif italic font-bold block">
                {stats.totalAnswered > 0
                  ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                  : 100}
                %
              </span>
              <span
                className={`text-[9px] uppercase font-mono font-bold ${
                  isDark ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
                Accuracy
              </span>
            </div>
          </div>

          {/* Reset Action */}
          <div
            className={`pt-3 border-t flex justify-between items-center ${
              isDark ? 'border-zinc-800' : 'border-slate-200'
            }`}
          >
            <span
              className={`text-xs font-mono ${
                isDark ? 'text-zinc-500' : 'text-slate-400'
              }`}
            >
              Want to start fresh?
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-500 hover:text-rose-600 hover:underline transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
