import { REALM_MAP } from '../constants';
import { type RealmSlug } from '../types';

export function getRealmColor(slug: RealmSlug): string {
  return REALM_MAP[slug]?.accentHex ?? '#BFFF00';
}

export function getRealmEmoji(slug: RealmSlug): string {
  return REALM_MAP[slug]?.emoji ?? '🎯';
}

export function getRealmName(slug: RealmSlug): string {
  return REALM_MAP[slug]?.name ?? slug;
}

export function getRealmGlow(slug: RealmSlug): string {
  return REALM_MAP[slug]?.glowClass ?? '';
}

export function getDailyRealm(dateStr?: string): RealmSlug {
  const date = dateStr || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = ((hash << 5) - hash) + date.charCodeAt(i);
    hash |= 0;
  }
  const slugs: RealmSlug[] = ['food', 'place', 'social', 'communication', 'style', 'tiny-chaos', 'campus', 'comfort-zone'];
  return slugs[Math.abs(hash) % slugs.length];
}
