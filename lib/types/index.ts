export type RealmSlug = 'food' | 'place' | 'social' | 'communication' | 'style' | 'tiny-chaos' | 'campus' | 'comfort-zone';

export type Vibe = 'Mild' | 'Bold' | 'Unhinged';

export type ReactionType = 'could-do-more' | 'lets-gooo' | 'im-in';

export type TaskSource = 'lucky' | 'picked' | 'friend-picked' | null;

export interface Realm {
  slug: RealmSlug;
  name: string;
  emoji: string;
  description: string;
  tagline: string;
  accentHex: string;
  glowClass: string;
  bgGradient: string;
  taskCount: number;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  avatarGradient: string;
  university: string;
  isVerified: boolean;
  bio: string;
  vibeChoice: Vibe;
  joinedAt: string;
  stats: UserStats;
  knownFor: string[];
  badgeIds: string[];
  friendIds: string[];
  groupIds: string[];
  savedTaskIds: string[];
  rerolls: number;
  isCurrentUser?: boolean;
}

export interface UserStats {
  currentRun: number;
  longestRun: number;
  tasksCompleted: number;
  realmsExplored: number;
  influenceScore: number;
  friendCount: number;
  duoWins: number;
  duoCompletions: number;
  reactionsReceived: number;
  imInCount: number;
  badgesEarned: number;
}

export interface Task {
  id: string;
  realmSlug: RealmSlug;
  title: string;
  description: string;
  vibe: Vibe;
  socialRisk: 1 | 2 | 3 | 4 | 5;
  timeEstimate: string;
  proofSuggestion: string;
  canBeFriendPicked: boolean;
  canBeDuo: boolean;
  tags: string[];
  chainPotential: 'low' | 'medium' | 'high';
  label?: string;
}

export interface Receipt {
  id: string;
  userId: string;
  taskId: string;
  caption: string;
  photoGradient: string;
  photoImage: string | null;
  textProof: string | null;
  witnessId: string | null;
  createdAt: string;
  chainOriginReceiptId: string | null;
  isPrivate: boolean;
}

export interface Reaction {
  id: string;
  receiptId: string;
  userId: string;
  type: ReactionType;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'reaction' | 'im-in' | 'friend-pick' | 'duo' | 'invite' | 'badge' | 'trend' | 'reroll' | 'system';
  title: string;
  body: string;
  avatarUserId: string | null;
  linkTo: string | null;
  read: boolean;
  createdAt: string;
  groupKey?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  accentHex: string;
  unlockCriteria: string;
}

export interface DuoPairing {
  id: string;
  userIds: [string, string];
  realmSlug: RealmSlug;
  taskId: string | null;
  sharedReceiptIds: string[];
  weekStart: string;
  completed: boolean;
  isExtendedCircle: boolean;
}

export interface Chain {
  id: string;
  originReceiptId: string;
  taskId: string;
  receiptIds: string[];
  length: number;
}

export interface FriendGroup {
  id: string;
  name: string;
  emoji: string;
  memberIds: string[];
  createdAt: string;
}
