import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Sparkles, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info' | 'ai';
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div id="toast-wrapper" className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <Toast key={t.id} t={t} removeToast={removeToast} />
      ))}
    </div>
  );
};

const Toast: React.FC<{ t: ToastMessage; removeToast: (id: string) => void }> = ({ t, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(t.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [t.id, removeToast]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
    ai: <Sparkles className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />
  };

  const bgStyles = {
    success: 'bg-slate-900/90 border-emerald-500/30 text-emerald-100 shadow-emerald-500/10',
    error: 'bg-slate-900/90 border-rose-500/30 text-rose-100 shadow-rose-500/10',
    info: 'bg-slate-900/90 border-sky-500/30 text-sky-100 shadow-sky-500/10',
    ai: 'bg-slate-900/95 border-purple-500/30 text-purple-50 shadow-purple-500/10'
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 animate-[fadeUp_0.3s_ease] ${bgStyles[t.type]}`}
    >
      {icons[t.type]}
      <div className="flex-1 text-sm font-medium">{t.text}</div>
      <button
        onClick={() => removeToast(t.id)}
        className="text-slate-400 hover:text-slate-200 transition-colors pointer-events-auto"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
