import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Send, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { EcoActivity } from '../types';

interface ActivityCardProps {
  activity: EcoActivity;
  onHighFive: (activityId: string) => void;
  onAddComment: (activityId: string, text: string) => void;
  currentUserId: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onHighFive,
  onAddComment,
  currentUserId,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const categoryInfo = CATEGORIES.find(c => c.id === activity.category) || CATEGORIES[0];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(activity.id, commentText);
    setCommentText('');
  };

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all overflow-hidden">
      
      {/* Card Header: Author Info & Badge */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center space-x-3">
          <img
            src={activity.userAvatar}
            alt={activity.userName}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/30"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                {activity.userName}
              </h3>
              {activity.userBadgeTitle && (
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  <span>{activity.userBadgeTitle}</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{new Date(activity.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              {activity.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center space-x-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{activity.location}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Category Pill */}
        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 ${categoryInfo.bgGradient} ${categoryInfo.textColor} border border-emerald-500/20`}>
          <span>{categoryInfo.icon}</span>
          <span className="hidden sm:inline">{categoryInfo.name}</span>
        </div>
      </div>

      {/* Card Content: Title & Description */}
      <div className="p-4 sm:p-5 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {activity.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {activity.description}
        </p>

        {/* Impact Stat Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>+{activity.pointsAwarded} EcoPoints</span>
          </div>

          <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{activity.co2SavedKg} kg CO2 Saved</span>
          </div>

          {activity.waterSavedLiters ? (
            <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 font-bold text-xs">
              <span>💧 {activity.waterSavedLiters} L Water</span>
            </div>
          ) : null}

          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Score {activity.aiVerification.score}/100</span>
          </div>
        </div>
      </div>

      {/* Activity Image */}
      {activity.imageUrl && (
        <div className="relative w-full h-64 sm:h-80 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/20 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Eco Action</span>
          </div>
        </div>
      )}

      {/* AI Feedback Quote Box */}
      <div className="mx-4 sm:mx-5 my-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-emerald-50/80 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/40 border border-emerald-500/20">
        <div className="flex items-start space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
          <div className="text-xs space-y-1">
            <p className="text-emerald-900 dark:text-emerald-200 font-medium">
              "{activity.aiVerification.aiFeedback}"
            </p>
            {activity.aiVerification.ecoTip && (
              <p className="text-emerald-700/80 dark:text-emerald-400/80 text-[11px] font-normal">
                💡 <span className="font-semibold">Eco Tip:</span> {activity.aiVerification.ecoTip}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions: High Five & Comment Toggle */}
      <div className="px-4 sm:px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
        <button
          onClick={() => onHighFive(activity.id)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
            activity.userHasHighFived
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span className="text-base">✋</span>
          <span>{activity.highFives} High Fives</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-slate-500" />
          <span>{activity.comments.length} Comments</span>
        </button>
      </div>

      {/* Comment Section Drawer */}
      {showComments && (
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 space-y-3">
          {activity.comments.length > 0 ? (
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {activity.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2.5 text-xs">
                  <img src={comment.userAvatar} alt={comment.userName} className="w-7 h-7 rounded-full object-cover" />
                  <div className="flex-1 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-slate-200">{comment.userName}</span>
                      <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-2">No comments yet. Be the first to cheer!</p>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Cheer on this eco action..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="p-2 rounded-xl bg-emerald-600 text-white disabled:opacity-40 hover:bg-emerald-500 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

    </article>
  );
};
