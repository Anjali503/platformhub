import React, { useState } from 'react';
import { Check, HelpCircle, ArrowRight, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { UserProfile } from '../types';

interface PricingViewProps {
  user: UserProfile | null;
  onUpdateProfile: (p: UserProfile) => void;
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
  onNavigate: (view: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  user,
  onUpdateProfile,
  onAddToast,
  onNavigate,
}) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgradePlan = (plan: 'Free' | 'Pro' | 'Premium') => {
    if (!user) {
      onAddToast('Please sign in or register to purchase matching subscriptions.', 'error');
      onNavigate('login');
      return;
    }

    if (user.membershipPlan === plan) {
      onAddToast(`You are already subscribed to the ${plan} tier.`, 'info');
      return;
    }

    setSelectedPlan(plan);
  };

  const handleConfirmPurchase = () => {
    if (!selectedPlan || !user) return;
    
    setLoadingPlan(selectedPlan);
    onAddToast(`Initiating premium checkout sandbox for ${selectedPlan}...`, 'info');

    setTimeout(() => {
      onUpdateProfile({
        ...user,
        membershipPlan: selectedPlan as 'Free' | 'Pro' | 'Premium',
      });
      onAddToast(`Upgrade successful! Welcome to PlatformHub ${selectedPlan} tier.`, 'success');
      setLoadingPlan(null);
      setSelectedPlan(null);
      onNavigate('dashboard');
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] text-[#f0f2ff]">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Pricing Matrix</span>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2">
          Invest in Your Career Acceleration
        </h1>
        <p className="mt-2 text-slate-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Unlock infinite AI alignment analysis queries, priority alerts, resume optimizations, and 1-on-1 career coaching.
        </p>
      </div>

      {/* PLANS CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-16">
        
        {/* FREE CARD */}
        <div className="p-6 bg-slate-900/15 border border-slate-850/80 rounded-2xl flex flex-col justify-between group relative">
          <div className="text-left">
            <h3 className="font-sans font-bold text-lg text-slate-100">Free Baseline</h3>
            <span className="text-xs text-slate-500 font-light block mt-1">Perfect for newcomers</span>
            
            <div className="my-6">
              <span className="font-sans font-black text-4xl text-white">$0</span>
              <span className="text-xs text-slate-500 font-light">/month</span>
            </div>

            <div className="border-t border-slate-900/60 pt-5 flex flex-col gap-3 text-xs leading-none text-slate-400">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> Browse 500+ items/month</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> 5 AI queries/week</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> Kanban Tracker basics</div>
              <div className="flex items-center gap-2 text-slate-600"><span className="w-4 text-center">✕</span> Fully automatic PDF parsers</div>
              <div className="flex items-center gap-2 text-slate-600"><span className="w-4 text-center">✕</span> Priority deadline alerts</div>
            </div>
          </div>

          <button
            onClick={() => handleUpgradePlan('Free')}
            className={`mt-8 w-full py-2.5 rounded-xl border text-xs font-bold uppercase transition ${
              user?.membershipPlan === 'Free'
                ? 'bg-slate-900 text-slate-400 border-slate-850'
                : 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            {user?.membershipPlan === 'Free' ? 'Active Tier' : 'Downgrade to Free'}
          </button>
        </div>

        {/* PRO CARD */}
        <div className="p-6 bg-[#080d1a] border border-[#9b5bff]/30 rounded-2xl flex flex-col justify-between group relative shadow-lg shadow-[#9b5bff]/5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white text-[9px] font-bold uppercase py-1 px-3 rounded-full">
            Recommended
          </div>

          <div className="text-left mt-1.5">
            <h3 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-1.5">
              Pro Search <Sparkles className="w-4 h-4 text-[#a78bfa] animate-pulse" />
            </h3>
            <span className="text-xs text-slate-500 font-light block mt-1">For focused opportunity builders</span>
            
            <div className="my-6">
              <span className="font-sans font-black text-4xl text-white">$9</span>
              <span className="text-xs text-slate-500 font-light">/month</span>
            </div>

            <div className="border-t border-slate-900 pt-5 flex flex-col gap-3 text-xs leading-none text-slate-400">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Infinite opportunity listings</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Continuous AI recommendations</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Fully automatic resume parser</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Daily custom push & mail digests</div>
              <div className="flex items-center gap-2 text-slate-600"><span className="w-4 text-center">✕</span> 1-on-1 interview training coach</div>
            </div>
          </div>

          <button
            onClick={() => handleUpgradePlan('Pro')}
            className={`mt-8 w-full py-2.5 rounded-xl text-xs font-bold uppercase transition ${
              user?.membershipPlan === 'Pro'
                ? 'bg-slate-900 text-[#a78bfa] border border-[#9b5bff]/30'
                : 'bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/20'
            }`}
          >
            {user?.membershipPlan === 'Pro' ? 'Active Tier' : 'Unlock Pro — $9/mo'}
          </button>
        </div>

        {/* PREMIUM CARD */}
        <div className="p-6 bg-slate-900/15 border border-slate-850/80 rounded-2xl flex flex-col justify-between group relative">
          <div className="text-left">
            <h3 className="font-sans font-bold text-lg text-slate-100">Enterprise Elite</h3>
            <span className="text-xs text-slate-500 font-light block mt-1">White-glove consultation help</span>
            
            <div className="my-6">
              <span className="font-sans font-black text-4xl text-white">$29</span>
              <span className="text-xs text-slate-500 font-light">/month</span>
            </div>

            <div className="border-t border-slate-900/60 pt-5 flex flex-col gap-3 text-xs leading-none text-slate-400">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> Everything in Pro included</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> 1-on-1 mock behavioral testing sessions</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> White-glove application reviews</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> Elite priority account coordinator</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00d4b4]" /> LinkedIn optimization coaching</div>
            </div>
          </div>

          <button
            onClick={() => handleUpgradePlan('Premium')}
            className={`mt-8 w-full py-2.5 rounded-xl border text-xs font-bold uppercase transition ${
              user?.membershipPlan === 'Premium'
                ? 'bg-slate-900 text-slate-400 border-slate-850'
                : 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            {user?.membershipPlan === 'Premium' ? 'Active Tier' : 'Go Premium — $29/mo'}
          </button>
        </div>

      </div>

      {/* CHECKOUT SIMULATION MODAL DIALOG */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-[#050810]/95 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-[fadeUp_0.2s_ease]">
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl max-w-sm w-full text-left relative">
            <h3 className="font-sans font-extrabold text-white text-base flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-purple-400" /> Purchase Subscription
            </h3>
            <p className="text-xs text-slate-400 font-light mt-1 mb-5">
              To keep checkouts straightforward, this is a simulated PlatformHub premium checkout.
            </p>

            <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl mb-6">
              <div className="flex justify-between font-bold text-xs">
                <span className="text-slate-300">{selectedPlan} Subscription Tier</span>
                <span className="text-white">{selectedPlan === 'Pro' ? '$9.00' : '$29.00'}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Billed periodically · Cancel anytime under profile settings</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPlan(null)}
                disabled={!!loadingPlan}
                className="flex-1 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={!!loadingPlan}
                className="flex-3 py-2 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-lg text-xs font-bold leading-none flex items-center justify-center gap-1"
              >
                {loadingPlan ? 'Authorizing...' : 'Authorize simulated payment'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
