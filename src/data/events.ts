import type { EventData, Contact } from '../types/event';

export const events: EventData[] = [
  {
    id: 'quiz-corn',
    name: 'Quiz Corn',
    category: 'competition',
    mode: 'offline',
    description: 'An engaging quiz competition that explores diverse aspects of cinema, including films, actors, directors, music, and more.',
    contacts: [
      { name: 'Charan', phone: '+91 72008 19221' }
    ],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/events/quiz-corn.svg',
    gradient: 'from-amber-950/40 via-red-950/20 to-black'
  },
  {
    id: 'stills-of-soul',
    name: 'Stills of Soul',
    category: 'competition',
    mode: 'online',
    description: 'A photography competition where participants submit their best photographs online, with the top 10 teams shortlisted for the next round at the college.',
    contacts: [
      { name: 'Dhanuj', phone: '+91 98842 78279' },
      { name: 'Jeevaghan', phone: '+91 82207 66200' }
    ],
    registration: {
      commonFields: true,
      teamBased: false,
      additionalFields: [
        {
          id: 'photo-drive-link',
          label: 'Upload Photo — Google Drive Link',
          type: 'url',
          required: true,
          instruction: 'Ensure that the Google Drive link has appropriate viewing access.'
        }
      ]
    },
    image: '/images/events/stills-of-soul.svg',
    gradient: 'from-red-950/50 via-neutral-900 to-black'
  },
  {
    id: 'graphics-grid',
    name: 'Graphics Grid',
    category: 'competition',
    mode: 'online',
    description: 'A poster design competition where participants submit their best designs online, with the top 10 teams shortlisted for the next round at the college.',
    contacts: [
      { name: 'Dhanuj', phone: '+91 98842 78279' },
      { name: 'Jeevaghan', phone: '+91 82207 66200' }
    ],
    registration: {
      commonFields: true,
      teamBased: false,
      additionalFields: [
        {
          id: 'poster-upload',
          label: 'Upload Poster',
          type: 'file',
          required: true,
          accept: '.jpg,.jpeg,.png,.pdf',
          instruction: 'Accepted formats: JPG, JPEG, PNG, PDF'
        }
      ]
    },
    image: '/images/events/graphics-grid.svg',
    gradient: 'from-blue-950/40 via-purple-950/20 to-black'
  },
  {
    id: 'cineplus',
    name: 'Cineplus',
    category: 'competition',
    mode: 'online',
    description: 'A short film competition where teams submit their films online, with the top 3 teams selected and awarded at CIT.',
    contacts: [
      { name: 'Dhanuj', phone: '+91 98842 78279' },
      { name: 'Jeevaghan', phone: '+91 82207 66200' }
    ],
    registration: {
      commonFields: true,
      teamBased: false,
      additionalFields: [
        {
          id: 'video-upload',
          label: 'Upload 3-Minute Video',
          type: 'url',
          required: true,
          instruction: 'Provide a video submission link. Maximum duration: 3 minutes. Ensure the submitted video is accessible and playable.'
        }
      ]
    },
    image: '/images/events/cineplus.svg',
    gradient: 'from-amber-950/40 via-red-950/30 to-black'
  },
  {
    id: 'stage-play',
    name: 'Stage Play',
    category: 'competition',
    mode: 'offline',
    description: 'A theatrical competition where teams bring stories to life through creative scripts, impactful acting, expressive dialogues, and dynamic stage performances.',
    contacts: [
      { name: 'Sai Charan', phone: '+91 7397 466 351' }
    ],
    registration: {
      commonFields: true,
      teamBased: true,
      teamSize: { min: 1, max: 10 }
    },
    image: '/images/events/stage-play.svg',
    gradient: 'from-red-950/50 via-zinc-900 to-black'
  },
  {
    id: 'adaptune',
    name: 'Adaptune',
    category: 'competition',
    mode: 'offline',
    description: 'A dance competition where participants must adapt their moves to randomly changing songs and showcase their spontaneity and versatility.',
    contacts: [
      { name: 'Deepika', phone: '+91 97890 62268' }
    ],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/events/adaptune.svg',
    gradient: 'from-pink-950/40 via-purple-950/20 to-black'
  },
  {
    id: 'brainstorm',
    name: 'Brainstorm',
    category: 'competition',
    mode: 'offline',
    description: 'A screenplay competition where each participant is given a unique logline and must develop it into a structured screenplay.',
    contacts: [
      { name: 'Ahilan', phone: '+91 93617 86878' }
    ],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/events/brainstorm.svg',
    gradient: 'from-emerald-950/40 via-teal-950/20 to-black'
  },
  {
    id: 'debate',
    name: 'Debate',
    category: 'competition',
    mode: 'offline',
    description: 'A dynamic debate competition where teams of four tackle topics revealed on the spot, testing their knowledge, spontaneity, and communication skills. Limited to 20 teams.',
    contacts: [
      { name: 'Keerthana', phone: '+91 94456 86514' }
    ],
    registration: {
      commonFields: true,
      teamBased: true,
      teamSize: { min: 2, max: 4, fixed: [2, 3, 4] }
    },
    image: '/images/events/debate.svg',
    gradient: 'from-cyan-950/40 via-slate-900 to-black'
  },
  {
    id: 'photography-workshop',
    name: 'Photography',
    category: 'workshop',
    description: 'A workshop exploring the art of photography, covering creative composition, camera techniques, lighting, and visual storytelling.',
    contacts: [
      { name: 'Mahak', phone: '+91 80895 58314' }
    ],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/workshops/photography.svg',
    gradient: 'from-neutral-900 via-stone-900 to-black'
  },
  {
    id: 'vfx-and-editing',
    name: 'VFX and Editing',
    category: 'workshop',
    description: 'A workshop exploring the art of VFX and video editing, teaching participants to transform creative ideas into captivating visual stories.',
    contacts: [
      { name: 'Elankaviyan', phone: '+91 93454 27112' }
    ],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/workshops/vfx-editing.svg',
    gradient: 'from-indigo-950/40 via-purple-950/20 to-black'
  },
  {
    id: 'dance-workshop',
    name: 'Dance',
    category: 'workshop',
    description: 'A dynamic workshop exploring the art of dance, focusing on movement, rhythm, expression, and the joy of bringing music to life.',
    contacts: [],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/workshops/dance.svg',
    gradient: 'from-rose-950/40 via-pink-950/20 to-black'
  },
  {
    id: 'script-writing',
    name: 'Script Writing',
    category: 'workshop',
    description: 'A creative workshop exploring the art of scriptwriting, focusing on storytelling, character development, structure, dialogue, and turning ideas into compelling scripts.',
    contacts: [
      { name: 'Dhanvant', phone: '+91 63859 11338' },
      { name: 'Yaazir', phone: '+91 99954 59005' }
    ],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/workshops/script-writing.svg',
    gradient: 'from-amber-950/40 via-yellow-950/20 to-black'
  },
  {
    id: 'storyboard',
    name: 'Storyboard',
    category: 'workshop',
    description: 'A creative workshop exploring storyboarding, teaching participants to visualize scripts through shot composition, camera angles, framing, and scene-by-scene planning.',
    contacts: [
      { name: 'Mitra', phone: '+91 884 883 7259' },
      { name: 'Karuppan', phone: '+91 98847 10408' }
    ],
    registration: {
      commonFields: true,
      teamBased: false
    },
    image: '/images/workshops/storyboard.svg',
    gradient: 'from-teal-950/40 via-emerald-950/20 to-black'
  }
];

export const overallContacts: Contact[] = [
  { name: 'Harivarman', phone: '+91 96773 21266' },
  { name: 'Hariharran', phone: '+91 63790 41919' }
];
