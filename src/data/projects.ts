export type Project = {
  number: string;
  title: string;
  slug: string;
  isPrivate?: boolean;
  hasExternalLink?: boolean;
};

export const projects: Project[] = [
  {
    number: '1',
    title: 'Toyota Racing Development',
    slug: 'toyota-racing-development',
    hasExternalLink: true,
  },
  {
    number: '2',
    title: 'AB InBev | Modelorama Expansion',
    slug: 'modelorama-expansion',
  },
  {
    number: '3',
    title: 'DELTA Air Lines',
    slug: 'delta-air-lines',
    hasExternalLink: true,
  },
  {
    number: '4',
    title: 'Heru YC S19',
    slug: 'heru-yc-s19',
  },
  {
    number: '5',
    title: 'Rocket Companies | Quicken Loans',
    slug: 'rocket-companies',
    hasExternalLink: true,
  },
  {
    number: '6',
    title: 'Just Be',
    slug: 'just-be',
    isPrivate: true,
  },
];
