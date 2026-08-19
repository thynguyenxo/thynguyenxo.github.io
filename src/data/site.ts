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
  /** Path to the cover image, relative to src/assets/. Omit for a placeholder. */
  cover?: string;
  /**
   * Optional dark-mode cover, relative to src/assets/. When set, the card
   * swaps to it with the theme; when absent, `cover` is used for both.
   */
  coverDark?: string;
  /** Describes the cover for screen readers. */
  coverAlt: string;
  /**
   * Puts the project page behind the shared password. The gate itself is
   * enforced at the edge by functions/_middleware.ts, which reads the same
   * slug list; this flag only drives the badge on the card, so a visitor
   * knows the link asks for a password before they click it.
   */
  protected?: boolean;
  /** Case study content. Absent while a project has no write-up yet. */
  study?: CaseStudy;
}

export interface CaseStudy {
  /** One-line summary under the project name. */
  standfirst: string;
  /** Opening paragraphs. */
  intro: string[];
  /** Set the opening paragraphs side by side instead of stacked. */
  introColumns?: boolean;
  /** The metadata rail: role, year, skills. */
  facts: {
    label: string;
    values: string[];
    /**
     * Avatars shown in place of text values, from
     * src/assets/<slug>/team/. Used for the team credit, where the faces
     * carry the line and a list of names would not.
     */
    avatars?: { src: string; alt: string }[];
  }[];
  preview: {
    /** Text on the outlined pill above the media. */
    tag: string;
    caption: string;
    /** Intrinsic size, as `width / height`. Sets the box before it loads. */
    ratio?: string;
    /** Video file under public/<slug>/, e.g. `quick-demo-intro.mp4`. */
    videoSrc?: string;
    /** Still in src/assets/<slug>/, shown before playback. */
    poster?: string;
    /** Describes the media for assistive tech. */
    alt?: string;
  };
  /**
   * The opening section. A StudySection like any other, plus the framing
   * question that closes it.
   */
  problem: StudySection & {
    dialog: { label: string; question: string };
  };
  /**
   * The sections that follow. Case studies name these differently —
   * Discovery, Process, Solution, Outcomes — so the name is content and the
   * layout is shared.
   */
  sections: StudySection[];
}

export interface StudyMedia {
  /** File in src/assets/<slug>/. Omit for a placeholder. */
  src?: string;
  /** Describes the image. Required once a real asset is supplied. */
  alt?: string;
  /** Intrinsic size, as `width / height`. Sets the box before it loads. */
  ratio: string;
  /** Optional caption beneath the frame. */
  caption?: string;
  /** Video rather than still. */
  video?: boolean;
  /**
   * Video file under public/<slug>/, e.g. `onboarding.mp4`. Video skips the
   * image pipeline, so it lives in public/ and is referenced by URL rather
   * than imported. Setting this implies `video`.
   */
  videoSrc?: string;
  /**
   * Still shown before playback, in src/assets/<slug>/. Without one the
   * frame sits empty until the first frame decodes, so supply it whenever
   * `videoSrc` is set.
   */
  poster?: string;
}

export interface StudySection {
  /**
   * Section name, shown as the small caption above the lead. Optional: a
   * section can open on its lead alone.
   */
  label?: string;
  /** Larger opening line beneath the label. */
  lead?: string;
  /** Body paragraphs. */
  body?: string[];
  /** Disclosure list, for sections that enumerate outcomes or features. */
  accordion?: { title: string; body: string }[];
  /** Media shown above the section, illustrating what it describes. */
  media?: StudyMedia[];
}

