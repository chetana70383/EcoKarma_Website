import React, { useState } from 'react';
import { Trophy, Medal, Sparkles, TrendingUp, TrendingDown, Crown, ShieldCheck, Search } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  currentUserId,
}) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('allTime');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = entries.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = filteredEntries.slice(0, 3);
  const remaining = filteredEntries.slice(3);

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Trophy className="w-7 h-7 text-amber-500" />
            <span>Environmentalist Leaderboard</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Top green champions driving carbon reduction and environmental sustainability.
          </p>
        </div>

        {/* Timeframe selector & search */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search green warrior..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                timeframe === 'weekly' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                timeframe === 'monthly' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('allTime')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                timeframe === 'allTime' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              All-Time
            </button>
          </div>
        </div>
      </div>

      {/* Podium Display for Top 3 */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 pb-2 items-end max-w-3xl mx-auto">
          
          {/* Rank 2 - Silver */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <img src={top3[1].avatar} alt={top3[1].name} className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-slate-300 shadow-lg" />
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-extrabold text-xs flex items-center justify-center border border-white shadow">
                2
              </div>
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 text-center line-clamp-1 mt-1">
              {top3[1].name}
            </h3>
            <span className="text-[11px] font-bold text-slate-500">{top3[1].totalPoints} pts</span>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-20 sm:h-24 rounded-t-2xl mt-3 flex items-center justify-center border-t border-slate-300/50">
              <Medal className="w-6 h-6 text-slate-400" />
            </div>
          </div>

          {/* Rank 1 - Gold (Best Environmentalist) */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="absolute -top-6 text-amber-400 animate-bounce">
                <Crown className="w-7 h-7 fill-amber-400" />
              </div>
              <img src={top3[0].avatar} alt={top3[0].name} className="w-18 h-18 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-amber-400 shadow-xl" />
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-7 h-7 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center border border-white shadow-lg">
                1
              </div>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 text-center line-clamp-1 mt-1">
              {top3[0].name}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              👑 Best Environmentalist
            </span>
            <span className="text-xs font-extrabold text-amber-500 mt-0.5">{top3[0].totalPoints} pts</span>
            <div className="w-full bg-gradient-to-b from-amber-400/20 to-emerald-900/40 h-28 sm:h-32 rounded-t-2xl mt-3 flex items-center justify-center border-t-2 border-amber-400">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          {/* Rank 3 - Bronze */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <img src={top3[2].avatar} alt={top3[2].name} className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-amber-700/60 shadow-lg" />
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-6 h-6 rounded-full bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center border border-white shadow">
                3
              </div>
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 text-center line-clamp-1 mt-1">
              {top3[2].name}
            </h3>
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">{top3[2].totalPoints} pts</span>
            <div className="w-full bg-amber-950/20 dark:bg-slate-800 h-16 sm:h-20 rounded-t-2xl mt-3 flex items-center justify-center border-t border-amber-800/40">
              <Medal className="w-6 h-6 text-amber-700" />
            </div>
          </div>

        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4 text-center">Rank</th>
                <th className="py-3.5 px-4">Environmentalist</th>
                <th className="py-3.5 px-4 text-center">Top Title</th>
                <th className="py-3.5 px-4 text-center">CO2 Saved</th>
                <th className="py-3.5 px-4 text-right">EcoPoints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEntries.map((entry) => {
                const isCurrentUser = entry.userId === currentUserId;

                return (
                  <tr
                    key={entry.userId}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {/* Rank Number */}
                    <td className="py-4 px-4 text-center font-extrabold text-sm">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
                        entry.rank === 1 ? 'bg-amber-400 text-emerald-950 font-black' :
                        entry.rank === 2 ? 'bg-slate-300 text-slate-900 font-bold' :
                        entry.rank === 3 ? 'bg-amber-700 text-white font-bold' :
                        'text-slate-500 dark:text-slate-400'
                      }`}>
                        {entry.rank}
                      </span>
                    </td>

                    {/* Name & Avatar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={entry.avatar} alt={entry.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700" />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-slate-900 dark:text-slate-100">{entry.name}</span>
                            {isCurrentUser && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-600 text-white font-bold">You</span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{entry.badgesCount} Badges Unlocked</span>
                        </div>
                      </div>
                    </td>

                    {/* Top Title */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        entry.isBestEnvironmentalist
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        <span>{entry.topBadge}</span>
                      </span>
                    </td>

                    {/* CO2 Saved */}
                    <td className="py-4 px-4 text-center font-semibold text-emerald-700 dark:text-emerald-400">
                      {entry.co2SavedKg} kg
                    </td>

                    {/* Total Points */}
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center space-x-1 font-extrabold text-amber-600 dark:text-amber-400 text-sm">
                        <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{entry.totalPoints} pts</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
