import React from 'react';
import { X, Trophy, Award, Sparkles, CheckCircle2, Printer, Share2, Download, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-amber-50/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border-4 border-amber-400 p-6 sm:p-10 my-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame Inner Border */}
        <div className="border-2 border-dashed border-amber-500/60 p-6 sm:p-8 rounded-2xl text-center space-y-6 relative">
          
          {/* Top Emblem */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-emerald-950 shadow-xl border-2 border-amber-200">
              <Trophy className="w-12 h-12 stroke-[2.2]" />
            </div>
          </div>

          {/* Certificate Title */}
          <div className="space-y-1">
            <span className="text-xs font-black tracking-widest text-amber-700 dark:text-amber-400 uppercase">
              Official EcoKarma Verification
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 dark:text-amber-200 tracking-tight">
              Best Environmentalist Award
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Presented for outstanding dedication to planet sustainability, verified carbon reduction, and environmental leadership.
            </p>
          </div>

          {/* Recipient Name */}
          <div className="py-2 border-y border-amber-300/60 max-w-md mx-auto">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
              This Certificate is Proudly Awarded To
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400 font-serif my-1">
              {user.name}
            </h2>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-bold">
              👑 Title: Official Best Environmentalist
            </span>
          </div>

          {/* Verified Stats Row */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto text-center py-2">
            <div className="p-2.5 rounded-xl bg-amber-100/60 dark:bg-slate-800 border border-amber-300/50">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">EcoPoints</span>
              <span className="text-lg font-extrabold text-amber-700 dark:text-amber-300">{user.totalPoints} pts</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-100/60 dark:bg-slate-800 border border-emerald-300/50">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">CO2 Saved</span>
              <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">{user.totalCo2SavedKg} kg</span>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-100/60 dark:bg-slate-800 border border-teal-300/50">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Trees Planted</span>
              <span className="text-lg font-extrabold text-teal-700 dark:text-teal-400">{user.treesPlantedCount}</span>
            </div>
          </div>

          {/* Footer Seals & Verification */}
          <div className="flex items-center justify-between pt-4 text-xs border-t border-amber-200 dark:border-slate-800">
            <div className="text-left">
              <span className="block font-bold text-slate-700 dark:text-slate-300">Gemini AI verification ID</span>
              <span className="text-[10px] text-slate-500 font-mono">ECO-CERT-2026-88492</span>
            </div>

            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Verified & Authenticated</span>
            </div>
          </div>

        </div>

        {/* Modal Action Controls */}
        <div className="mt-6 flex items-center justify-end space-x-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
