export type FragmentType = 'note' | 'screenshot' | 'link' | 'voice' | 'memory' | 'reminder';

export type Fragment = {
  id: string;
  title: string;
  type: FragmentType;
  source: string;
  savedAt: string;
  preview: string;
  body: string;
  constellation: string;
  emotionalWeight: 'quiet' | 'warm' | 'heavy';
  whyResurfaced: string;
  whyItMayMatter: string;
  nextStepLabel: string;
  nextStepHref: string;
  people?: string[];
  project?: string;
  place?: string;
  tags: string[];
};

export type Constellation = {
  slug: string;
  name: string;
  subtitle: string;
  color: string;
  accent: string;
  prompt: string;
  fragments: string[];
  orbit: Array<{ id: string; x: string; y: string }>;
  reasoning: string[];
};

export type PersonThread = {
  id: string;
  name: string;
  relationship: string;
  context: string;
  lowPressurePrompt: string;
  draftMessages: string[];
};

export const personThreads: Record<string, PersonThread> = {
  maya: {
    id: 'maya',
    name: 'Maya',
    relationship: 'friend from studio class',
    context: 'You saved this after Maya sent you voice notes about feeling burnt out near finals.',
    lowPressurePrompt: 'This came from a moment when connection mattered more than urgency. A simple check-in may be enough.',
    draftMessages: [
      'Hey Maya, this reminded me of you. No pressure to reply quickly, just wanted to say hi.',
      'I found the note I saved after our last conversation. Want to do a short catch-up this week?',
      'Random but I came across this and thought of you. Hope your week is feeling gentler.'
    ]
  },
  dad: {
    id: 'dad',
    name: 'Dad',
    relationship: 'parent',
    context: 'This gift idea was saved after noticing he kept fixing records by hand at home.',
    lowPressurePrompt: 'Not every resurfaced fragment needs urgency. Some just need a better moment to act on them.',
    draftMessages: [
      'I remembered a gift idea I never followed through on. It made me think of you.',
      'This resurfaced today and felt worth keeping around for your birthday.',
      'I found that record-care note again. It still feels very you.'
    ]
  }
};

