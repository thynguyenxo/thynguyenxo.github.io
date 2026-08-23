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
  /** Case study content. Absent while a project has no write-up yet. */
  study?: CaseStudy;
}

export interface CaseStudy {
  /** One-line summary under the project name. */
  standfirst: string;
  /** Opening paragraphs. */
  intro: string[];
  /**
   * Overrides the intro layout. Two or more paragraphs are set side by side
   * by default and a lone one is left full width, so this is only needed to
   * force the other shape.
   */
  introColumns?: boolean;
  /**
   * The metadata rail. Every case study uses the same four labels so the
   * intro reads identically across projects; the page sorts them into this
   * order, so the order they are listed in here does not matter. A study
   * may omit a fact it has nothing to say for.
   */
  facts: {
    label: 'Team' | 'Role' | 'Timeline' | 'Focus';
    values: string[];
    /**
     * Avatars shown in place of text values, from
     * src/assets/<slug>/team/. Used for the team credit, where the faces
     * carry the line and a list of names would not. A `src` containing a
     * slash is read from the assets root instead, so a person on two
     * studies is credited from one image rather than a copy per project.
     */
    avatars?: { src: string; alt: string }[];
  }[];
  /**
   * The demo above the write-up. Optional: a study whose work is better
   * shown inside the sections opens on the problem instead.
   */
  preview?: {
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
  /** The opening section. A StudySection like any other. */
  problem: StudySection;
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
  /**
   * Turns a phrase within `caption` into a link — used to credit a source.
   * `text` must appear in the caption verbatim; if it does not, the caption
   * still renders, just without the link.
   */
  captionLink?: { text: string; href: string };
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
  /**
   * Puts an unlabelled section in the table of contents under this name,
   * without printing a label on the page. For a section whose opening line
   * already names it, so a label above would only repeat it.
   */
  tocLabel?: string;
  /** Larger opening line beneath the label. */
  lead?: string;
  /** Body paragraphs. */
  body?: string[];
  /** Disclosure list, for sections that enumerate outcomes or features. */
  accordion?: { title: string; body: string }[];
  /**
   * A row of findings on raised panels, for sections that enumerate what
   * research uncovered. Each card's icon lives in src/assets/<slug>/;
   * omitting it leaves a placeholder.
   */
  cards?: { title: string; caption: string; icon?: string; iconAlt?: string }[];
  /**
   * The section's images. A section reads text first, then its media, so
   * these sit below the copy inside the same section — use `mediaBefore` for
   * the exception where a picture has to set the scene first.
   */
  media?: StudyMedia[];
  /**
   * Media shown above the section's text, for a picture that sets up what
   * the copy then explains. The exception rather than the rule.
   */
  mediaBefore?: StudyMedia[];
  /** Framing question, set apart at the end of the section. */
  dialog?: { label: string; question: string };
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
  },
  {
    slug: 'diehl-metering',
    client: 'Diehl Metering',
    tagline: 'Utility metering software',
    title: 'Building an accessible color system for meter data',
    description:
      'I extended Diehl Metering\u2019s design system, building out components and rebuilding the color layer on semantic tokens with a switchable mode for red-green color deficiency.',
    coverAlt: 'Diehl Metering case study cover',
    study: {
      standfirst: 'Standfirst to come',
      intro: [
        'Placeholder intro. Replace with what the product is and who it is for.',
        'I extended Diehl Metering\u2019s design system across two products, building out the token foundation, chart patterns, and iconography, including a switchable color mode that keeps status readable with red-green color deficiency.',
      ],
      facts: [
        { label: 'Role', values: ['UI Designer'] },
        { label: 'Timeline', values: ['April \u2014 October 2025'] },
        { label: 'Focus', values: ['Focus areas to come'] },
      ],
      problem: {
        label: 'Problem',
        lead: 'Lead sentence to come.',
        body: ['Placeholder body. Replace with the case study copy.'],
      },
      sections: [
        {
          label: 'Process',
          lead: 'Lead sentence to come.',
          body: ['Placeholder body. Replace with the case study copy.'],
          media: [{ ratio: '16 / 9' }],
        },
        {
          label: 'Solution',
          lead: 'Lead sentence to come.',
          body: ['Placeholder body. Replace with the case study copy.'],
          media: [{ ratio: '16 / 9' }],
        },
        {
          label: 'Where it stands',
          lead: 'Lead sentence to come.',
          body: ['Placeholder body. Replace with the case study copy.'],
        },
      ],
    },
  },
  {
    slug: 'tenmin',
    client: 'Tenmin',
    tagline: 'AI-powered language learning app',
    title:
      'Introducing the AI tutor before the first lesson',
    description:
      'I redesigned the onboarding for an AI language learning app so learners meet the tutor before they are asked to talk to it, and rebuilt the review screen to carry that tone into daily use.',
    cover: 'tenmin/thumbnail.png',
    coverAlt:
      'Three Tenmin app screens showing the speaking-practice onboarding flow',
    study: {
      standfirst:
        'Reshaping onboarding around an AI tutor learners never met',
      intro: [
        'Tenmin is an AI-powered language learning app built around speaking rather than memorization. Learners get real-time pronunciation feedback, personalized lessons, and conversation practice that simulates real interactions.',
        'I led design and prototyping for the onboarding flow, working closely with the founders, PM, and fellow designers. I also redesigned the review home screen so the tone established in onboarding carried through to daily use.',
      ],
      facts: [
        {
          label: 'Team',
          values: [],
          avatars: [
            { src: 'member-1.png', alt: 'Nadia Lee' },
            { src: 'member-2.png', alt: 'Mauricio Rivero Pooley' },
            { src: 'member-3.png', alt: 'Thy Nguyen' },
            { src: 'member-4.png', alt: 'Juna Han' },
          ],
        },
        { label: 'Role', values: ['UX/UI Designer'] },
        { label: 'Timeline', values: ['April \u2014 July 2025'] },
        { label: 'Focus', values: ['Interaction Design', 'Visual Direction', 'Prototyping'] },
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
        // The lead already reads "Problem", so the outline lists it without
        // a label repeating the word above it.
        tocLabel: 'Problem',
        lead: 'Problem',
        body: [
          'Tenmin\u2019s original onboarding asked learners to sign in before it explained anything, then moved through five screens of taps and typed input. The AI tutor is the reason the product exists. It first appeared on screen four, as a dropdown setting for which language it should speak in.',
          'Learners reached their first conversation without knowing who they were about to talk to, and the first thing the app asked them to do was speak out loud to it.',
        ],
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
          lead: 'Learners didn\u2019t realize who the AI tutor was until they were already in a lesson. None of the competitors I looked at introduced it any earlier.',
          body: [
            'I looked at onboarding in five language-learning apps. Two patterns showed up: some rushed learners to signup as fast as possible, while others opened with feature lists. In both cases the AI showed up as a feature to list, not someone to meet.',
            'The two learners I interviewed described the same thing from the other side. Both said they would have felt more at ease starting the first lesson if they had met the tutor beforehand. That shifted how I thought about the problem. Learners didn\u2019t just need a better explanation of what the tutor could do, they also needed to actually meet it first.'
          ],
          dialog: {
            label: 'How might we?',
            question:
              'How might we create an emotional connection between the learner and the AI tutor from the very first tap?',
          },
        },
        {
          label: 'Solution',
          lead: 'The flow now introduces the tutor before it asks for anything.',
          body: [
            'Four screens now come before the account gate. The first two show what Tenmin is and who the tutor is; the next two cover social proof and what learners get out of it. Sign-in, course selection, and the first lesson all come after.',
            'Tenmin\u2019s brand had to hold two things at once: enough polish to be credible as a learning tool and enough warmth that talking to it didn\u2019t feel transactional. The team explored that tension together. My part was translating it into the onboarding, where the tutor makes its first impression and the tone does the most work. I produced the illustrations by prompting AI tools, iterating until the output landed on the warm side of that line.',
          ],
          accordion: [
            {
              title: 'Social proof before the account gate',
              body: 'Social proof moves up to the third screen, so learners see that other people use Tenmin before they\u2019re asked to sign up.',
            },
            {
              title: 'Recording your name, not just typing it',
              body: 'The original flow collected the learner\u2019s name through a keyboard. I added a voice recording alongside it, so learners can type or say their name. Recording it lets the tutor greet them using their own pronunciation, and gives them a chance to use their voice in the app before the first lesson.',
            },
            {
              title: 'A review screen that shows what is waiting',
              body: 'Phrasebook and Smart Quiz now carry card counts and time estimates, so the next action is visible before tapping into it.',
            },
          ],
          media: [
            {
              videoSrc: '/tenmin/tenmin-redesign.mp4',
              poster: 'tenmin-redesign-poster.png',
              alt: 'Walkthrough of the redesigned Tenmin onboarding and review screens',
              ratio: '16 / 9',
            },
            {
              src: 'after-onboarding.png',
              alt: 'The full redesigned onboarding flow shown end to end',
              ratio: '120 / 73',
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
            {
              src: 'design-assets.png',
              alt: 'Illustration and component assets from the Tenmin design system',
              ratio: '120 / 73',
            },
          ]
        },
        {
          label: 'Outcomes',
          lead: 'All three test participants could describe who their tutor was before reaching the first lesson.',
          body: [
            'I tested the flow with three language learners. All three could describe the tutor and what it would do before reaching the first lesson. That was the specific failure in the original flow.',
            'Tenmin later shipped the illustration direction, the microcopy, and the reordered flow that puts value before the account gate. The name recording did not make it into the build.'
          ],
          media: [
            {
              src: 'tenmin-implementation.png',
              alt: 'Tenmin\u2019s shipped onboarding, with value propositions shown before sign-in',
              ratio: '120 / 73',
              caption:
                'Tenmin\u2019s shipped onboarding. Value props now precede sign-in. Courtesy of tenmin.ai',
              captionLink: {
                text: 'tenmin.ai',
                href: 'https://apps.apple.com/us/app/tenmin-language-learning/id6742799082',
              },
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'muunai',
    client: 'muunai',
    tagline: 'AI-powered medical documentation',
    title: 'Making the AI\u2019s draft easier to read, edit, and sign off on',
    description:
      'I redesigned the report page of an AI medical documentation tool, restructuring how doctors review, edit, and finalize AI-generated notes and built the component library the product didn\u2019t have.',
    cover: 'muunai/thumbnail.png',
    coverAlt: 'muunai case study cover',
    study: {
      standfirst:
        'Making the AI\u2019s draft easier to read, edit, and sign off on',
      intro: [
        'muunai is a Munich-based med-tech startup building an AI documentation tool for doctors. Clinicians record a patient conversation and the app generates a structured medical report they can edit and finalize.',
        'I was one of three designers on a two-month engagement. I owned the redesign of the report page, where doctors review and finalize what the AI model produced. I also built the component library the product didn\u2019t have.',
      ],
      facts: [
        {
          label: 'Team',
          values: [],
          avatars: [
            // A copy rather than the Tenmin portrait, framed slightly
            // tighter so the face reads at avatar size.
            { src: 'member-1.png', alt: 'Thy Nguyen' },
            { src: 'member-2.png', alt: 'Karin Oberreiter' },
            { src: 'member-3.png', alt: '\u00d6zge Belg\u00fcl' },
          ],
        },
        { label: 'Role', values: ['UX/UI Designer'] },
        { label: 'Timeline', values: ['Oct 2024 \u2014 Jan 2025'] },
        { label: 'Focus', values: ['Information Architecture', 'Design Systems'] },
      ],
      problem: {
        label: 'Problem',
        media: [
          {
            src: 'before.png',
            alt: 'The original muunai report interface before the redesign',
            ratio: '1220 / 319',
          },
        ],
        lead: 'Doctors couldn\u2019t tell where the report ended and the editing tools began, and the button that sent a finished report to a patient file was an icon in the corner.',
        body: [
          'We ran task-based sessions with three medical students, asking each to create a report, edit a section, and finalize and send it. Students rather than practicing doctors, partly because doctors were hard to get time with, but also because none of them had seen the app before, which is exactly the first-run experience we were trying to fix. All three struggled in the same three places:',
        ],
        cards: [
          {
            title: 'Unintuitive layout and navigation',
            caption: 'Users didn\u2019t know where to start.',
            icon: 'confused-face.svg',
          },
          {
            title: 'Overwhelming Smart Edit feature',
            caption: 'Users didn\u2019t fully understand how it worked.',
            icon: 'sparkle.svg',
          },
          {
            title: 'Unclear report finalization',
            caption: 'Save/send buttons were hard to locate and interpret.',
            icon: 'progress-bar.svg',
          },
        ],
        dialog: {
          label: 'How might we?',
          question:
            'How might we help users recognize Smart Edit as an AI tool that restructures their content, without adding confusion to a document they have to sign off on?',
        },
      },
      sections: [
        {
          label: 'Process',
          lead: 'Two things had to happen before I could redesign the report page: figuring out the layout, and building the pieces to make it with.',
          body: [
            'I wireframed layouts to test one idea: separating what the doctor puts in from what the AI produces, so the two are never visually confused. The same goal shaped the home page, where I defined the usability improvements while another designer built the UI: collapse the sidebar, reveal fields progressively, keep less on screen at any one moment.',
            'muunai had a palette and typography but no component library. I built one, covering button states, card styles, and form layouts, so the redesign stayed consistent with the existing product and the team had something to build on afterward.',
          ],
          media: [
            {
              src: 'wireframe.png',
              alt: 'Low-fidelity wireframes exploring the report page layout',
              ratio: '120 / 73',
            },
            {
              src: 'style-guide.png',
              alt: 'Component library built for muunai',
              ratio: '16 / 9',
              caption:
                'Button states, cards, and form layouts, built on muunai\u2019s existing palette and typography.',
            },
          ],
        },
        {
          label: 'Solution',
          lead: 'The report page now separates what the doctor puts in from what the AI produces.',
          body: [
            'Input sits on the left, the generated report on the right, with section dividers marking where one part of the document ends and the next begins. Save and send moved to where the doctor finishes reading rather than the corner they started in.',
          ],
          accordion: [
            {
              title: 'A report you can move through in order',
              body: 'Section dividers give the report visible structure, so a doctor scanning for the part they need can find it without reading the whole document. The layout follows the order they work in: review, edit, finalize.',
            },
            {
              title: 'Smart Edit where you expect it',
              body: 'The Smart Edit panel moved next to the report section it edits, and narrowed so the report stays the widest thing on screen. The tool assists the document rather than competing with it for attention.'
            },
            {
              title: 'Save and send as buttons, not icons',
              body: 'The two actions that commit a report to a patient file were icons in the top-right corner. They are now labeled buttons at the bottom of the report, where the doctor arrives after reading it.'
            },
          ],
          media: [
            {
              videoSrc: '/muunai/final-prototype.mp4',
              alt: 'Walkthrough of the redesigned muunai report page',
              ratio: '16 / 9',
            },
            {
              src: 'after-1.png',
              alt: 'The redesigned report page, first view',
              ratio: '4 / 3',
            },
            {
              src: 'after-2.png',
              alt: 'The redesigned report page, second view',
              ratio: '4 / 3',
            },
            {
              src: 'after-3.png',
              alt: 'The redesigned report page, third view',
              ratio: '4 / 3',
            },
          ],
        },
        {
          label: 'Where it stands',
          lead: 'The redesign wasn\u2019t implemented during our engagement, and we didn\u2019t get to test it with the people who would use it.',
          body: [
            'Our research ran with three medical students standing in for practicing doctors. They were good proxies for first-run comprehension, since none of them had seen the app before, but they don\u2019t carry a doctor\u2019s time pressure or the weight of signing a clinical document. Validating the redesign would mean putting it in front of working clinicians.',
            'The harder problem went unsolved. We made Smart Edit easier to find and less visually noisy, but a doctor still can\u2019t see at a glance which words the AI wrote and which are their own. In a document they sign their name to, that distinction is the thing worth designing for, and it\u2019s where I\u2019d start if I picked this up again.',
          ],
        },
      ],
    },
  },
];
