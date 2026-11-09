import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Globe2, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Target, 
  Award, 
  Trophy,
  Users
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'AI & Verification' | 'Best Environmentalist' | 'Points & Badges' | 'Community';
}

const FAQS: FaqItem[] = [
  {
    category: 'AI & Verification',
    question: 'How does Gemini AI verify my environmental activities?',
    answer: 'When you submit an eco action, our backend passes your activity description, category, unit quantities, and uploaded photographic proof to Gemini 3.6 Flash. The multimodal model evaluates visual authenticity, checks realistic measurements, calculates precise carbon offsets (kg CO2) and water savings using EPA/forestry formulas, and awards scaled EcoPoints plus tailored eco advice.',
  },
  {
    category: 'Best Environmentalist',
    question: 'What is the "Best Environmentalist" award and how do I earn it?',
    answer: 'Best Environmentalist is the highest honor in the EcoKarma community. Once your cumulative score reaches 1,000+ EcoPoints through verified green actions (planting trees, zero-emission commutes, cleanups, water conservation), you unlock the Legendary Best Environmentalist Badge, rise to Rank #1 on the leaderboard, and receive an official verifiable and printable certificate.',
  },
  {
    category: 'Points & Badges',
    question: 'How are EcoPoints calculated for different actions?',
    answer: 'Points range from 30 to 500 based on the real-world environmental impact. For instance, planting native trees yields 150-350 pts (~22 kg CO2/tree/yr); commuting 15 km by bike or transit yields 80-180 pts (~2.5 kg CO2 saved); coastal plastic removal yields 120-250 pts; and composting or greywater recycling earns 60-150 pts.',
  },
  {
    category: 'AI & Verification',
    question: 'Do I have to upload a real photo for every activity?',
    answer: 'While you can use one of our representative sample category photos to quickly log an action, uploading your own photo provides tangible proof, boosts your AI verification confidence score up to 98-100%, and inspires fellow community members on the live feed.',
  },
  {
    category: 'Best Environmentalist',
    question: 'Can I print or share my Best Environmentalist Certificate?',
    answer: 'Yes! When unlocked, clicking "View Official Certificate" renders a high-resolution, credentialed certificate with your name, verified CO2 savings, trees planted, and official verification ID. You can print it directly or save it as a PDF for your environmental resume or school/work recognition.',
  },
  {
    category: 'Community',
    question: 'Is EcoKarma free to use for schools, teams, and individuals?',
    answer: 'EcoKarma is 100% free and open for environmental enthusiasts, school green clubs, neighborhood climate groups, and corporate sustainability teams to log collective actions and foster friendly climate competition.',
  },
];

export const AboutAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');

  const categories = ['All', 'AI & Verification', 'Best Environmentalist', 'Points & Badges', 'Community'];

  const filteredFaqs = FAQS.filter(f => {
    if (activeFaqCategory === 'All') return true;
    return f.category === activeFaqCategory;
  });

  return (
    <div className="py-10 space-y-16">
      
      {/* Mission & Story Section */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8">
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Our Mission & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Democratizing Environmental Impact with AI & Collective Action
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Climate anxiety often makes individual actions feel small or invisible. <strong className="text-emerald-600 dark:text-emerald-400">EcoKarma</strong> was built on a simple conviction: every sapling planted, every kilometer pedaled instead of driven, and every kilogram of plastic diverted matters. By pairing artificial intelligence verification with social recognition and verified honors, we transform daily micro-choices into a measurable, celebratory global movement.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          <div className="space-y-2">
            <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Scientific Verification
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No empty greenwashing. We employ peer-reviewed carbon absorption rates and vision AI models to ensure actions are genuine, quantifiable, and scientifically meaningful.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Honors & Recognition
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Green champions deserve real celebrations. From tiered badges to the coveted Best Environmentalist title and official verifiable certificate, we celebrate every milestone.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-3 w-fit rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Community Cheering
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A positive, uplifting space where neighbors high-five green achievements, exchange composting tips, and organize local tree planting or coastal cleanups together.
            </p>
          </div>

        </div>

      </div>

      {/* Sustainable Development Goals Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
              Global Climate Alignment
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Aligned with United Nations Sustainable Development Goals
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl">
              EcoKarma directly supports UN SDG 13 (Climate Action), SDG 14 (Life Below Water), SDG 15 (Life on Land), and SDG 11 (Sustainable Cities & Communities).
            </p>
          </div>

          <div className="flex items-center space-x-2 text-2xl">
            <span className="p-3 rounded-2xl bg-emerald-800/60 border border-emerald-600/40" title="SDG 13: Climate Action">🌍</span>
            <span className="p-3 rounded-2xl bg-teal-800/60 border border-teal-600/40" title="SDG 14: Life Below Water">🌊</span>
            <span className="p-3 rounded-2xl bg-green-800/60 border border-green-600/40" title="SDG 15: Life on Land">🌳</span>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about EcoKarma, AI scoring, and earning the Best Environmentalist award.
          </p>
        </div>

        {/* FAQ Category Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFaqCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFaqCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg shrink-0 transition-transform ${isOpen ? 'bg-emerald-500/10 text-emerald-600 rotate-180' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