export const fragments: Fragment[] = [
  {
    id: 'recipe-screenshot',
    title: 'Miso butter noodles screenshot',
    type: 'screenshot',
    source: 'Camera roll',
    savedAt: 'Saved 18 days ago',
    preview: 'A recipe screenshot from a night you promised yourself slower dinners.',
    body: 'Screenshot of a warm, low-effort recipe you saved during midterms because you wanted one thing in the week to feel cared for.',
    constellation: 'small-life-orbits',
    emotionalWeight: 'warm',
    whyResurfaced: 'It has not been revisited since a stressful week, and it overlaps with other fragments about rest and resetting routines.',
    whyItMayMatter: 'This might matter because it was less about food and more about making ordinary life feel gentler again.',
    nextStepLabel: 'Plan this for Friday night',
    nextStepHref: '/fragments/recipe-screenshot',
    place: 'Apartment kitchen',
    tags: ['routine', 'care', 'recipe']
  },
  {
    id: 'class-article',
    title: 'Mutual aid article for class project',
    type: 'link',
    source: 'Saved tab',
    savedAt: 'Saved 22 days ago',
    preview: 'An article you meant to turn into a studio concept, then lost under other deadlines.',
    body: 'A link about neighborhood mutual aid models that you bookmarked while thinking about what “care infrastructure” could look like in your research project.',
    constellation: 'unfinished-futures',
    emotionalWeight: 'quiet',
    whyResurfaced: 'It shares language with your internship bookmark and a later voice note about designing for overlooked needs.',
    whyItMayMatter: 'This seems connected to work you keep circling back to whenever you imagine a more meaningful design direction.',
    nextStepLabel: 'Reopen the project thread',
    nextStepHref: '/fragments/class-article',
    project: 'Community futures studio',
    tags: ['class', 'research', 'civic']
  },
  {
    id: 'startup-voice-note',
    title: 'Voice note: ambient accountability idea',
    type: 'voice',
    source: 'Voice memo',
    savedAt: 'Saved 11 days ago',
    preview: 'A half-whispered startup idea recorded while walking home at night.',
    body: 'Voice thought about a product that helps students follow through together without turning support into surveillance.',
    constellation: 'unfinished-futures',
    emotionalWeight: 'warm',
    whyResurfaced: 'The idea appeared again in your internship link and in a random thought about unfinished intentions.',
    whyItMayMatter: 'This may matter because it keeps resurfacing whenever you think about products that are gentle instead of extractive.',
    nextStepLabel: 'Sketch the concept again',
    nextStepHref: '/fragments/startup-voice-note',
    project: 'Possible side project',
    tags: ['startup', 'voice', 'care']
  },
  {
    id: 'maya-reminder',
    title: 'Reminder to text Maya back',
    type: 'reminder',
    source: 'Quick capture',
    savedAt: 'Saved 9 days ago',
    preview: 'A note from after a conversation that felt important but got interrupted by the week.',
    body: 'Reminder to follow up with Maya after she opened up about how lonely group projects had been feeling.',
    constellation: 'people-to-return-to',
    emotionalWeight: 'heavy',
    whyResurfaced: 'It was tied to a moment of care, but no follow-up happened. People-related fragments are resurfaced gently when silence becomes a pattern.',
    whyItMayMatter: 'This likely matters because the original intention was relational, not administrative.',
    nextStepLabel: 'Open reconnect flow',
    nextStepHref: '/reconnect/maya-reminder',
    people: ['maya'],
    tags: ['friendship', 'care', 'follow-up']
  },
  {
    id: 'travel-list',
    title: 'Half-finished Joshua Tree list',
    type: 'note',
    source: 'Notes import',
    savedAt: 'Saved 35 days ago',
    preview: 'A trip list that still carries the feeling of needing room to breathe.',
    body: 'Packing list with “film camera, orange sweater, camp coffee, no laptop if possible” written across three unfinished bullets.',
    constellation: 'small-life-orbits',
    emotionalWeight: 'warm',
    whyResurfaced: 'It clusters with fragments about rest and ordinary pleasure rather than pure logistics.',
    whyItMayMatter: 'This might relate to a version of you that wanted space, not just a completed trip plan.',
    nextStepLabel: 'Save one part of this plan',
    nextStepHref: '/fragments/travel-list',
    place: 'Joshua Tree',
    tags: ['travel', 'rest', 'future-self']
  },
  {
    id: 'difficult-week-quote',
    title: 'Quote saved during a difficult week',
    type: 'memory',
    source: 'Highlight',
    savedAt: 'Saved 27 days ago',
    preview: '“Rest is not a reward. It is a return.”',
    body: 'A line you saved at 1:14 a.m. after writing that everything felt loud and strangely far away.',
    constellation: 'quiet-signals',
    emotionalWeight: 'heavy',
    whyResurfaced: 'This quote overlaps with your burnout note and several fragments that point to exhaustion rather than lack of motivation.',
    whyItMayMatter: 'This seems less like inspiration and more like a signal you were trying to leave for yourself.',
    nextStepLabel: 'Read the surrounding note',
    nextStepHref: '/fragments/difficult-week-quote',
    tags: ['quote', 'burnout', 'care']
  },
  {
    id: 'dad-gift-idea',
    title: 'Birthday gift idea: vinyl cleaning kit',
    type: 'note',
    source: 'Quick note',
    savedAt: 'Saved 48 days ago',
    preview: 'A small idea that says you were paying attention.',
    body: 'Gift note saved after noticing Dad had improvised a record cleaning setup out of an old T-shirt and bowl of warm water.',
    constellation: 'people-to-return-to',
    emotionalWeight: 'warm',
    whyResurfaced: 'It sat beside reminders for other people you meant to return to, suggesting a broader pattern of relationship fragments going quiet.',
    whyItMayMatter: 'It may matter because it captured a very specific kind of care: noticing what someone would never ask for directly.',
    nextStepLabel: 'Keep this close for later',
    nextStepHref: '/fragments/dad-gift-idea',
    people: ['dad'],
    tags: ['gift', 'family', 'attention']
  },
  {
    id: 'internship-link',
    title: 'Civic design internship link',
    type: 'link',
    source: 'Saved job board tab',
    savedAt: 'Saved 13 days ago',
    preview: 'A role that felt exciting because it sounded like meaning, not just prestige.',
    body: 'Internship posting for a design research role focused on public interest systems and community trust.',
    constellation: 'unfinished-futures',
    emotionalWeight: 'quiet',
    whyResurfaced: 'It lines up with your studio article and startup voice note, all pointing toward care-centered work.',
    whyItMayMatter: 'This might represent a direction you keep naming indirectly across projects and ideas.',
    nextStepLabel: 'Compare it to your other future-facing fragments',
    nextStepHref: '/fragments/internship-link',
    project: 'Career direction',
    tags: ['career', 'internship', 'research']
  },
  {
    id: 'burnout-note',
    title: 'Journal note about burnout',
    type: 'note',
    source: 'Private note',
    savedAt: 'Saved 24 days ago',
    preview: '“I think I am not losing motivation. I am losing the shape of what I cared about.”',
    body: 'A private note written after moving between tabs, tasks, and deadlines until everything started to feel equally urgent and equally flat.',
    constellation: 'quiet-signals',
    emotionalWeight: 'heavy',
    whyResurfaced: 'It shares direct language with your saved quote and several fragments about wanting slower, more coherent work.',
    whyItMayMatter: 'This likely matters because it reframes burnout as fragmented meaning rather than laziness or poor discipline.',
    nextStepLabel: 'Open reflection mode',
    nextStepHref: '/reflection',
    tags: ['burnout', 'journal', 'signal']
  },
  {
    id: 'unfinished-intentions-thought',
    title: 'Random thought: what if lost tabs are unfinished intentions?',
    type: 'memory',
    source: 'Lock screen capture',
    savedAt: 'Saved 7 days ago',
    preview: 'A stray thought that quietly connects your class work, product ideas, and burnout note.',
    body: 'One-line thought saved at a red light: maybe the problem is not tab overload, maybe it is that every tab carries a version of who you meant to become.',
    constellation: 'quiet-signals',
    emotionalWeight: 'warm',
    whyResurfaced: 'This fragment acts like a bridge between reflective notes and your future-facing project ideas.',
    whyItMayMatter: 'This may be the clearest articulation of the product territory you keep rediscovering from different angles.',
    nextStepLabel: 'Trace the bigger pattern',
    nextStepHref: '/fragments/unfinished-intentions-thought',
    project: 'Constellation concept seed',
    tags: ['insight', 'product', 'meaning']
  }
];

