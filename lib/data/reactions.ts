import type { Reaction } from '@/lib/types';
import { minutesAgo, hoursAgo, daysAgo } from '@/lib/utils/date-utils';

export const REACTIONS: Reaction[] = [
  // ─── rec-1 (me: Mystery Bowl) ──────────────────────────────────────
  { id: 'rxn-1', receiptId: 'rec-1', userId: 'u1', type: 'lets-gooo', createdAt: minutesAgo(20) },
  { id: 'rxn-2', receiptId: 'rec-1', userId: 'u3', type: 'lets-gooo', createdAt: minutesAgo(18) },
  { id: 'rxn-3', receiptId: 'rec-1', userId: 'u6', type: 'im-in', createdAt: minutesAgo(15) },
  { id: 'rxn-4', receiptId: 'rec-1', userId: 'u4', type: 'lets-gooo', createdAt: minutesAgo(12) },
  { id: 'rxn-5', receiptId: 'rec-1', userId: 'u7', type: 'could-do-more', createdAt: minutesAgo(10) },

  // ─── rec-2 (u1: British accent) ────────────────────────────────────
  { id: 'rxn-6', receiptId: 'rec-2', userId: 'me', type: 'lets-gooo', createdAt: minutesAgo(40) },
  { id: 'rxn-7', receiptId: 'rec-2', userId: 'u4', type: 'lets-gooo', createdAt: minutesAgo(38) },
  { id: 'rxn-8', receiptId: 'rec-2', userId: 'u3', type: 'lets-gooo', createdAt: minutesAgo(35) },
  { id: 'rxn-9', receiptId: 'rec-2', userId: 'u5', type: 'could-do-more', createdAt: minutesAgo(33) },

  // ─── rec-3 (u3: leather pants) ─────────────────────────────────────
  { id: 'rxn-10', receiptId: 'rec-3', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(1) },
  { id: 'rxn-11', receiptId: 'rec-3', userId: 'u1', type: 'lets-gooo', createdAt: hoursAgo(1) },
  { id: 'rxn-12', receiptId: 'rec-3', userId: 'u5', type: 'im-in', createdAt: hoursAgo(1) },
  { id: 'rxn-13', receiptId: 'rec-3', userId: 'u8', type: 'lets-gooo', createdAt: hoursAgo(1) },
  { id: 'rxn-14', receiptId: 'rec-3', userId: 'u9', type: 'lets-gooo', createdAt: hoursAgo(1) },
  { id: 'rxn-15', receiptId: 'rec-3', userId: 'u4', type: 'could-do-more', createdAt: hoursAgo(1) },

  // ─── rec-4 (u7: strangers at lunch) ────────────────────────────────
  { id: 'rxn-16', receiptId: 'rec-4', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(2) },
  { id: 'rxn-17', receiptId: 'rec-4', userId: 'u9', type: 'lets-gooo', createdAt: hoursAgo(2) },
  { id: 'rxn-18', receiptId: 'rec-4', userId: 'u6', type: 'im-in', createdAt: hoursAgo(2) },
  { id: 'rxn-19', receiptId: 'rec-4', userId: 'u1', type: 'lets-gooo', createdAt: hoursAgo(2) },

  // ─── rec-5 (u4: dining hall toast) ─────────────────────────────────
  { id: 'rxn-20', receiptId: 'rec-5', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(3) },
  { id: 'rxn-21', receiptId: 'rec-5', userId: 'u1', type: 'lets-gooo', createdAt: hoursAgo(3) },
  { id: 'rxn-22', receiptId: 'rec-5', userId: 'u7', type: 'lets-gooo', createdAt: hoursAgo(3) },
  { id: 'rxn-23', receiptId: 'rec-5', userId: 'u3', type: 'im-in', createdAt: hoursAgo(3) },
  { id: 'rxn-24', receiptId: 'rec-5', userId: 'u2', type: 'could-do-more', createdAt: hoursAgo(3) },

  // ─── rec-6 (me: rooftop garden) ────────────────────────────────────
  { id: 'rxn-25', receiptId: 'rec-6', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-26', receiptId: 'rec-6', userId: 'u8', type: 'im-in', createdAt: daysAgo(1) },
  { id: 'rxn-27', receiptId: 'rec-6', userId: 'u2', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-28', receiptId: 'rec-6', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(1) },

  // ─── rec-7 (u2: music building) ────────────────────────────────────
  { id: 'rxn-29', receiptId: 'rec-7', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-30', receiptId: 'rec-7', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-31', receiptId: 'rec-7', userId: 'u8', type: 'im-in', createdAt: daysAgo(1) },

  // ─── rec-8 (u5: said hi in Chem) ──────────────────────────────────
  { id: 'rxn-32', receiptId: 'rec-8', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-33', receiptId: 'rec-8', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-34', receiptId: 'rec-8', userId: 'u2', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-35', receiptId: 'rec-8', userId: 'u3', type: 'im-in', createdAt: daysAgo(1) },

  // ─── rec-9 (u9: voice notes day) ──────────────────────────────────
  { id: 'rxn-36', receiptId: 'rec-9', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-37', receiptId: 'rec-9', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-38', receiptId: 'rec-9', userId: 'u6', type: 'im-in', createdAt: daysAgo(1) },

  // ─── rec-10 (u6: library steps picnic) ────────────────────────────
  { id: 'rxn-39', receiptId: 'rec-10', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-40', receiptId: 'rec-10', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-41', receiptId: 'rec-10', userId: 'u9', type: 'im-in', createdAt: daysAgo(1) },
  { id: 'rxn-42', receiptId: 'rec-10', userId: 'u8', type: 'lets-gooo', createdAt: daysAgo(1) },

  // ─── rec-11 (me: compliment outfit) ───────────────────────────────
  { id: 'rxn-43', receiptId: 'rec-11', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-44', receiptId: 'rec-11', userId: 'u3', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-45', receiptId: 'rec-11', userId: 'u2', type: 'im-in', createdAt: daysAgo(2) },
  { id: 'rxn-46', receiptId: 'rec-11', userId: 'u9', type: 'im-in', createdAt: daysAgo(2) },
  { id: 'rxn-47', receiptId: 'rec-11', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(2) },

  // ─── rec-12 (u1: danced in quad) ──────────────────────────────────
  { id: 'rxn-48', receiptId: 'rec-12', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-49', receiptId: 'rec-12', userId: 'u4', type: 'im-in', createdAt: daysAgo(2) },
  { id: 'rxn-50', receiptId: 'rec-12', userId: 'u3', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-51', receiptId: 'rec-12', userId: 'u5', type: 'im-in', createdAt: daysAgo(2) },
  { id: 'rxn-52', receiptId: 'rec-12', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(2) },

  // ─── rec-13 (u8: mural discovery) ─────────────────────────────────
  { id: 'rxn-53', receiptId: 'rec-13', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-54', receiptId: 'rec-13', userId: 'u6', type: 'lets-gooo', createdAt: daysAgo(2) },

  // ─── rec-14 (u3: blazer to lecture) ────────────────────────────────
  { id: 'rxn-55', receiptId: 'rec-14', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-56', receiptId: 'rec-14', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-57', receiptId: 'rec-14', userId: 'u5', type: 'im-in', createdAt: daysAgo(2) },
  { id: 'rxn-58', receiptId: 'rec-14', userId: 'u9', type: 'lets-gooo', createdAt: daysAgo(2) },

  // ─── rec-15 (u4: skipping) ────────────────────────────────────────
  { id: 'rxn-59', receiptId: 'rec-15', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-60', receiptId: 'rec-15', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-61', receiptId: 'rec-15', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(2) },

  // ─── rec-16 (me: handwritten note) ────────────────────────────────
  { id: 'rxn-62', receiptId: 'rec-16', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-63', receiptId: 'rec-16', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-64', receiptId: 'rec-16', userId: 'u9', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-65', receiptId: 'rec-16', userId: 'u2', type: 'im-in', createdAt: daysAgo(3) },

  // ─── rec-17 (u2: solo dining) ─────────────────────────────────────
  { id: 'rxn-66', receiptId: 'rec-17', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-67', receiptId: 'rec-17', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(3) },

  // ─── rec-18 (u7: waving at everyone) ──────────────────────────────
  { id: 'rxn-68', receiptId: 'rec-18', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-69', receiptId: 'rec-18', userId: 'u9', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-70', receiptId: 'rec-18', userId: 'u6', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-71', receiptId: 'rec-18', userId: 'u4', type: 'im-in', createdAt: daysAgo(3) },
  { id: 'rxn-72', receiptId: 'rec-18', userId: 'u1', type: 'could-do-more', createdAt: daysAgo(3) },

  // ─── rec-19 (u5: asked for help) ──────────────────────────────────
  { id: 'rxn-73', receiptId: 'rec-19', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-74', receiptId: 'rec-19', userId: 'u2', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-75', receiptId: 'rec-19', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(3) },

  // ─── rec-20 (u9: video diary) ─────────────────────────────────────
  { id: 'rxn-76', receiptId: 'rec-20', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-77', receiptId: 'rec-20', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-78', receiptId: 'rec-20', userId: 'u6', type: 'im-in', createdAt: daysAgo(3) },

  // ─── rec-21 (me: pay it forward) ──────────────────────────────────
  { id: 'rxn-79', receiptId: 'rec-21', userId: 'u1', type: 'im-in', createdAt: daysAgo(4) },
  { id: 'rxn-80', receiptId: 'rec-21', userId: 'u3', type: 'im-in', createdAt: daysAgo(4) },
  { id: 'rxn-81', receiptId: 'rec-21', userId: 'u7', type: 'im-in', createdAt: daysAgo(4) },
  { id: 'rxn-82', receiptId: 'rec-21', userId: 'u2', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-83', receiptId: 'rec-21', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-84', receiptId: 'rec-21', userId: 'u9', type: 'lets-gooo', createdAt: daysAgo(4) },

  // ─── rec-22 (u1: stranger picked order) ───────────────────────────
  { id: 'rxn-85', receiptId: 'rec-22', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-86', receiptId: 'rec-22', userId: 'u4', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-87', receiptId: 'rec-22', userId: 'u6', type: 'im-in', createdAt: daysAgo(4) },

  // ─── rec-23 (u6: dessert first) ───────────────────────────────────
  { id: 'rxn-88', receiptId: 'rec-23', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-89', receiptId: 'rec-23', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-90', receiptId: 'rec-23', userId: 'u9', type: 'lets-gooo', createdAt: daysAgo(4) },

  // ─── rec-25 (u3: Maya dressed me) ─────────────────────────────────
  { id: 'rxn-91', receiptId: 'rec-25', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-92', receiptId: 'rec-25', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(4) },
  { id: 'rxn-93', receiptId: 'rec-25', userId: 'u4', type: 'could-do-more', createdAt: daysAgo(4) },
  { id: 'rxn-94', receiptId: 'rec-25', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(4) },

  // ─── rec-26 (me: physics tower) ───────────────────────────────────
  { id: 'rxn-95', receiptId: 'rec-26', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-96', receiptId: 'rec-26', userId: 'u2', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-97', receiptId: 'rec-26', userId: 'u8', type: 'im-in', createdAt: daysAgo(5) },

  // ─── rec-27 (u1: fake campus tour) ────────────────────────────────
  { id: 'rxn-98', receiptId: 'rec-27', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-99', receiptId: 'rec-27', userId: 'u4', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-100', receiptId: 'rec-27', userId: 'u3', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-101', receiptId: 'rec-27', userId: 'u7', type: 'im-in', createdAt: daysAgo(5) },

  // ─── rec-28 (u4: photobomb) ───────────────────────────────────────
  { id: 'rxn-102', receiptId: 'rec-28', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-103', receiptId: 'rec-28', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-104', receiptId: 'rec-28', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-105', receiptId: 'rec-28', userId: 'u3', type: 'could-do-more', createdAt: daysAgo(5) },

  // ─── rec-29 (u7: matchmaker) ──────────────────────────────────────
  { id: 'rxn-106', receiptId: 'rec-29', userId: 'u8', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-107', receiptId: 'rec-29', userId: 'u9', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-108', receiptId: 'rec-29', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(5) },

  // ─── rec-30 (u2: appreciation) ────────────────────────────────────
  { id: 'rxn-109', receiptId: 'rec-30', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-110', receiptId: 'rec-30', userId: 'u5', type: 'lets-gooo', createdAt: daysAgo(5) },
  { id: 'rxn-111', receiptId: 'rec-30', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(5) },

  // ─── rec-31 (me: orange outfit) ───────────────────────────────────
  { id: 'rxn-112', receiptId: 'rec-31', userId: 'u6', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-113', receiptId: 'rec-31', userId: 'u3', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-114', receiptId: 'rec-31', userId: 'u1', type: 'could-do-more', createdAt: daysAgo(6) },

  // ─── rec-32 (u5: raised hand) ─────────────────────────────────────
  { id: 'rxn-115', receiptId: 'rec-32', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-116', receiptId: 'rec-32', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-117', receiptId: 'rec-32', userId: 'u2', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-118', receiptId: 'rec-32', userId: 'u3', type: 'im-in', createdAt: daysAgo(6) },

  // ─── rec-33 (u9: impromptu speech) ────────────────────────────────
  { id: 'rxn-119', receiptId: 'rec-33', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-120', receiptId: 'rec-33', userId: 'u7', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-121', receiptId: 'rec-33', userId: 'u6', type: 'lets-gooo', createdAt: daysAgo(6) },

  // ─── rec-34 (u6: lunch with quiet kid) ────────────────────────────
  { id: 'rxn-122', receiptId: 'rec-34', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(6) },
  { id: 'rxn-123', receiptId: 'rec-34', userId: 'u8', type: 'lets-gooo', createdAt: daysAgo(6) },

  // ─── rec-36 (u1: pay-it-forward chain) ────────────────────────────
  { id: 'rxn-124', receiptId: 'rec-36', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(3) },
  { id: 'rxn-125', receiptId: 'rec-36', userId: 'u3', type: 'im-in', createdAt: daysAgo(3) },
  { id: 'rxn-126', receiptId: 'rec-36', userId: 'u4', type: 'lets-gooo', createdAt: daysAgo(3) },

  // ─── rec-37 (u3: pay-it-forward chain) ────────────────────────────
  { id: 'rxn-127', receiptId: 'rec-37', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(2) },
  { id: 'rxn-128', receiptId: 'rec-37', userId: 'u7', type: 'im-in', createdAt: daysAgo(2) },
  { id: 'rxn-129', receiptId: 'rec-37', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(2) },

  // ─── rec-38 (u7: pay-it-forward chain) ────────────────────────────
  { id: 'rxn-130', receiptId: 'rec-38', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-131', receiptId: 'rec-38', userId: 'u9', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-132', receiptId: 'rec-38', userId: 'u6', type: 'lets-gooo', createdAt: daysAgo(1) },

  // ─── rec-39 (u4: breakdance attempt) ──────────────────────────────
  { id: 'rxn-133', receiptId: 'rec-39', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-134', receiptId: 'rec-39', userId: 'u1', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-135', receiptId: 'rec-39', userId: 'u5', type: 'im-in', createdAt: daysAgo(1) },

  // ─── rec-40 (u5: shimmy by fountain) ──────────────────────────────
  { id: 'rxn-136', receiptId: 'rec-40', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(5) },
  { id: 'rxn-137', receiptId: 'rec-40', userId: 'u1', type: 'lets-gooo', createdAt: hoursAgo(5) },
  { id: 'rxn-138', receiptId: 'rec-40', userId: 'u2', type: 'lets-gooo', createdAt: hoursAgo(5) },

  // ─── rec-41 (u2: compliment chain) ────────────────────────────────
  { id: 'rxn-139', receiptId: 'rec-41', userId: 'me', type: 'lets-gooo', createdAt: daysAgo(1) },
  { id: 'rxn-140', receiptId: 'rec-41', userId: 'u9', type: 'im-in', createdAt: daysAgo(1) },

  // ─── rec-42 (u9: compliment chain) ────────────────────────────────
  { id: 'rxn-141', receiptId: 'rec-42', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(7) },
  { id: 'rxn-142', receiptId: 'rec-42', userId: 'u7', type: 'lets-gooo', createdAt: hoursAgo(7) },

  // ─── rec-43 (u6: Chef's Revenge) ──────────────────────────────────
  { id: 'rxn-143', receiptId: 'rec-43', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(3) },
  { id: 'rxn-144', receiptId: 'rec-43', userId: 'u7', type: 'lets-gooo', createdAt: hoursAgo(3) },
  { id: 'rxn-145', receiptId: 'rec-43', userId: 'u1', type: 'im-in', createdAt: hoursAgo(3) },

  // ─── rec-44 (u8: art building nook) ───────────────────────────────
  { id: 'rxn-146', receiptId: 'rec-44', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(4) },
  { id: 'rxn-147', receiptId: 'rec-44', userId: 'u6', type: 'lets-gooo', createdAt: hoursAgo(4) },

  // ─── rec-45 (u3: full glam to seminar) ────────────────────────────
  { id: 'rxn-148', receiptId: 'rec-45', userId: 'me', type: 'lets-gooo', createdAt: hoursAgo(9) },
  { id: 'rxn-149', receiptId: 'rec-45', userId: 'u1', type: 'lets-gooo', createdAt: hoursAgo(9) },
  { id: 'rxn-150', receiptId: 'rec-45', userId: 'u5', type: 'im-in', createdAt: hoursAgo(9) },
  { id: 'rxn-151', receiptId: 'rec-45', userId: 'u9', type: 'lets-gooo', createdAt: hoursAgo(9) },
];
