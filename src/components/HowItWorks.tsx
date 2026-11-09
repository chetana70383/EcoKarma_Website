import React from 'react';
import { 
  Camera, 
  Cpu, 
  Award, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FileCheck,
  Leaf
} from 'lucide-react';

interface HowItWorksProps {
  onOpenCreateModal: () => void;
  onNavigateTab: (tab: 'feed' | 'badges' | 'leaderboard' | 'impact' | 'about') => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onOpenCreateModal,
  onNavigateTab,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Do Real Green Deeds',
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      tag: 'Everyday Actions',
      description: 'Engage in verified eco actions: plant trees, commute by bike, compost food waste, clean local waterways, or switch to clean solar energy.',
      highlight: '8 Supported Action Categories',
    },
    {
      step: '02',
      title: 'Multimodal AI Evaluation',
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
      tag: 'Powered by Gemini AI',
      description: 'Upload your photo and action log. Gemini analyzes the visual proof, verifies authenticity, and runs rigorous carbon reduction and water conservation formulas.',
      highlight: 'Calculates Exact kg CO2 Saved',
    },
    {
      step: '03',
      title: 'Earn EcoPoints & Unlock Badges',
      icon: <Award className="w-6 h-6 text-amber-500" />,
      tag: 'Eco Gamification',
      description: 'Receive instant points (30 to 500 per deed), personalized eco-science tips from AI, and unlock tiered badges from Common to Epic in the Honors Hall.',
      highlight: 'Level Up Your Eco Status',
    },
    {
      step: '04',
      title: 'Crown Best Environmentalist',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      tag: 'Supreme Honor',
      description: 'Accumulate 1,000+ EcoPoints to unlock the legendary Best Environmentalist badge, top the community leaderboard, and generate an official printable certificate.',
      highlight: 'Official Verifiable Credential',
    },
  ];

  return (
    <section className="py-12 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The EcoKarma Science & Verification Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How EcoKarma Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A simple, transparent four-step cycle that turns individual daily micro-actions into tangible planetary impact.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group hover:border-emerald-500/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 font-mono">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Science & Algorithm Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-emerald-700/40">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Rigorous Environmental Metrics
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Powered by Real Carbon Absorption & Conservation Science
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Every EcoAction is computed against standardized EPA and Forestry metrics: each mature oak absorbs ~22 kg CO2 per year, each 10 km cycled offsets ~2.5 kg compared to average cars, and household graywater recycling conserves up to 200 liters daily.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenCreateModal}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs shadow-md transition-all whitespace-nowrap"
            >
              Post an Action Now
            </button>
            <button
              onClick={() => onNavigateTab('badges')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-500/40 text-emerald-200 font-bold text-xs transition-all whitespace-nowrap"
            >
              View Badge Requirements
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
