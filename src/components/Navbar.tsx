import React, { useState } from 'react';
import { 
  Leaf, 
  Award, 
  Trophy, 
  BarChart3, 
  Plus, 
  Sparkles, 
  Home, 
  HelpCircle, 
  Menu, 
  X, 
  FileCheck 
} from 'lucide-react';
import { UserProfile } from '../types';

export type WebsiteTab = 'home' | 'feed' | 'badges' | 'leaderboard' | 'impact' | 'about';

interface NavbarProps {
  activeTab: WebsiteTab;
  setActiveTab: (tab: WebsiteTab) => void;
  user: UserProfile;
  onOpenCreateModal: () => void;
  onOpenCertificateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenCreateModal,
  onOpenCertificateModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: WebsiteTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-emerald-800/50 text-white shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="p-2.5 bg-gradient-to-tr from-emerald-400 via-teal-300 to-emerald-500 rounded-2xl shadow-lg text-emerald-950 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 stroke-[2.8]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-300 bg-clip-text text-transparent">
                  EcoKarma
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-700">
                  AI Verified
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 hidden sm:block font-medium">
                Turn Eco Deeds into Verified Impact
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-emerald-900/60 p-1.5 rounded-2xl border border-emerald-800/60 shadow-inner">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick('feed')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'feed'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Eco Feed</span>
            </button>

            <button
              onClick={() => handleNavClick('badges')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'badges'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Badges</span>
            </button>

            <button
              onClick={() => handleNavClick('leaderboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Leaderboard</span>
            </button>

            <button
              onClick={() => handleNavClick('impact')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'impact'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Impact</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>About & FAQ</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            
            {/* User Points & Best Environmentalist Status */}
            <div 
              onClick={() => handleNavClick('badges')}
              className="flex items-center space-x-2 bg-emerald-900/80 hover:bg-emerald-800/80 border border-emerald-700/80 px-3 py-1.5 rounded-2xl cursor-pointer transition-all shadow-sm"
              title="Click to view Badges & Progress"
            >
              <div className="flex items-center space-x-1 text-amber-300 font-black text-xs sm:text-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                <span>{user.totalPoints} pts</span>
              </div>

              {user.isBestEnvironmentalist ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCertificateModal();
                  }}
                  className="flex items-center space-x-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30 transition-colors"
                >
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span>Certificate</span>
                </button>
              ) : (
                <span className="text-[11px] text-emerald-300 hidden md:inline font-semibold">
                  Rank #{user.rank}
                </span>
              )}
            </div>

            {/* Post Action Button */}
            <button
              onClick={onOpenCreateModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-emerald-950 font-black px-4 py-2 rounded-2xl shadow-lg transition-all transform active:scale-95 text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8]" />
              <span className="hidden sm:inline">Post Eco Action</span>
              <span className="sm:hidden">Post</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 lg:hidden transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-emerald-800/60 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleNavClick('home')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl ${
                  activeTab === 'home' ? 'bg-emerald-600 text-white' : 'bg-emerald-900/50 text-emerald-200'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleNavClick('feed')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl ${
                  activeTab === 'feed' ? 'bg-emerald-600 text-white' : 'bg-emerald-900/50 text-emerald-200'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>Eco Feed</span>
              </button>

              <button
                onClick={() => handleNavClick('badges')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl ${
                  activeTab === 'badges' ? 'bg-emerald-600 text-white' : 'bg-emerald-900/50 text-emerald-200'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Badges & Honors</span>
              </button>

              <button
                onClick={() => handleNavClick('leaderboard')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl ${
                  activeTab === 'leaderboard' ? 'bg-emerald-600 text-white' : 'bg-emerald-900/50 text-emerald-200'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Leaderboard</span>
              </button>

              <button
                onClick={() => handleNavClick('impact')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl ${
                  activeTab === 'impact' ? 'bg-emerald-600 text-white' : 'bg-emerald-900/50 text-emerald-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Impact Analytics</span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`flex items-center space-x-2 p-2.5 rounded-xl ${
                  activeTab === 'about' ? 'bg-emerald-600 text-white' : 'bg-emerald-900/50 text-emerald-200'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>About & FAQ</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
