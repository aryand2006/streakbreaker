import { type Realm, type RealmSlug } from './types';

export const REALMS: Realm[] = [
  {
    slug: 'food',
    name: 'Food',
    emoji: '🍜',
    description: 'Break your eating patterns. Try something you\'d never order.',
    tagline: 'Eat different.',
    accentHex: '#BFFF00',
    glowClass: 'shadow-[0_0_24px_rgba(191,255,0,0.15)]',
    bgGradient: 'from-[#BFFF00]/10 to-transparent',
    taskCount: 10,
  },
  {
    slug: 'place',
    name: 'Place',
    emoji: '📍',
    description: 'Go somewhere you wouldn\'t. Break your usual map.',
    tagline: 'New coordinates.',
    accentHex: '#38BDF8',
    glowClass: 'shadow-[0_0_24px_rgba(56,189,248,0.15)]',
    bgGradient: 'from-[#38BDF8]/10 to-transparent',
    taskCount: 10,
  },
  {
    slug: 'social',
    name: 'Social',
    emoji: '👋',
    description: 'Talk to someone you wouldn\'t. Change a social pattern.',
    tagline: 'New connections.',
    accentHex: '#FF6B8A',
    glowClass: 'shadow-[0_0_24px_rgba(255,107,138,0.15)]',
    bgGradient: 'from-[#FF6B8A]/10 to-transparent',
    taskCount: 10,
  },
  {
    slug: 'communication',
    name: 'Communication',
    emoji: '💬',
    description: 'Say something differently. Change how you connect.',
    tagline: 'New signals.',
    accentHex: '#A78BFA',
    glowClass: 'shadow-[0_0_24px_rgba(167,139,250,0.15)]',
    bgGradient: 'from-[#A78BFA]/10 to-transparent',
    taskCount: 10,
  },
  {
    slug: 'style',
    name: 'Style',
    emoji: '✨',
    description: 'Wear something unexpected. Switch up your look.',
    tagline: 'New aesthetic.',
    accentHex: '#FB923C',
    glowClass: 'shadow-[0_0_24px_rgba(251,146,60,0.15)]',
    bgGradient: 'from-[#FB923C]/10 to-transparent',
    taskCount: 10,
  },
  {
    slug: 'tiny-chaos',
    name: 'Tiny Chaos',
    emoji: '🎲',
    description: 'Do something slightly unhinged. Controlled chaos only.',
    tagline: 'Beautiful disorder.',
    accentHex: '#F43F5E',
    glowClass: 'shadow-[0_0_24px_rgba(244,63,94,0.15)]',
    bgGradient: 'from-[#F43F5E]/10 to-transparent',
    taskCount: 10,
  },
  {
    slug: 'campus',
    name: 'Campus',
    emoji: '🏫',
    description: 'Explore your campus differently. Find what you\'ve missed.',
    tagline: 'Hidden campus.',
    accentHex: '#4ADE80',
    glowClass: 'shadow-[0_0_24px_rgba(74,222,128,0.15)]',
    bgGradient: 'from-[#4ADE80]/10 to-transparent',
    taskCount: 10,
  },
  {
    slug: 'comfort-zone',
    name: 'Comfort Zone',
    emoji: '🔥',
    description: 'Do the thing you\'ve been avoiding. Growth lives here.',
    tagline: 'Edge of comfort.',
    accentHex: '#818CF8',
    glowClass: 'shadow-[0_0_24px_rgba(129,140,248,0.15)]',
    bgGradient: 'from-[#818CF8]/10 to-transparent',
    taskCount: 10,
  },
];

export const REALM_MAP: Record<RealmSlug, Realm> = Object.fromEntries(
  REALMS.map((r) => [r.slug, r])
) as Record<RealmSlug, Realm>;

export const VIBE_CONFIG = {
  Mild: { emoji: '🌿', color: '#4ADE80', label: 'Mild' },
  Bold: { emoji: '⚡', color: '#FB923C', label: 'Bold' },
  Unhinged: { emoji: '🔥', color: '#F43F5E', label: 'Unhinged' },
} as const;

