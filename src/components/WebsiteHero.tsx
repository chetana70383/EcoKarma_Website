import React, { useState } from 'react';
import { 
  Leaf, 
  Sparkles, 
  Plus, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Droplets, 
  Trees, 
  Globe2, 
  Calculator,
  CheckCircle2,
  Users
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { EcoCategory, UserProfile } from '../types';

interface WebsiteHeroProps {
  user: UserProfile;
  totalActivitiesCount: number;
  totalCo2SavedCommunity: number;
  onOpenCreateModal: () => void;
  onNavigateTab: (tab: 'feed' | 'badges' | 'leaderboard' | 'impact' | 'about') => void;
  onOpenCertificateModal: () => void;
}

export const WebsiteHero: React.FC<WebsiteHeroProps> = ({
  user,
  totalActivitiesCount,
  totalCo2SavedCommunity,
  onOpenCreateModal,
  onNavigateTab,
  onOpenCertificateModal,
}) => {
  // Interactive Quick Impact Calculator State
  const [calcCategory, setCalcCategory] = useState<EcoCategory>('tree_planting');
  const [calcQuantity, setCalcQuantity] = useState<number>(3);

  const selectedCatInfo = CATEGORIES.find(c => c.id === calcCategory) || CATEGORIES[0];

  // Real-time calculated estimates
  const estPoints = Math.round(selectedCatInfo.basePoints * (1 + Math.min(calcQuantity, 10) * 0.25));
  const estCo2 = Number((calcQuantity * (
    calcCategory === 'tree_planting' ? 22 :
    calcCategory === 'cycling_transit' ? 2.5 :
    calcCategory === 'beach_ocean_cleanup' ? 3.0 :
    calcCategory === 'waste_recycling' ? 1.5 :
    calcCategory === 'energy_saving' ? 0.8 :
    calcCategory === 'water_conservation' ? 0.2 :
    calcCategory === 'plant_based_meal' ? 2.0 : 1.8
  )).toFixed(1));
  const estWater = calcCategory === 'water_conservation' ? calcQuantity * 50 : 0;

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pb-16">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="space-y-12">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI-Verified Green Actions & Environmental Rewards</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Turn Everyday Green Deeds into <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">Verified Planet Impact</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">EcoKarma</strong>. Post your real-world eco actions—tree planting, green commuting, recycling, cleanups—get evaluated by Gemini AI, earn points, unlock honor badges, and compete for the prestigious <span className="text-amber-600 dark:text-amber-300 font-bold">Best Environmentalist</span> title.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenCreateModal}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-base shadow-xl shadow-emerald-600/25 transform active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Post Your Eco Action</span>
            </button>

            <button
              onClick={() => onNavigateTab('feed')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-base shadow-md transition-all"
            >
              <span>Explore Community Feed</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </button>

            {user.isBestEnvironmentalist ? (
              <button
                onClick={onOpenCertificateModal}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-base shadow-lg transition-all"
              >
                <Trophy className="w-5 h-5" />
                <span>View My Official Certificate</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigateTab('leaderboard')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-sm hover:bg-emerald-100/70 transition-all"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>View Leaderboard</span>
              </button>
            )}
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Gemini 3.6 Flash Multimodal Verification</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Peer High-Fives & Cheering</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Verifiable Eco Credentials</span>
            </div>
          </div>
        </div>

        {/* Global Impact Live Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Leaf className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">Total CO2 Prevented</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {Math.round(totalCo2SavedCommunity + 1240).toLocaleString()} <span className="text-sm font-semibold text-slate-500">kg</span>
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Trees className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">Flora & Trees Planted</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                384+ <span className="text-sm font-semibold text-slate-500">trees</span>
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">Water Conserved</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                18,450 <span className="text-sm font-semibold text-slate-500">liters</span>
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">Verified Eco Deeds</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {totalActivitiesCount + 142}+ <span className="text-sm font-semibold text-slate-500">actions</span>
              </span>
            </div>
          </div>

        </div>

        {/* Interactive EcoKarma Quick Impact Calculator Widget */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 border border-emerald-800/60 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/50 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Calculator className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">Interactive EcoKarma Impact Estimator</h3>
                  <p className="text-xs text-emerald-200/80">Calculate how much CO2, water, and EcoPoints your next green action will generate!</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Live Formula Simulator
              </span>
            </div>

            {/* Category Select row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCalcCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    calcCategory === cat.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-bold'
                      : 'bg-emerald-900/40 border-emerald-800/60 text-emerald-200 hover:bg-emerald-900/70'
                  }`}
                >
                  <div className="text-xl mb-1">{cat.icon}</div>
                  <div className="text-xs font-medium line-clamp-1">{cat.name}</div>
                </button>
              ))}
            </div>

            {/* Input Slider */}
            <div className="bg-emerald-900/30 border border-emerald-800/40 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-emerald-200">How much are you doing?</span>
                <span className="text-amber-300 font-extrabold text-base">
                  {calcQuantity} {selectedCatInfo.defaultUnit}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="25"
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />

              <div className="flex justify-between text-[10px] text-emerald-400/80 font-mono">
                <span>1 {selectedCatInfo.defaultUnit}</span>
                <span>12 {selectedCatInfo.defaultUnit}</span>
                <span>25 {selectedCatInfo.defaultUnit}</span>
              </div>
            </div>

            {/* Output Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-900/50 border border-emerald-700/50 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Estimated EcoPoints</span>
                <span className="text-2xl font-black text-amber-300">+{estPoints} pts</span>
                <p className="text-[10px] text-emerald-200/70 mt-0.5">Toward Best Environmentalist</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/50 border border-emerald-700/50 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">CO2 Offset</span>
                <span className="text-2xl font-black text-emerald-300">{estCo2} kg</span>
                <p className="text-[10px] text-emerald-200/70 mt-0.5">≈ {(estCo2 * 5).toFixed(0)} km car driving saved</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/50 border border-emerald-700/50 text-center flex flex-col justify-center">
                <button
                  onClick={onOpenCreateModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 font-black text-xs hover:from-emerald-300 hover:to-teal-300 shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log This Action Now</span>
                </button>
                <p className="text-[10px] text-emerald-300/80 mt-1">Instant Gemini AI scoring</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
