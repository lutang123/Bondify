// Using relative URLs for local images instead of imports to avoid ESM errors
const mirrorMeadowImage = "/src/assets/mirror_meadow.jpg";
const twilightTidesImage = "/src/assets/twilight_tide.png";
const loversLanternImage = "/src/assets/lover_lantern.png";
const woodlandWonderImage = "/src/assets/woodland_wonder.png";

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  quote: string;
  imageUrl: string;
  isPremium?: boolean;
  sampleQuestions: string[];
}

export const categories: Category[] = [
  {
    id: "twilight",
    name: "Twilight Tides",
    subtitle: "First Date Fuel",
    description: "Don't believe in love at first sight? Try this. Romantic connection starters, deep cuts, and curveballs to spark unforgettable first dates.",
    quote: "Because 'So what do you do?' should be illegal on a first date.",
    imageUrl: twilightTidesImage,
    sampleQuestions: [
      "What's something you're passionate about that most people don't know?",
      "If we could teleport anywhere for our next date, where would you choose?",
      "What was your most embarrassing moment that you can laugh about now?",
      "Do you believe in love at first sight, or should I walk by again?",
      "What are three things you couldn't live without?"
    ]
  },
  {
    id: "lovers",
    name: "Lover's Lantern",
    subtitle: "After Dark (18+)",
    description: "Curious about your partner's spicy secrets? This premium deck unlocks tasteful, vulnerable, and playful intimacy.",
    quote: "Unlock the secret deck couples can't stop talking about.",
    imageUrl: loversLanternImage,
    isPremium: true,
    sampleQuestions: [
      "What's one fantasy you've never shared with me before?",
      "When do you feel most connected to me, physically or emotionally?",
      "What's something you've always wanted to try but were too nervous to bring up?",
      "Where is somewhere unexpected you'd like to be kissed?",
      "What's the most intimate non-physical thing we could do together?"
    ]
  },
  {
    id: "sunlit",
    name: "Sunlit Social",
    subtitle: "Stranger Things & Friend Flings",
    description: "In a bar or meetup and everyone's glued to their phones? This category brings laughter, party mode games, and \"bond with a stranger\" challenges.",
    quote: "Friendship speedrun: initiate in 3... 2... 1...",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=200&q=80",
    sampleQuestions: [
      "What's the strangest talent you have that few people know about?",
      "If you could instantly master one skill, what would it be and why?",
      "What's the most spontaneous thing you've ever done?",
      "Desert island scenario: you can bring three items. What are they?",
      "What's something people assume about you that isn't true?"
    ]
  },
  {
    id: "brainstorm",
    name: "Brainstorm Blitz",
    subtitle: "Mind Games & Icebreakers",
    description: "Up for some mental gymnastics? Explore fun riddles, what-ifs, ethical dilemmas, and party-style debate prompts.",
    quote: "Pub quiz meets party game meets deep-thought detour.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=200&q=80",
    sampleQuestions: [
      "Would you rather have unlimited money but no friends, or be broke with amazing friends?",
      "If you could know the absolute truth to one question, what would you ask?",
      "Ethical dilemma: Would you steal medicine to save a loved one if you couldn't afford it?",
      "You can instantly solve one world problem. Which one do you choose?",
      "If animals could talk, which species would be the rudest?"
    ]
  },
  {
    id: "woodland",
    name: "Woodland Wonder",
    subtitle: "Kid Bond: Talk Like Tiny Humans",
    description: "Got a tiny human nearby who thinks like a philosopher trapped in a jellybean body? Bond with kids (or teens) in ways that matter.",
    quote: "Because 'How was school?' always gets the same answer.",
    imageUrl: woodlandWonderImage,
    sampleQuestions: [
      "If you could have any superpower, what would it be and what's the first thing you'd do?",
      "What's the funniest thing that happened at school this week?",
      "If you could make one rule that everyone in the world had to follow, what would it be?",
      "What's something you'd like to learn that they don't teach at school?",
      "If you could talk to animals, which animal would you want to have a conversation with first?"
    ]
  },
  {
    id: "mirror",
    name: "Mirror Meadow",
    subtitle: "Solo Reflection",
    description: "Just vibing solo? This is your daily conversation with the realest person you know—yourself. Includes gratitude check-ins and personal growth prompts.",
    quote: "Less therapy. More XP for your soul.",
    imageUrl: mirrorMeadowImage,
    sampleQuestions: [
      "What's something you're proud of that you rarely talk about?",
      "If you could write a note to your younger self, what would you say?",
      "What's a small joy you experienced today that you almost missed?",
      "What's one boundary you need to establish or maintain in your life right now?",
      "What have you been avoiding that you need to confront or address?"
    ]
  }
];
