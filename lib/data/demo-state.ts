import { REALM_MAP } from '@/lib/constants';
import { getDailyRealm } from '@/lib/utils/realm-utils';

import { USERS, USER_MAP, CURRENT_USER } from './users';
import { TASKS, TASK_MAP } from './tasks';
import { GROUPS, GROUP_MAP } from './groups';
import { BADGES, BADGE_MAP } from './badges';
import { RECEIPTS, RECEIPT_MAP } from './receipts';
import { REACTIONS } from './reactions';
import { CHAINS, CHAIN_MAP } from './chains';
import { DUOS, DUO_MAP } from './duos';
import { NOTIFICATIONS } from './notifications';

export function getDemoState() {
  const todayRealm = getDailyRealm();
  const todayRealmData = REALM_MAP[todayRealm];

  // Build swipe deck from recent receipts that are NOT by "me" and NOT private
  const swipeDeck = RECEIPTS
    .filter((r) => r.userId !== 'me' && !r.isPrivate)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);

  // Build today's task pool (tasks from today's realm)
  const todayTasks = TASKS.filter((t) => t.realmSlug === todayRealm);

  // Build reaction lookup: receiptId -> Reaction[]
  const reactionsByReceipt: Record<string, typeof REACTIONS> = {};
  for (const reaction of REACTIONS) {
    if (!reactionsByReceipt[reaction.receiptId]) {
      reactionsByReceipt[reaction.receiptId] = [];
    }
    reactionsByReceipt[reaction.receiptId].push(reaction);
  }

  // Build receipts by user lookup
  const receiptsByUser: Record<string, typeof RECEIPTS> = {};
  for (const receipt of RECEIPTS) {
    if (!receiptsByUser[receipt.userId]) {
      receiptsByUser[receipt.userId] = [];
    }
    receiptsByUser[receipt.userId].push(receipt);
  }

  // Unread notification count
  const unreadNotificationCount = NOTIFICATIONS.filter((n) => !n.read).length;

  // Get the current user's active duo
  const myActiveDuo = DUOS.find(
    (d) => d.userIds.includes('me') && !d.completed
  ) ?? null;

  // Friend activity feed: recent receipts from friends, sorted by time
  const friendActivity = RECEIPTS
    .filter((r) => CURRENT_USER.friendIds.includes(r.userId) && !r.isPrivate)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    // Current user
    currentUser: CURRENT_USER,

    // All data
    users: USERS,
    userMap: USER_MAP,
    tasks: TASKS,
    taskMap: TASK_MAP,
    groups: GROUPS,
    groupMap: GROUP_MAP,
    badges: BADGES,
    badgeMap: BADGE_MAP,
    receipts: RECEIPTS,
    receiptMap: RECEIPT_MAP,
    reactions: REACTIONS,
    reactionsByReceipt,
    chains: CHAINS,
    chainMap: CHAIN_MAP,
    duos: DUOS,
    duoMap: DUO_MAP,
    notifications: NOTIFICATIONS,

    // Derived state
    todayRealm,
    todayRealmData,
    todayTasks,
    swipeDeck,
    receiptsByUser,
    unreadNotificationCount,
    myActiveDuo,
    friendActivity,
  };
}
