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
  /** Short descriptor after the client name in the card eyebrow. */
  tagline?: string;
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
  /** Case study content. Absent while a project has no write-up yet. */
  study?: CaseStudy;
}

export interface CaseStudy {
  /** One-line summary under the project name. */
  standfirst: string;
  /** Opening paragraphs, shown as two columns. */
  intro: string[];
  /** The metadata rail: role, year, skills. */
  facts: { label: string; values: string[] }[];
  preview: {
    /** Text on the outlined pill above the media. */
    tag: string;
    caption: string;
  };
  problem: {
    label: string;
    /** Paragraphs before the framing question. */
    body: string[];
    dialog: { label: string; question: string };
  };
}

export const projects: Project[] = [
  {
    slug: 'tenmin',
    client: 'Tenmin',
    tagline: 'AI-powered language learning app',
    title:
      'Reimagined the onboarding experience to build trust with an AI tutor',
    description:
      'I designed the onboarding experience for an AI-powered language learning mobile app that helps build emotional trust with an AI tutor and a review screen that makes daily practice feel effortless and rewarding.',
    cover: 'tenmin.webp',
    coverAlt:
      'Three Tenmin app screens showing the speaking-practice onboarding flow',
    study: {
      standfirst:
        'designed an engaging onboarding experience and a review screen to help users build trust',
      intro: [
        'As one of three designers, I led the prototyping and design for the onboarding flow, collaborating closely with Tenmin\u2019s founders, product manager, and fellow designers.',
        'I also contributed to the redesign of the review home screen to ensure consistency in tone and visuals across the product.',
      ],
      facts: [
        { label: 'Role', values: ['UX/UI Designer'] },
        { label: 'Year', values: ['April \u2014 July 2025'] },
        { label: 'Skills', values: ['UX Design', 'Prototyping'] },
      ],
      preview: {
        tag: 'Preview',
        caption: 'The redesigned onboarding flow',
      },
      problem: {
        label: 'Problem',
        body: [
          'Many AI-powered language learning apps feel either overly robotic or disorganized, which can leave learners unmotivated. Onboarding experiences are often bloated, transactional, or forgettable, failing to inspire confidence or encourage return visits.',
          'Tenmin wanted to strike a balance between professional polish and youthful energy, while adding a human touch that makes their AI tutor approachable. The onboarding needed to create a sticky first impression, build trust in the AI, and set the tone for ongoing engagement.',
        ],
        dialog: {
          label: 'How might we?',
          question:
            'How might we create a warm and trust-building onboarding experience while keeping a brand identity that balances professionalism and youthful energy?',
        },
      },
    },
  },
];
