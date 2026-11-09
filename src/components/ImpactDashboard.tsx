import React from 'react';
import { UserProfile, EcoActivity } from '../types';
import { CATEGORIES } from '../data/mockData';
import { 
  BarChart3, 
  Leaf, 
  Droplets, 
  Trees, 
  Zap, 
  Trophy, 
  Flame, 
  Award,
  Sparkles,
  TrendingUp,
  Share2
} from 'lucide-react';

interface ImpactDashboardProps {
  user: UserProfile;
  activities: EcoActivity[];
  onOpenCreateModal: () => void;
  onOpenCertificateModal: () => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({
  user,
  activities,
  onOpenCreateModal,
  onOpenCertificateModal,
}) => {
  const userActivities = activities.filter(a => a.userId === user.id || a.userId === 'user_current');

  // Category point breakdown
  const categoryStats = CATEGORIES.map(cat => {
    const catActs = userActivities.filter(a => a.category === cat.id);
    const pts = catActs.reduce((sum, a) => sum + a.pointsAwarded, 0);
    const co2 = catActs.reduce((sum, a) => sum + a.co2SavedKg, 0);
    return {
      category: cat,
      count: catActs.length,
      points: pts,
      co2Kg: Number(co2.toFixed(1)),
    };
  });

  const carKmEquivalent = Math.round(user.totalCo2SavedKg * 5.2);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <BarChart3 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>Personal Eco Impact Analytics</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real environmental metrics calculated from your verified activities.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {user.isBestEnvironmentalist ? (
            <button
              onClick={onOpenCertificateModal}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs shadow-md transition-all"
            >
              <Trophy className="w-4 h-4" />
              <span>Best Environmentalist Certificate</span>
            </button>
          ) : (
            <button
              onClick={onOpenCreateModal}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Log Eco Action</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Impact Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total EcoPoints */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total EcoPoints</span>
            <Sparkles className="w-5 h-5 fill-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {user.totalPoints}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Rank #{user.rank} on Community Leaderboard
          </p>
        </div>

        {/* CO2 Saved */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">CO2 Offset</span>
            <Leaf className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {user.totalCo2SavedKg} <span className="text-lg font-normal text-slate-500">kg</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            ≈ {carKmEquivalent} km of gas car emissions prevented
          </p>
        </div>

        {/* Trees Planted */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-transparent border border-teal-500/30">
          <div className="flex items-center justify-between text-teal-600 dark:text-teal-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Trees & Flora</span>
            <Trees className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {user.treesPlantedCount} <span className="text-lg font-normal text-slate-500">planted</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Forest Guardian Status Active
          </p>
        </div>

        {/* Water Saved */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/30">
          <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Water Conserved</span>
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {user.totalWaterSavedLiters} <span className="text-lg font-normal text-slate-500">Liters</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            ≈ 4 full bathtub volumes saved
          </p>
        </div>

      </div>

      {/* Category Breakdown & Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Impact List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-between">
            <span>Environmental Action Breakdown</span>
            <span className="text-xs font-normal text-slate-400">{user.totalPosts} Total Verified Posts</span>
          </h3>

          <div className="space-y-4">
            {categoryStats.map(({ category, count, points, co2Kg }) => (
              <div key={category.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-slate-800 dark:text-slate-200">{category.name}</span>
                    {count > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        {count} posts
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-500">{co2Kg} kg CO2</span>
                    <span className="font-bold text-amber-500">+{points} pts</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((points / 500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Streak & Best Environmentalist Status */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
                <Flame className="w-6 h-6 fill-amber-400" />
              </div>
              <div>
                <span className="text-xs text-emerald-200 uppercase tracking-wider font-bold">Eco Habit Streak</span>
                <h4 className="text-xl font-bold">7 Days Active!</h4>
              </div>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Posting at least 1 eco activity every week maintains your streak bonus and doubles your chance to earn the Best Environmentalist crown.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Next Badge Milestone</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              You need <span className="font-bold text-emerald-600 dark:text-emerald-400">280 more EcoPoints</span> to reach 1,000 pts and unlock the 👑 <span className="font-semibold text-amber-600">Best Environmentalist</span> badge!
            </p>
            <button
              onClick={onOpenCreateModal}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-colors"
            >
              Post Action Now (+150 pts avg)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
