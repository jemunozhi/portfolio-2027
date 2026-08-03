export type Project = {
  number: string;
  title: string;
  slug: string;
  isPrivate?: boolean;
  hasLockIcon?: boolean;
  hasNorthEastIcon?: boolean;
  description?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    number: '1',
    title: 'Toyota Racing Development',
    slug: 'toyota-racing-development',
    hasLockIcon: true,
    description: 'Optimizing the operational backbone to eliminate risk and power race engine development.',
    tags: ['Motorsport', 'Systems Thinking', 'Ops Strategy'],
  },
  {
    number: '2',
    title: 'AB InBev | Modelorama Expansion',
    slug: 'modelorama-expansion',
    description: 'Optimizing store prospecting workflows to improve business case visibility and boost evaluation efficiency.',
    tags: ['Retail / B2B', 'Product Strategy', 'Ops Strategy'],
  },
  {
    number: '3',
    title: 'DELTA Air Lines',
    slug: 'delta-air-lines',
    hasLockIcon: true,
    description: "Modernizing Delta's seatback ecosystem to elevate passenger engagement and digital entertainment.",
    tags: ['Aviation', 'Systems Thinking', 'Product Strategy'],
  },
  {
    number: '4',
    title: 'Heru YC S19',
    slug: 'heru-yc-s19',
    description: 'Redesigning top of funnel onboarding to build user trust and boost tax credential linkage.',
    tags: ['Fintech', 'UX Strategy', 'Onboarding'],
  },
  {
    number: '5',
    title: 'Rocket Companies | Quicken Loans',
    slug: 'rocket-companies',
    hasLockIcon: true,
    description: 'Rebuilding Rocket’s mortgage digital platform to eliminate fragmented friction and build trust.',
    tags: ['Mortgages', 'UX Strategy', 'Systems Thinking'],
  },
  {
    number: '6',
    title: 'Just Be',
    slug: 'just-be',
    isPrivate: true,
    hasNorthEastIcon: true,
    description: 'Space where design, technology and craftsmanship converge to build with intention, not obligation.',
    tags: ['Exploration'],
  },
];