export const constellations: Constellation[] = [
  {
    slug: 'unfinished-futures',
    name: 'Unfinished Futures',
    subtitle: 'Fragments that keep pointing toward work with more meaning.',
    color: '#a8d9ff',
    accent: 'from-sky-300/30 via-cyan-200/10 to-transparent',
    prompt: 'These fragments appeared in different contexts, but they all point toward a future direction you have named more than once.',
    fragments: ['class-article', 'startup-voice-note', 'internship-link'],
    orbit: [
      { id: 'class-article', x: '18%', y: '25%' },
      { id: 'startup-voice-note', x: '72%', y: '22%' },
      { id: 'internship-link', x: '58%', y: '70%' }
    ],
    reasoning: [
      'All three fragments reference care-centered work.',
      'They span class, career, and side-project contexts.',
      'They suggest a repeated interest, not a one-off save.'
    ]
  },
  {
    slug: 'people-to-return-to',
    name: 'People To Return To',
    subtitle: 'Relationship fragments that mattered quietly, then drifted.',
    color: '#ffd7a8',
    accent: 'from-amber-200/30 via-rose-200/10 to-transparent',
    prompt: 'These fragments are relational, low urgency, and easy to lose even when they matter emotionally.',
    fragments: ['maya-reminder', 'dad-gift-idea'],
    orbit: [
      { id: 'maya-reminder', x: '24%', y: '30%' },
      { id: 'dad-gift-idea', x: '66%', y: '62%' }
    ],
    reasoning: [
      'Both were saved because you noticed another person closely.',
      'Neither became an explicit task, so both drifted.',
      'A gentle return is more appropriate than a hard reminder.'
    ]
  },
  {
    slug: 'small-life-orbits',
    name: 'Small Life Orbits',
    subtitle: 'Fragments about ordinary rituals that make life feel inhabited again.',
    color: '#d8c6ff',
    accent: 'from-violet-200/25 via-fuchsia-200/10 to-transparent',
    prompt: 'These are not big goals. They are small acts of care that help your days feel like yours again.',
    fragments: ['recipe-screenshot', 'travel-list'],
    orbit: [
      { id: 'recipe-screenshot', x: '25%', y: '28%' },
      { id: 'travel-list', x: '68%', y: '58%' }
    ],
    reasoning: [
      'Both fragments revolve around restoration rather than achievement.',
      'They reflect how the user imagines comfort, not just plans.',
      'They become meaningful when resurfaced with emotional context.'
    ]
  },
  {
    slug: 'quiet-signals',
    name: 'Quiet Signals',
    subtitle: 'Fragments that hint at burnout, longing, and the need to reassemble meaning.',
    color: '#f4e7b6',
    accent: 'from-yellow-100/20 via-orange-100/10 to-transparent',
    prompt: 'These fragments do not look urgent, but together they reveal a pattern about how scattered life has been feeling.',
    fragments: ['difficult-week-quote', 'burnout-note', 'unfinished-intentions-thought'],
    orbit: [
      { id: 'difficult-week-quote', x: '16%', y: '58%' },
      { id: 'burnout-note', x: '44%', y: '18%' },
      { id: 'unfinished-intentions-thought', x: '73%', y: '55%' }
    ],
    reasoning: [
      'The language overlaps around rest, meaning, and fragmentation.',
      'These fragments reveal a repeated internal state, not isolated saves.',
      'Surfacing them together creates a more truthful picture than any one note alone.'
    ]
  }
];

