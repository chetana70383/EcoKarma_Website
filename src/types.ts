export type EcoCategory = 
  | 'tree_planting'
  | 'cycling_transit'
  | 'waste_recycling'
  | 'energy_saving'
  | 'water_conservation'
  | 'plant_based_meal'
  | 'upcycling_repair'
  | 'beach_ocean_cleanup';

export interface CategoryInfo {
  id: EcoCategory;
  name: string;
  icon: string; // Lucide icon name or emoji
  description: string;
  defaultUnit: string;
  basePoints: number;
  bgGradient: string;
  textColor: string;
  accentColor: string;
}

export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string; // emoji or icon identifier
  requiredPoints: number;
  requiredCategory?: EcoCategory;
  requiredCount?: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  isBestEnvironmentalist?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface EcoActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userBadgeTitle?: string;
  title: string;
  category: EcoCategory;
  description: string;
  location?: string;
  imageUrl?: string;
  proofNotes?: string;
  quantity?: number;
  quantityUnit?: string;
  co2SavedKg: number;
  waterSavedLiters?: number;
  pointsAwarded: number;
  aiVerification: {
    status: 'verified' | 'boosted' | 'pending';
    score: number; // 0 to 100
    aiFeedback: string;
    ecoTip: string;
    verifiedAt: string;
  };
  highFives: number;
  userHasHighFived?: boolean;
  comments: Comment[];
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  totalPoints: number;
  rank: number;
  totalPosts: number;
  totalCo2SavedKg: number;
  totalWaterSavedLiters: number;
  treesPlantedCount: number;
  unlockedBadgeIds: string[];
  isBestEnvironmentalist: boolean;
  bestEnvironmentalistDate?: string;
  joinedDate: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  totalPoints: number;
  co2SavedKg: number;
  badgesCount: number;
  topBadge: string;
  isBestEnvironmentalist: boolean;
  trend: 'up' | 'down' | 'same';
}

export interface AIVerifyRequest {
  title: string;
  category: EcoCategory;
  description: string;
  quantity?: number;
  quantityUnit?: string;
  proofNotes?: string;
  hasImage?: boolean;
  imageDataBase64?: string;
}

export interface AIVerifyResponse {
  verified: boolean;
  score: number;
  pointsAwarded: number;
  co2SavedKg: number;
  waterSavedLiters: number;
  treesPlanted: number;
  feedback: string;
  ecoTip: string;
  badgeUnlockedTitle?: string;
}
