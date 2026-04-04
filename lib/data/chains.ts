import type { Chain } from '@/lib/types';

export const CHAINS: Chain[] = [
  {
    id: 'chain-1',
    originReceiptId: 'rec-21',
    taskId: 'task-chaos-1',
    receiptIds: ['rec-21', 'rec-36', 'rec-37', 'rec-38'],
    length: 4,
  },
  {
    id: 'chain-2',
    originReceiptId: 'rec-12',
    taskId: 'task-comfort-9',
    receiptIds: ['rec-12', 'rec-39', 'rec-40'],
    length: 3,
  },
  {
    id: 'chain-3',
    originReceiptId: 'rec-11',
    taskId: 'task-social-1',
    receiptIds: ['rec-11', 'rec-41', 'rec-42'],
    length: 3,
  },
  {
    id: 'chain-4',
    originReceiptId: 'rec-1',
    taskId: 'task-food-1',
    receiptIds: ['rec-1', 'rec-43'],
    length: 2,
  },
  {
    id: 'chain-5',
    originReceiptId: 'rec-6',
    taskId: 'task-campus-1',
    receiptIds: ['rec-6', 'rec-44'],
    length: 2,
  },
];

export const CHAIN_MAP: Record<string, Chain> = Object.fromEntries(
  CHAINS.map((c) => [c.id, c])
);
