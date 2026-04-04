import type { FriendGroup } from '@/lib/types';
import { daysAgo } from '@/lib/utils/date-utils';

export const GROUPS: FriendGroup[] = [
  {
    id: 'group-1',
    name: 'The Unhinged 6',
    emoji: '🫠',
    memberIds: ['me', 'u1', 'u2', 'u3', 'u4', 'u5'],
    createdAt: daysAgo(30),
  },
  {
    id: 'group-2',
    name: 'Campus Chaos Crew',
    emoji: '🔥',
    memberIds: ['me', 'u6', 'u7', 'u8', 'u9'],
    createdAt: daysAgo(20),
  },
];

export const GROUP_MAP: Record<string, FriendGroup> = Object.fromEntries(
  GROUPS.map((g) => [g.id, g])
);
