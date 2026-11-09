import React, { useState } from 'react';
import { Leaf, Sparkles, Send, CheckCircle2, ShieldCheck, Heart, Award, Trophy, ArrowUp } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface FooterProps {
  onNavigateTab: (tab: 'home' | 'feed' | 'badges' | 'leaderboard' | 'impact' | 'about') => void;
  onOpenCreateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenCreateModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Row: Brand, Nav & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigateTab('home')}>
              <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl text-emerald-950 shadow-md">
                <Leaf className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white">
                  EcoKarma
                </span>
                <span className="block text-[11px] text-emerald-400 font-medium">
                  AI-Powered Environmental Action Platform
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering environmentalists worldwide to document green actions, receive verifiable Gemini AI impact evaluations, earn badges, and compete for the Best Environmentalist award.
            </p>

            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verifiable Scientific Carbon & Water Metrics</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Website Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('feed')} className="hover:text-emerald-400 transition-colors">
                  Live Community Feed
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('badges')} className="hover:text-emerald-400 transition-colors">
                  Badges & Honors Hall
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('leaderboard')} className="hover:text-emerald-400 transition-colors">
                  Global Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('impact')} className="hover:text-emerald-400 transition-colors">
                  Impact & Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('about')} className="hover:text-emerald-400 transition-colors">
                  About & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Eco Action Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id} className="flex items-center space-x-1.5">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Weekly Challenge */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Join the Eco Karma Movement
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly green challenges, planetary impact milestones, and tips from top environmentalists.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're subscribed to weekly EcoChallenges! 🌿</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 rounded-l-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-r-xl transition-colors shrink-0"
                    title="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">Zero spam. Pure positive climate action.</span>
              </form>
            )}

            <button
              onClick={onOpenCreateModal}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Post Your Action Today</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} EcoKarma. Built for a Greener Tomorrow.</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Low-Carbon Web Platform</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigateTab('about')}
              className="hover:text-emerald-400 transition-colors"
            >
              Privacy & Ethics
            </button>
            <button
              onClick={() => onNavigateTab('about')}
              className="hover:text-emerald-400 transition-colors"
            >
              Verification Policy
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