export const REACTION_CONFIG = {
  'could-do-more': { label: 'Could do more', emoji: '😏', color: '#FF6B8A', direction: 'left' as const },
  'lets-gooo': { label: "Let's gooo", emoji: '🔥', color: '#BFFF00', direction: 'right' as const },
  'im-in': { label: "I'm in", emoji: '🚀', color: '#A78BFA', direction: 'up' as const },
} as const;

export const SOCIAL_RISK_LABELS = ['', 'Chill', 'Mildly social', 'Put yourself out there', 'Main character energy', 'Full send'] as const;

export const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #BFFF00 0%, #38BDF8 100%)',
  'linear-gradient(135deg, #FF6B8A 0%, #A78BFA 100%)',
  'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
  'linear-gradient(135deg, #FB923C 0%, #F43F5E 100%)',
  'linear-gradient(135deg, #4ADE80 0%, #BFFF00 100%)',
  'linear-gradient(135deg, #A78BFA 0%, #FF6B8A 100%)',
  'linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)',
  'linear-gradient(135deg, #818CF8 0%, #38BDF8 100%)',
  'linear-gradient(135deg, #BFFF00 0%, #4ADE80 100%)',
  'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
];

// Receipt placeholder images - SVG data URIs that look like real photo scenes
export const RECEIPT_IMAGES = [
  // Food scene - warm tones, plate/bowl shapes
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a1207"/><stop offset="100%" stop-color="#2d1f0e"/></linearGradient></defs><rect fill="url(#a)" width="400" height="400"/><circle cx="200" cy="210" r="110" fill="#3d2b14" opacity="0.6"/><circle cx="200" cy="210" r="90" fill="#4a3520" opacity="0.5"/><circle cx="200" cy="210" r="60" fill="#5c4225" opacity="0.4"/><circle cx="170" cy="195" r="15" fill="#e8a849" opacity="0.5"/><circle cx="220" cy="190" r="12" fill="#c4793a" opacity="0.4"/><circle cx="195" cy="220" r="18" fill="#d4944a" opacity="0.3"/><rect x="280" y="150" width="8" height="120" rx="4" fill="#8a7b6b" opacity="0.3" transform="rotate(15 284 210)"/><rect x="290" y="145" width="8" height="120" rx="4" fill="#8a7b6b" opacity="0.25" transform="rotate(25 294 205)"/><text x="200" y="100" text-anchor="middle" fill="white" opacity="0.06" font-size="80">🍜</text></svg>`)}`,
  // Street scene - urban tones
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0c1628"/><stop offset="60%" stop-color="#1a2540"/><stop offset="100%" stop-color="#1f1a2e"/></linearGradient></defs><rect fill="url(#a)" width="400" height="400"/><rect x="30" y="120" width="80" height="280" fill="#141e35" rx="4"/><rect x="130" y="80" width="60" height="320" fill="#1a2845" rx="4"/><rect x="210" y="150" width="70" height="250" fill="#162040" rx="4"/><rect x="300" y="100" width="75" height="300" fill="#141830" rx="4"/><rect x="0" y="330" width="400" height="70" fill="#0f0f18"/><circle cx="65" cy="200" r="4" fill="#fbbf24" opacity="0.7"/><circle cx="160" cy="160" r="3" fill="#f0f0f5" opacity="0.5"/><circle cx="245" cy="220" r="4" fill="#fbbf24" opacity="0.6"/><circle cx="335" cy="180" r="3" fill="#38bdf8" opacity="0.5"/><circle cx="100" cy="50" r="30" fill="#f0f0f5" opacity="0.03"/></svg>`)}`,
  // Selfie vibe - warm portrait tones
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><radialGradient id="a" cx="50%" cy="40%"><stop offset="0%" stop-color="#2a1f1a"/><stop offset="100%" stop-color="#1a1215"/></radialGradient></defs><rect fill="url(#a)" width="400" height="400"/><ellipse cx="200" cy="170" rx="70" ry="85" fill="#3d2d25" opacity="0.4"/><ellipse cx="200" cy="155" rx="55" ry="55" fill="#4a3830" opacity="0.3"/><rect x="0" y="300" width="400" height="100" fill="#1a1215" opacity="0.5"/><circle cx="320" cy="60" r="40" fill="#ff6b8a" opacity="0.05"/><circle cx="80" cy="340" r="60" fill="#a78bfa" opacity="0.04"/></svg>`)}`,
  // Campus scene - green/institutional
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a1a12"/><stop offset="100%" stop-color="#0f1a0f"/></linearGradient></defs><rect fill="url(#a)" width="400" height="400"/><rect x="100" y="120" width="200" height="180" fill="#1a2e1f" rx="8"/><polygon points="100,120 200,60 300,120" fill="#243828"/><rect x="170" y="200" width="60" height="100" fill="#0f1a12" rx="4"/><circle cx="200" cy="240" r="3" fill="#fbbf24" opacity="0.6"/><ellipse cx="60" cy="320" rx="50" ry="30" fill="#1a3020" opacity="0.5"/><ellipse cx="340" cy="310" rx="55" ry="35" fill="#1a3020" opacity="0.5"/><rect x="0" y="300" width="400" height="100" fill="#0c150e" opacity="0.6"/><circle cx="280" cy="90" r="8" fill="#4ade80" opacity="0.08"/></svg>`)}`,
  // Fashion/style - moody dark with color pop
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a0f20"/><stop offset="100%" stop-color="#120a18"/></linearGradient></defs><rect fill="url(#a)" width="400" height="400"/><rect x="120" y="60" width="160" height="280" fill="#241830" rx="8" opacity="0.5"/><rect x="140" y="100" width="120" height="180" fill="#2d1e3a" rx="6" opacity="0.4"/><circle cx="200" cy="350" r="80" fill="#fb923c" opacity="0.04"/><circle cx="320" cy="80" r="60" fill="#a78bfa" opacity="0.06"/><rect x="160" y="290" width="80" height="12" fill="#fb923c" opacity="0.15" rx="6"/></svg>`)}`,
  // Chat/communication - blue tones, message shapes
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a0f1e"/><stop offset="100%" stop-color="#0f0a20"/></linearGradient></defs><rect fill="url(#a)" width="400" height="400"/><rect x="40" y="100" width="200" height="50" rx="25" fill="#1a2040" opacity="0.6"/><rect x="160" y="170" width="210" height="50" rx="25" fill="#201a40" opacity="0.5"/><rect x="60" y="240" width="180" height="50" rx="25" fill="#1a2040" opacity="0.6"/><rect x="180" y="310" width="170" height="50" rx="25" fill="#201a40" opacity="0.4"/><circle cx="30" cy="125" r="18" fill="#a78bfa" opacity="0.15"/><circle cx="380" cy="195" r="18" fill="#38bdf8" opacity="0.15"/><circle cx="50" cy="265" r="18" fill="#a78bfa" opacity="0.12"/></svg>`)}`,
  // Chaos scene - dynamic angles, red accents
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a0a0f"/><stop offset="100%" stop-color="#1a0f15"/></linearGradient></defs><rect fill="url(#a)" width="400" height="400"/><rect x="50" y="80" width="120" height="120" rx="8" fill="#2d1520" opacity="0.5" transform="rotate(-8 110 140)"/><rect x="220" y="150" width="140" height="100" rx="8" fill="#2d1520" opacity="0.4" transform="rotate(5 290 200)"/><rect x="80" y="260" width="160" height="90" rx="8" fill="#2d1520" opacity="0.45" transform="rotate(-3 160 305)"/><circle cx="300" cy="80" r="40" fill="#f43f5e" opacity="0.06"/><circle cx="100" cy="350" r="50" fill="#f43f5e" opacity="0.04"/><line x1="0" y1="200" x2="400" y2="180" stroke="#f43f5e" stroke-width="1" opacity="0.08"/></svg>`)}`,
  // Outdoor/place - sky gradient, landscape
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f1a2e"/><stop offset="50%" stop-color="#1a2540"/><stop offset="100%" stop-color="#0f1518"/></linearGradient></defs><rect fill="url(#a)" width="400" height="400"/><ellipse cx="200" cy="400" rx="300" ry="150" fill="#0f1a12" opacity="0.6"/><circle cx="300" cy="80" r="30" fill="#fbbf24" opacity="0.08"/><circle cx="100" cy="120" r="2" fill="#f0f0f5" opacity="0.3"/><circle cx="180" cy="60" r="1.5" fill="#f0f0f5" opacity="0.25"/><circle cx="250" cy="100" r="1" fill="#f0f0f5" opacity="0.2"/><circle cx="350" cy="50" r="1.5" fill="#f0f0f5" opacity="0.3"/><circle cx="50" cy="80" r="1" fill="#f0f0f5" opacity="0.2"/><path d="M0 280 Q100 220 200 260 Q300 300 400 250 L400 400 L0 400Z" fill="#142018" opacity="0.5"/></svg>`)}`,
  // Group/social - multiple figures, warm
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="#1a1520"/><stop offset="100%" stop-color="#0f0a15"/></radialGradient></defs><rect fill="url(#a)" width="400" height="400"/><circle cx="120" cy="180" r="35" fill="#2d2035" opacity="0.4"/><circle cx="200" cy="170" r="38" fill="#2d2035" opacity="0.45"/><circle cx="280" cy="185" r="32" fill="#2d2035" opacity="0.4"/><rect x="80" y="215" width="80" height="120" rx="20" fill="#2d2035" opacity="0.3"/><rect x="162" y="208" width="76" height="130" rx="20" fill="#2d2035" opacity="0.35"/><rect x="248" y="217" width="72" height="120" rx="20" fill="#2d2035" opacity="0.3"/><circle cx="200" cy="350" r="100" fill="#ff6b8a" opacity="0.03"/></svg>`)}`,
  // Cozy/comfort - warm amber tones
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><radialGradient id="a" cx="50%" cy="40%"><stop offset="0%" stop-color="#201a10"/><stop offset="100%" stop-color="#120e08"/></radialGradient></defs><rect fill="url(#a)" width="400" height="400"/><circle cx="200" cy="180" r="80" fill="#fbbf24" opacity="0.04"/><circle cx="200" cy="180" r="50" fill="#fbbf24" opacity="0.06"/><circle cx="200" cy="180" r="25" fill="#fbbf24" opacity="0.08"/><rect x="60" y="280" width="280" height="80" rx="12" fill="#1a1508" opacity="0.6"/><rect x="80" y="260" width="100" height="20" rx="4" fill="#2d2510" opacity="0.4"/><rect x="240" y="270" width="80" height="15" rx="4" fill="#2d2510" opacity="0.3"/></svg>`)}`,
];

// Keep the old gradient fallback for any code still using it
export const RECEIPT_GRADIENTS = [
  'linear-gradient(135deg, #1a1207 0%, #2d1f0e 100%)',
  'linear-gradient(135deg, #0c1628 0%, #1f1a2e 100%)',
  'linear-gradient(135deg, #2a1f1a 0%, #1a1215 100%)',
  'linear-gradient(135deg, #0a1a12 0%, #0f1a0f 100%)',
  'linear-gradient(135deg, #1a0f20 0%, #120a18 100%)',
  'linear-gradient(135deg, #0a0f1e 0%, #0f0a20 100%)',
  'linear-gradient(135deg, #1a0a0f 0%, #1a0f15 100%)',
  'linear-gradient(135deg, #0f1a2e 0%, #0f1518 100%)',
  'linear-gradient(135deg, #1a1520 0%, #0f0a15 100%)',
  'linear-gradient(135deg, #201a10 0%, #120e08 100%)',
];
