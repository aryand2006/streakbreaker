import { create } from 'zustand';
import type { Realm, Task, Receipt, Reaction, Notification, User, DuoPairing, Chain, FriendGroup, ReactionType, TaskSource, Badge } from '@/lib/types';

interface AppState {
  // Current user
  currentUser: User | null;

  // Today
  todayRealm: Realm | null;
  todayTask: Task | null;
  taskSource: TaskSource;
  taskCompleted: boolean;

  // Swipe deck
  swipeDeck: Receipt[];
  swipedReceiptIds: string[];

  // Data
  users: User[];
  tasks: Task[];
  receipts: Receipt[];
  reactions: Reaction[];
  notifications: Notification[];
  badges: Badge[];
  duoPairings: DuoPairing[];
  chains: Chain[];
  groups: FriendGroup[];

  // Saved tasks
  savedTasks: string[];

  // Onboarded
  hasOnboarded: boolean;

  // Actions
  setCurrentUser: (user: User) => void;
  setTodayRealm: (realm: Realm) => void;
  setTodayTask: (task: Task, source: TaskSource) => void;
  completeTask: () => void;

  swipeReaction: (receiptId: string, reaction: ReactionType) => void;
  cloneTask: (receiptId: string) => void;

  addReceipt: (receipt: Receipt) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  useReroll: () => boolean;
  addReroll: (count: number) => void;

  saveTask: (taskId: string) => void;
  unsaveTask: (taskId: string) => void;

  setOnboarded: () => void;

  // Initialization
  initializeStore: (data: {
    users: User[];
    tasks: Task[];
    receipts: Receipt[];
    reactions: Reaction[];
    notifications: Notification[];
    badges: Badge[];
    duoPairings: DuoPairing[];
    chains: Chain[];
    groups: FriendGroup[];
    currentUser: User;
    todayRealm: Realm;
    swipeDeck: Receipt[];
  }) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  todayRealm: null,
  todayTask: null,
  taskSource: null,
  taskCompleted: false,
  swipeDeck: [],
  swipedReceiptIds: [],
  users: [],
  tasks: [],
  receipts: [],
  reactions: [],
  notifications: [],
  badges: [],
  duoPairings: [],
  chains: [],
  groups: [],
  savedTasks: [],
  hasOnboarded: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  setTodayRealm: (realm) => set({ todayRealm: realm }),

  setTodayTask: (task, source) => set({ todayTask: task, taskSource: source, taskCompleted: false }),

  completeTask: () => set((state) => {
    if (!state.currentUser) return state;
    return {
      taskCompleted: true,
      currentUser: {
        ...state.currentUser,
        stats: {
          ...state.currentUser.stats,
          tasksCompleted: state.currentUser.stats.tasksCompleted + 1,
          currentRun: state.currentUser.stats.currentRun + 1,
        },
      },
    };
  }),

  swipeReaction: (receiptId, reactionType) => set((state) => {
    const newReaction: Reaction = {
      id: `r-${Date.now()}`,
      receiptId,
      userId: state.currentUser?.id ?? 'me',
      type: reactionType,
      createdAt: new Date().toISOString(),
    };
    return {
      reactions: [...state.reactions, newReaction],
      swipedReceiptIds: [...state.swipedReceiptIds, receiptId],
      swipeDeck: state.swipeDeck.filter((r) => r.id !== receiptId),
    };
  }),

  cloneTask: (receiptId) => set((state) => {
    const receipt = state.receipts.find((r) => r.id === receiptId);
    if (!receipt) return state;

    const existingChain = state.chains.find((c) => c.receiptIds.includes(receiptId) || c.originReceiptId === receiptId);
    let chains = state.chains;
    if (existingChain) {
      chains = chains.map((c) =>
        c.id === existingChain.id
          ? { ...c, receiptIds: [...c.receiptIds, receiptId], length: c.length + 1 }
          : c
      );
    } else {
      chains = [...chains, {
        id: `chain-${Date.now()}`,
        originReceiptId: receiptId,
        taskId: receipt.taskId,
        receiptIds: [receiptId],
        length: 2,
      }];
    }

    // Increment influence on original poster
    const users = state.users.map((u) =>
      u.id === receipt.userId
        ? { ...u, stats: { ...u.stats, influenceScore: u.stats.influenceScore + 5, imInCount: u.stats.imInCount + 1 } }
        : u
    );

    return {
      savedTasks: [...new Set([...state.savedTasks, receipt.taskId])],
      chains,
      users,
      notifications: [
        {
          id: `n-${Date.now()}`,
          type: 'im-in' as const,
          title: "Someone's in!",
          body: `You cloned a task from someone's receipt`,
          avatarUserId: state.currentUser?.id ?? null,
          linkTo: null,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    };
  }),

  addReceipt: (receipt) => set((state) => ({
    receipts: [receipt, ...state.receipts],
  })),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),

  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),

  useReroll: () => {
    const state = get();
    if (!state.currentUser || state.currentUser.rerolls <= 0) return false;
    set({
      currentUser: { ...state.currentUser, rerolls: state.currentUser.rerolls - 1 },
    });
    return true;
  },

  addReroll: (count) => set((state) => {
    if (!state.currentUser) return state;
    return {
      currentUser: { ...state.currentUser, rerolls: state.currentUser.rerolls + count },
    };
  }),

  saveTask: (taskId) => set((state) => ({
    savedTasks: [...new Set([...state.savedTasks, taskId])],
  })),

  unsaveTask: (taskId) => set((state) => ({
    savedTasks: state.savedTasks.filter((id) => id !== taskId),
  })),

  setOnboarded: () => set({ hasOnboarded: true }),

  initializeStore: (data) => set({
    ...data,
    hasOnboarded: true,
    swipedReceiptIds: [],
    savedTasks: data.currentUser.savedTaskIds || [],
    taskSource: null,
    todayTask: null,
    taskCompleted: false,
  }),
}));