export const weeklyReflection = {
  title: 'Found Again',
  summary: 'This week, three resurfaced fragments pointed to the same thing: you have not been losing motivation. You have been losing coherence.',
  carryForward: 'Keep one future-facing idea, one relationship fragment, and one ritual of care in view next week. Let the rest rest.',
  highlights: [
    'A class article, an internship link, and a voice note all pointed to care-centered work.',
    'A saved quote and a journal note both described exhaustion as disconnection, not failure.',
    'A recipe screenshot and travel list both carried a quieter intention: make daily life feel inhabitable again.'
  ]
};

export const captureOptions = [
  {
    id: 'note',
    label: 'Text note',
    prompt: 'A thought you do not want to lose the shape of.'
  },
  {
    id: 'screenshot',
    label: 'Screenshot',
    prompt: 'A visual fragment that mattered for more than information.'
  },
  {
    id: 'link',
    label: 'Link',
    prompt: 'Something you meant to return to when you had space.'
  },
  {
    id: 'voice',
    label: 'Voice thought',
    prompt: 'A quick thought recorded before it could disappear.'
  },
  {
    id: 'memory',
    label: 'Memory prompt',
    prompt: 'A line, feeling, or moment worth keeping visible.'
  },
  {
    id: 'reminder',
    label: 'Person-based reminder',
    prompt: 'A relationship thread you meant to pick back up.'
  }
] as const;

export const resurfacedTonight = fragments.find((fragment) => fragment.id === 'maya-reminder')!;

export function getConstellation(slug: string) {
  return constellations.find((constellation) => constellation.slug === slug);
}

export function getFragment(id: string) {
  return fragments.find((fragment) => fragment.id === id);
}

export function getConstellationFragments(slug: string) {
  return fragments.filter((fragment) => fragment.constellation === slug);
}

export const demoFallbackOutputs = {
  cluster: {
    headline: 'Possible constellation',
    body: 'These fragments might belong together because they all point toward a future-facing intention that has resurfaced more than once.'
  },
  context: {
    headline: 'Why this may matter',
    body: 'This fragment seems connected to a promise you made to yourself in a different context. It may be resurfacing because the intention was never fully closed.'
  },
  reflection: {
    headline: 'Gentle reflection',
    body: 'This idea appeared across multiple saves. It may still matter, even if the form changes.'
  },
  reconnect: {
    headline: 'Low-pressure next step',
    body: 'This person-related fragment may not need urgency. A small, honest message could be enough.'
  }
} as const;
