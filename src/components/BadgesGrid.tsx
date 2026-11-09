import React from 'react';
import { ALL_BADGES } from '../data/mockData';
import { UserProfile, Badge } from '../types';
import { Trophy, Award, Lock, Sparkles, CheckCircle2, ChevronRight, ShieldCheck, FileCheck } from 'lucide-react';

interface BadgesGridProps {
  user: UserProfile;
  onOpenCertificateModal: () => void;
  onOpenCreateModal: () => void;
}

export const BadgesGrid: React.FC<BadgesGridProps> = ({
  user,
  onOpenCertificateModal,
  onOpenCreateModal,
}) => {
  const bestEnvironmentalistBadge = ALL_BADGES.find(b => b.isBestEnvironmentalist)!;
  const isBestUnlocked = user.totalPoints >= 1000 || user.isBestEnvironmentalist;

  const pointsProgress = Math.min(Math.round((user.totalPoints / 1000) * 100), 100);

  return (
    <div className="space-y-8">
      
      {/* Crown Banner: "Best Environmentalist" Title & Certificate */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-amber-500/30 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className={`p-4 rounded-2xl ${isBestUnlocked ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-lg shadow-amber-500/30 text-emerald-950' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
              <Trophy className="w-12 h-12 stroke-[2]" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Ultimate Eco Honor
                </span>
                <span className="text-xs text-emerald-300 font-semibold">1,000 Points Goal</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Best Environmentalist Badge
              </h2>
              <p className="text-sm text-emerald-200/80 max-w-xl mt-1 leading-relaxed">
                Post your green environmental activities, earn AI-verified points, and achieve 1,000+ points to claim the prestigious <span className="text-amber-300 font-semibold">Best Environmentalist</span> title and official certificate.
              </p>
            </div>
          </div>

          {/* Action Button & Status */}
          <div className="flex flex-col items-center sm:items-end space-y-3 w-full md:w-auto">
            {isBestUnlocked ? (
              <button
                onClick={onOpenCertificateModal}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-emerald-950 font-extrabold shadow-lg hover:from-amber-300 hover:to-yellow-300 transition-all transform active:scale-95"
              >
                <FileCheck className="w-5 h-5" />
                <span>View Official Certificate</span>
              </button>
            ) : (
              <button
                onClick={onOpenCreateModal}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Earn Points to Unlock (+{1000 - user.totalPoints} pts left)</span>
              </button>
            )}

            {/* Progress Bar */}
            <div className="w-full max-w-xs space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-medium">
                <span>Progress: {user.totalPoints} / 1000 pts</span>
                <span>{pointsProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-emerald-800/50">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${pointsProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Environmentalist Badges Showcase</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unlocked: {user.unlockedBadgeIds.length} of {ALL_BADGES.length} Badges
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
        >
          <span>Post activity to unlock</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of All Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ALL_BADGES.map((badge) => {
          const isUnlocked = user.unlockedBadgeIds.includes(badge.id) || (badge.isBestEnvironmentalist && isBestUnlocked);

          return (
            <div
              key={badge.id}
              className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                isUnlocked
                  ? 'bg-white dark:bg-slate-900 border-emerald-500/40 shadow-md hover:border-emerald-500 hover:shadow-lg'
                  : 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              {/* Badge Top Header */}
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl text-2xl ${
                  isUnlocked 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30' 
                    : 'bg-slate-200 dark:bg-slate-800 grayscale'
                }`}>
                  {badge.icon}
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    badge.rarity === 'Legendary' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30' :
                    badge.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30' :
                    badge.rarity === 'Rare' ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30' :
                    'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {badge.rarity}
                  </span>

                  {isUnlocked ? (
                    <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{badge.requiredPoints} pts</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Badge Details */}
              <div className="mt-4 space-y-1">
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {badge.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              {/* Footer Progress or Unlocked Timestamp */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                {isUnlocked ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    ✨ Earned & Active
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Requirement: {badge.requiredPoints} EcoPoints
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
