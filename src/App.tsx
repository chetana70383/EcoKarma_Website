import React, { useState, useEffect } from 'react';
import { Navbar, WebsiteTab } from './components/Navbar';
import { WebsiteHero } from './components/WebsiteHero';
import { HowItWorks } from './components/HowItWorks';
import { AboutAndFaq } from './components/AboutAndFaq';
import { Footer } from './components/Footer';
import { ActivityCard } from './components/ActivityCard';
import { PostModal } from './components/PostModal';
import { BadgesGrid } from './components/BadgesGrid';
import { Leaderboard } from './components/Leaderboard';
import { ImpactDashboard } from './components/ImpactDashboard';
import { CertificateModal } from './components/CertificateModal';
import { INITIAL_POSTS, INITIAL_USER, INITIAL_LEADERBOARD, CATEGORIES, ALL_BADGES } from './data/mockData';
import { EcoActivity, UserProfile, LeaderboardEntry, EcoCategory } from './types';
import { 
  Filter, 
  Sparkles, 
  Award, 
  Plus, 
  Leaf, 
  CheckCircle2, 
  Trophy, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  X 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<WebsiteTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<EcoCategory | 'all'>('all');
  
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activities, setActivities] = useState<EcoActivity[]>(INITIAL_POSTS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto toast timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Handle high five (like)
  const handleHighFive = (activityId: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id === activityId) {
        const hasFived = act.userHasHighFived;
        return {
          ...act,
          highFives: hasFived ? act.highFives - 1 : act.highFives + 1,
          userHasHighFived: !hasFived,
        };
      }
      return act;
    }));
  };

  // Handle adding comment
  const handleAddComment = (activityId: string, text: string) => {
    const newComment = {
      id: `c_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text,
      createdAt: 'Just now',
    };

    setActivities(prev => prev.map(act => {
      if (act.id === activityId) {
        return {
          ...act,
          comments: [...act.comments, newComment],
        };
      }
      return act;
    }));
  };

  // Handle new activity submission
  const handleCreatePost = (newPost: EcoActivity) => {
    setActivities([newPost, ...activities]);

    // Update user stats
    const updatedPoints = user.totalPoints + newPost.pointsAwarded;
    const updatedCo2 = Number((user.totalCo2SavedKg + newPost.co2SavedKg).toFixed(1));
    const updatedWater = user.totalWaterSavedLiters + (newPost.waterSavedLiters || 0);
    const updatedTrees = user.treesPlantedCount + (newPost.category === 'tree_planting' ? (newPost.quantity || 1) : 0);

    const isNowBest = updatedPoints >= 1000 || user.isBestEnvironmentalist;

    const newUnlockedBadges = [...user.unlockedBadgeIds];
    if (isNowBest && !newUnlockedBadges.includes('badge_best_environmentalist')) {
      newUnlockedBadges.push('badge_best_environmentalist');
    }

    setUser(prev => ({
      ...prev,
      totalPoints: updatedPoints,
      totalPosts: prev.totalPosts + 1,
      totalCo2SavedKg: updatedCo2,
      totalWaterSavedLiters: updatedWater,
      treesPlantedCount: updatedTrees,
      unlockedBadgeIds: newUnlockedBadges,
      isBestEnvironmentalist: isNowBest,
      rank: isNowBest ? 1 : prev.rank,
    }));

    // Update leaderboard
    setLeaderboard(prev => {
      const updated = prev.map(entry => {
        if (entry.userId === 'user_current') {
          return {
            ...entry,
            totalPoints: updatedPoints,
            co2SavedKg: updatedCo2,
            isBestEnvironmentalist: isNowBest,
            topBadge: isNowBest ? '🏆 Best Environmentalist' : entry.topBadge,
          };
        }
        return entry;
      });
      return updated.sort((a, b) => b.totalPoints - a.totalPoints).map((item, idx) => ({ ...item, rank: idx + 1 }));
    });

    if (isNowBest && !user.isBestEnvironmentalist) {
      setToastMessage("🏆 UNBELIEVABLE! You unlocked the 👑 Best Environmentalist Badge & Official Certificate!");
      setIsCertificateModalOpen(true);
    } else {
      setToastMessage(`🌿 Action Published! Earned +${newPost.pointsAwarded} EcoPoints & saved ${newPost.co2SavedKg} kg CO2!`);
    }
  };

  // Calculate total community impact
  const totalCo2SavedCommunity = activities.reduce((acc, curr) => acc + curr.co2SavedKg, 0);

  // Filtered activity feed
  const filteredActivities = activities.filter(act => {
    if (selectedCategory === 'all') return true;
    return act.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Website Top Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenCreateModal={() => setIsPostModalOpen(true)}
        onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Floating / Top Toast Notification */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white shadow-xl border border-emerald-500/40 flex items-center justify-between animate-bounce">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-emerald-800 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= VIEW 1: WEBSITE HOME / OVERVIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            
            {/* Website Hero Section with Live Simulator & Community Stats */}
            <WebsiteHero
              user={user}
              totalActivitiesCount={activities.length}
              totalCo2SavedCommunity={totalCo2SavedCommunity}
              onOpenCreateModal={() => setIsPostModalOpen(true)}
              onNavigateTab={setActiveTab}
              onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
            />

            {/* How EcoKarma Works & Science Principles */}
            <HowItWorks
              onOpenCreateModal={() => setIsPostModalOpen(true)}
              onNavigateTab={setActiveTab}
            />

            {/* Featured Community Environmentalist of the Week */}
            <section className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-teal-500/10 border border-amber-500/30 p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Featured Best Environmentalist</span>
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Current Rank #1</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Maya Lin: Over 420 kg CO2 Offset Across 12 Community Drives
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    "EcoKarma turned our neighborhood tree planting into an infectious community celebration. Seeing Gemini AI evaluate our oak saplings and getting the Best Environmentalist Certificate inspired 15 neighbors to start biking and composting!"
                  </p>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => setActiveTab('feed')}
                      className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      <span>Read Maya's Verified Posts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                    alt="Maya Lin"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-amber-400"
                  />
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Maya Lin</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 font-bold">1,420 EcoPoints</div>
                    <div className="text-[11px] text-slate-400">7 Badges • 24 High Fives</div>
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                      Oakridge Park Drive Organizer
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Live Feed Preview Section on Home */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                    <span>Recent Community Eco Deeds</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time green actions posted and AI-verified by our worldwide eco community.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('feed')}
                  className="inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>View All Actions ({activities.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.slice(0, 2).map((act) => (
                  <ActivityCard
                    key={act.id}
                    activity={act}
                    onHighFive={handleHighFive}
                    onAddComment={handleAddComment}
                    currentUserId={user.id}
                  />
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('feed')}
                  className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  Explore Complete Eco Feed & Filter by Category →
                </button>
              </div>
            </section>

            {/* Mission, SDGs & FAQ Accordion Preview */}
            <AboutAndFaq />

          </div>
        )}

        {/* ================= VIEW 2: LIVE COMMUNITY ECO FEED ================= */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            
            {/* Feed Header Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live Community Feed</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Welcome back, <span className="text-emerald-300">{user.name}</span>!
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                    Share your daily green environmental deeds (tree planting, zero-emission commuting, recycling, water conservation), receive instant Gemini AI impact scores, and climb the leaderboard toward <span className="text-amber-300 font-bold">Best Environmentalist</span> status.
                  </p>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    onClick={() => setIsPostModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-emerald-950 font-extrabold text-sm shadow-lg transform active:scale-95 transition-all"
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                    <span>Post Your Eco Action</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Eco Actions ({activities.length})
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Feed Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredActivities.map((act) => (
                <ActivityCard
                  key={act.id}
                  activity={act}
                  onHighFive={handleHighFive}
                  onAddComment={handleAddComment}
                  currentUserId={user.id}
                />
              ))}
            </div>

          </div>
        )}

        {/* ================= VIEW 3: BADGES & HONORS HALL ================= */}
        {activeTab === 'badges' && (
          <BadgesGrid
            user={user}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
            onOpenCreateModal={() => setIsPostModalOpen(true)}
          />
        )}

        {/* ================= VIEW 4: LEADERBOARD ================= */}
        {activeTab === 'leaderboard' && (
          <Leaderboard
            entries={leaderboard}
            currentUserId={user.id}
          />
        )}

        {/* ================= VIEW 5: IMPACT ANALYTICS ================= */}
        {activeTab === 'impact' && (
          <ImpactDashboard
            user={user}
            activities={activities}
            onOpenCreateModal={() => setIsPostModalOpen(true)}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
          />
        )}

        {/* ================= VIEW 6: ABOUT & FAQ ================= */}
        {activeTab === 'about' && (
          <AboutAndFaq />
        )}

      </main>

      {/* Website Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onOpenCreateModal={() => setIsPostModalOpen(true)}
      />

      {/* Post Modal with Gemini AI Verification */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmitPost={handleCreatePost}
        userName={user.name}
        userAvatar={user.avatar}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        user={user}
      />

    </div>
  );
}
