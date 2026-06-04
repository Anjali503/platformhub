import React, { useState } from 'react';
import { Mail, HelpCircle, Building, Briefcase, Send, Check } from 'lucide-react';
import { isValidEmail } from '../utils';

interface ContactViewProps {
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onAddToast }) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!first.trim()) {
      onAddToast('Please enter your first name.', 'error');
      return;
    }
    if (!email.trim()) {
      onAddToast('Please enter your email address.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      onAddToast('Please enter a valid email address.', 'error');
      return;
    }
    if (!message.trim()) {
      onAddToast('Please enter your message.', 'error');
      return;
    }

    setSent(true);
    onAddToast(`Filing query coordinates to our team. Please wait...`, 'info');

    setTimeout(() => {
      onAddToast(`✓ Message Filed successfully! Thank you, ${first}. We will email you at ${email} shortly.`, 'success');
      setFirst('');
      setLast('');
      setEmail('');
      setTopic('');
      setMessage('');
      setSent(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] text-[#f0f2ff]">
      
      {/* HEADER */}
      <div className="text-left mb-12">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Connect with Us</span>
        <h1 className="font-sans font-extrabold text-3xl text-white tracking-tight mt-1">Get in Touch</h1>
        <p className="text-sm text-slate-400 mt-1.5 font-light max-w-xl">
          Whether you are a developer seeking placement, a company team looking to catalog slots, or a partner - we are here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left items-start">
        
        {/* DIRECT CHANNELS CARD */}
        <div className="flex flex-col gap-6">
          <div className="p-6 bg-slate-900/15 border border-slate-850/80 rounded-2xl">
            <h3 className="font-sans font-extrabold text-white text-base mb-2">Support Channels</h3>
            <p className="text-xs text-slate-400 font-light mb-6">Receive direct support assistance from our core technical team.</p>

            <div className="flex flex-col gap-5 text-xs">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-300">📧</div>
                <div>
                  <h4 className="font-bold text-slate-200">hello@platformhub.app</h4>
                  <span className="text-slate-500 font-light mt-0.5 block">General inquiries, feedback, and support</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-300">🤝</div>
                <div>
                  <h4 className="font-bold text-slate-200">partners@platformhub.app</h4>
                  <span className="text-slate-500 font-light mt-0.5 block">Sponsor catalogs, partner APIs, or hackathons</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-300">💼</div>
                <div>
                  <h4 className="font-bold text-slate-200">careers@platformhub.app</h4>
                  <span className="text-slate-500 font-light mt-0.5 block">Join our engineering and AI research labs</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-300">📍</div>
                <div>
                  <h4 className="font-bold text-slate-200">San Francisco, CA</h4>
                  <span className="text-slate-500 font-light mt-0.5 block">Headquarters · Remote First Globally</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT SUBMISSION FORM CARD */}
        <div className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyan"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nair"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Email Coordinates *</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Contact Topic *</label>
              <select
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-500 outline-none"
              >
                <option value="">Select a subject option...</option>
                <option value="General">General Inquiry</option>
                <option value="Listing">Partner / List an Opportunity</option>
                <option value="Technical">Technical account support</option>
                <option value="Investor">Investor Relations</option>
                <option value="Press">Press & Media</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Your detailed message *</label>
              <textarea
                rows={4}
                required
                placeholder="Insert details about your questions, partnership scopes, or listed slots..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none resize-none font-light leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className={`w-full py-3 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:-translate-y-px transition-all flex items-center justify-center gap-2 ${sent ? 'opacity-80' : ''}`}
            >
              {sent ? (
                <>Simulating Submit...</>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Send Message
                </>
              )}
            </button>

          </form>
        </div>

      </div>

    </div>
  );
};
