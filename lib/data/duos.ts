import type { DuoPairing } from '@/lib/types';
import { daysAgo } from '@/lib/utils/date-utils';

export const DUOS: DuoPairing[] = [
  {
    id: 'duo-1',
    userIds: ['me', 'u1'],
    realmSlug: 'food',
    taskId: 'task-food-1',
    sharedReceiptIds: ['rec-1'],
    weekStart: daysAgo(3),
    completed: false,
    isExtendedCircle: false,
  },
  {
    id: 'duo-2',
    userIds: ['u2', 'u3'],
    realmSlug: 'style',
    taskId: 'task-style-2',
    sharedReceiptIds: [],
    weekStart: daysAgo(3),
    completed: false,
    isExtendedCircle: false,
  },
  {
    id: 'duo-3',
    userIds: ['u4', 'u5'],
    realmSlug: 'comfort-zone',
    taskId: 'task-comfort-9',
    sharedReceiptIds: ['rec-39', 'rec-40'],
    weekStart: daysAgo(3),
    completed: true,
    isExtendedCircle: false,
  },
];

export const DUO_MAP: Record<string, DuoPairing> = Object.fromEntries(
  DUOS.map((d) => [d.id, d])
);
