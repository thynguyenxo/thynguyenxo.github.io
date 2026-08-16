/**
 * Single source of truth for site-wide details and the project list.
 * Adding a project means adding one entry to `projects` — the homepage card
 * grid and the project page it links to both read from here.
 */

export const site = {
  name: 'Thy Nguyen',
  pronunciation: '/tea-win/',
  role: 'Product designer',
  email: 'thynguyenxo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/thynguyenxo/',
  /**
   * Web3Forms access key for the footer contact form. This is a public
   * identifier, not a secret — it is meant to be visible in client-side code,
   * and it only permits submissions that are delivered to the address
   * registered with it. While it is empty the form falls back to opening the
   * visitor's mail client.
   */
  formAccessKey: '6fb366f2-e453-47a2-bd01-44c0b63ee431',
} as const;

export interface Project {
  /** URL segment; the page lives at /<slug>. */
  slug: string;
  /** Client or product name, shown above the title. */
  client: string;
  /** Card headline. */
  title: string;
  /** Card summary. */
  description: string;
  /** Path to the cover image, relative to src/assets/. */
  cover: string;
  /**
   * Optional dark-mode cover, relative to src/assets/. When set, the card
   * swaps to it with the theme; when absent, `cover` is used for both.
   */
  coverDark?: string;
  /** Describes the cover for screen readers. */
  coverAlt: string;
}

export const projects: Project[] = [
  {
    slug: 'tenmin',
    client: 'Tenmin',
    title:
      'Reimagined the onboarding experience to build trust with an AI tutor',
    description:
      'I designed the onboarding experience for an AI-powered language learning mobile app that helps build emotional trust with an AI tutor and a review screen that makes daily practice feel effortless and rewarding.',
    cover: 'tenmin-light.webp',
    coverDark: 'tenmin-dark.webp',
    coverAlt:
      'Three Tenmin app screens showing the speaking-practice onboarding flow',
  },
];