export const projects: Project[] = [
  {
    slug: 'iris',
    client: 'Iris',
    tagline: 'AI tutor for a learning management system',
    title: 'Redesigning the user experience to drive adoption',
    description:
      'I lead the UX redesign for Iris, an AI tutor, focusing on discoverability, onboarding, and prompt scaffolding. The project aims to enhance perceived usability and drive higher adoption rate among students and instructors.',
    coverAlt: 'Iris case study cover',
  },
  {
    slug: 'wemolo-driver',
    client: 'Wemolo',
    tagline: 'Parking management',
    title: 'Project title to come',
    description:
      'Placeholder description. Replace with the project summary once the case study copy is written.',
    coverAlt: 'Wemolo case study cover',
  },
  {
    slug: 'wemolo-ds',
    client: 'Wemolo',
    tagline: 'Parking management',
    title: 'Project title to come',
    description:
      'Placeholder description. Replace with the project summary once the case study copy is written.',
    coverAlt: 'Wemolo case study cover',
    protected: true,
  },
  {
    slug: 'tenmin',
    client: 'Tenmin',
    tagline: 'AI-powered language learning app',
    title:
      'Reimagined the onboarding experience to build trust with an AI tutor',
    description:
      'I designed the onboarding experience for an AI-powered language learning mobile app that helps build emotional trust with an AI tutor and a review screen that makes daily practice feel effortless and rewarding.',
    cover: 'tenmin.png',
    coverAlt:
      'Three Tenmin app screens showing the speaking-practice onboarding flow',
    study: {
      standfirst:
        'Reshaping onboarding around a tutor learners never met',
      introColumns: true,
      intro: [
        'Tenmin is an AI-powered language learning app built around speaking rather than memorization. Learners get real-time pronunciation feedback, personalized lessons, and conversation practice that simulates real interactions.',
        'I led design and prototyping for the onboarding flow, working closely with the founders, PM, and fellow designers. I also redesigned the review home screen so the tone established in onboarding carried through to daily use.',
      ],
      facts: [
        { label: 'Role', values: ['UX/UI Designer'] },
        {
          label: 'Team',
          values: [],
          avatars: [
            { src: 'member-1.png', alt: '' },
            { src: 'member-2.png', alt: '' },
            { src: 'member-3.png', alt: '' },
            { src: 'member-4.png', alt: '' },
          ],
        },
        { label: 'Year', values: ['April \u2014 July 2025'] },
        { label: 'Skills', values: ['UX Design', 'Prototyping'] },
      ],
      preview: {
        tag: 'Preview',
        caption: 'The redesigned onboarding flow',
        ratio: '665 / 436',
        videoSrc: '/tenmin/quick-demo-intro.mp4',
        poster: 'quick-demo-intro-poster.png',
        alt: 'Walkthrough of the redesigned Tenmin onboarding flow',
      },
      problem: {
        lead: 'Problem',
        body: [
          'Tenmin\u2019s original onboarding asked learners to sign in before it explained anything, then moved through five screens of taps and typed input. The AI tutor, the reason the product exists, first appeared as a dropdown setting for which language it should speak in.',
          'The result: learners reached their first conversation without knowing who they were about to talk to. In an app built on speaking out loud, that is the moment hesitation costs you a user.',
        ],
        dialog: {
          label: 'How might we?',
          question:
            'How might we create a warm and trust-building onboarding experience while keeping a brand identity that balances professionalism and youthful energy?',
        },
      },
      sections: [
        {
          label: 'Discovery',
          media: [
            {
              src: 'before-onboarding.png',
              alt: 'The original Tenmin onboarding screens before the redesign',
              ratio: '120 / 73',
            },
            {
              src: 'before-review-screen.png',
              alt: 'The original Tenmin review screen before the redesign',
              ratio: '120 / 73',
            },
          ],
          lead: 'User interviews revealed a key issue: many people didn\u2019t realize who or what the AI tutor was until later in the experience',
          body: [
            'Without that early clarity, it was harder for them to feel a personal connection and trust the experience.',
            'Additionally, our competitor analysis showed that most onboarding flows either rushed through introductions or overloaded users with feature lists, leaving little room to build rapport.',
          ],
        },
        {
          label: 'Process',
          media: [{ ratio: '1200 / 787', video: true }],
          lead: 'I worked closely with one of Tenmin\u2019s founders to align design ideas with technical capabilities, ensuring every concept we proposed could realistically be implemented',
          body: [
            'I also collaborated with the product manager and lead designer to explore different illustration styles, refine the tone of voice in microcopy, and map the onboarding journey to progressively reveal Tenmin\u2019s core value proposition.',
          ],
        },
        {
          label: 'Solution',
          lead: 'The goal was to design features that not only communicated Tenmin\u2019s value but also made the AI tutor feel approachable, supportive, and memorable from day one',
          accordion: [
            {
              title: 'An onboarding flow that builds trust',
              body: 'A 4-screen sequence that clearly communicates Tenmin\u2019s value, integrates social proof early, and uses bright illustrations with friendly microcopy to humanize the AI tutor.',
            },
            {
              title: 'Personalized welcome with name recording',
              body: 'Learners record their name during onboarding so the AI tutor can greet them by it, making the first session feel personal rather than transactional.',
            },
            {
              title: 'The Review screen that motivates daily practice',
              body: 'A redesigned home for daily review that makes progress legible at a glance and keeps the next action obvious.',
            },
          ],
        },
        {
          label: 'Outcomes',
          media: [
            {
              videoSrc: '/tenmin/tenmin-redesign.mp4',
              poster: 'tenmin-redesign-poster.png',
              alt: 'Walkthrough of the redesigned Tenmin onboarding and review screens',
              ratio: '16 / 9',
            },
            {
              src: 'onboarding-comparison.png',
              alt: 'The original and redesigned Tenmin onboarding shown side by side',
              ratio: '4 / 3',
            },
            {
              src: 'after-review-screen.png',
              alt: 'The redesigned Tenmin review screen',
              ratio: '4 / 3',
            },
          ],
          lead: 'Usability testing with three language learners showed positive feedback. Participants particularly liked the onboarding\u2019s tone, visuals, and clarity',
          body: [
            'While the designs were not implemented during our engagement, the projected outcomes based on testing include:',
          ],
          accordion: [
            {
              title: 'Memorable first impression',
              body: 'A warm, trust-building onboarding experience encourages users to return after their first session.',
            },
            {
              title: 'Daily engagement',
              body: 'A review screen that makes progress visible gives learners a reason to come back each day.',
            },
            {
              title: 'Humanized AI',
              body: 'Introducing the tutor early, by name and with personality, makes the AI feel like a companion rather than a tool.',
            },
          ],
        },
        {
          label: 'Retrospective',
          media: [
            {
              src: 'design-assets.png',
              alt: 'Illustration and component assets from the Tenmin design system',
              ratio: '120 / 73',
            },
            {
              src: 'after-onboarding-whole.png',
              alt: 'The full redesigned onboarding flow shown end to end',
              ratio: '4 / 3',
            },
            {
              src: 'after-onboarding-1.png',
              alt: 'Redesigned onboarding screens, first detail view',
              ratio: '120 / 73',
            },
            {
              src: 'after-onboarding-2.png',
              alt: 'Redesigned onboarding screens, second detail view',
              ratio: '120 / 73',
            },
          ],
          lead: 'Early feedback suggested that the onboarding fostered stronger emotional engagement and helped users quickly understand the AI tutor\u2019s role',
          body: [
            '\u273a When we presented the design at the Technical University of Munich, it was met with enthusiastic responses from founders and prospective users.',
            '\u273a Looking ahead, there\u2019s an opportunity to measure long-term retention, test alternative onboarding flows, and refine the illustration style to resonate with a broader global audience.',
          ],
        },
      ],
    },
  },
  {
    slug: 'muunai',
    client: 'muunai',
    tagline: 'AI-powered medical documentation',
    title: 'Making medical documentation intuitive for doctors',
    description:
      'Redesigning a med-tech web application to streamline medical documentation workflows, reduce cognitive load for doctors, and improve onboarding for new users.',
    coverAlt: 'muunai case study cover',
  },
];
