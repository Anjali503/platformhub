import React, { useState } from 'react';
import { isValidEmail } from '../utils';

interface FooterProps {
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onAddToast, onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      onAddToast('Please enter an email address.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      onAddToast('Please enter a valid email address.', 'error');
      return;
    }
    onAddToast(`Subscribed successfully: ${email}!`, 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-[#070b14] border-t border-slate-800/60 pt-16 pb-8 text-slate-300 overflow-hidden z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="font-sans font-extrabold text-xl bg-gradient-to-r from-blue-400 to-[#9b5bff] bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            PlatformHub
          </a>
          <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed max-w-sm">
            The world's most intelligent opportunity discovery platform matching students, developers, and early-career learners with high-impact internships, hackathons, and scholarships.
          </p>
          
          <div className="mt-6 flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">𝕏</a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#9b5bff] hover:border-[#9b5bff]/30 transition-all">in</a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00d4b4] hover:border-[#00d4b4]/30 transition-all">🐙</a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all">📸</a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h5 className="font-sans font-semibold text-xs text-slate-100 uppercase tracking-widest mb-4">Product</h5>
          <ul className="flex flex-col gap-2.5 text-sm font-light">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('opportunities'); }} className="hover:text-blue-400 transition-colors">Opportunities Feed</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('recommendations'); }} className="hover:text-[#9b5bff] transition-colors">AI Engine Matching</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tracker'); }} className="hover:text-emerald-400 transition-colors">Kanban Tracker</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }} className="hover:text-amber-400 transition-colors">Pricing Plans</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h5 className="font-sans font-semibold text-xs text-slate-100 uppercase tracking-widest mb-4">Company</h5>
          <ul className="flex flex-col gap-2.5 text-sm font-light">
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Daily Blog</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Success Stories</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-blue-400 transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h5 className="font-sans font-semibold text-xs text-slate-100 uppercase tracking-widest mb-4">Stay Curated</h5>
          <p className="text-xs text-slate-400 mb-3 font-light leading-relaxed">
            Get 5 hand-picked, high-ticket roles in your inbox every Monday.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-lg py-2.5 px-3 focus:outline-none focus:border-blue-500/60 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white text-xs font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 active:translate-y-px transition-all"
            >
              Subscribe Weekly
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
        <p>© 2026 PlatformHub, Inc. All rights reserved. Smart opportunity discovery for the world.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Security Compliance</a>
        </div>
      </div>
    </footer>
  );
};
