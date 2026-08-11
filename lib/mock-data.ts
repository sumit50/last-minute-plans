import { Plan } from '@/types';

export const INITIAL_PLANS: Plan[] = [
  {
    id: 'plan-1',
    slug: 'momo-hunt-chandigarh',
    title: '🥟 ₹200 MOMO HUNT',
    description: 'Find two separate momo spots in Sector 15 / Sector 34. Order the exact same steamed vs fried momos at both places. Pick the winner.',
    budget: 200,
    budgetLabel: '₹200 MAX',
    durationMinutes: 120,
    durationLabel: '~2 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 4,
    groupSizeLabel: '2-4 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'LETS_GO',
    category: 'WITH_FRIENDS',
    tags: ['🥟 FOOD', '💸 CHEAP', '🚶 WALKING', '🔥 POPULAR'],
    coverImage: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 15 & 34',
    rules: [
      'Maximum budget per person is ₹200.',
      'Must try at least 2 different vendors.',
      'No rating online before tasting! Give your honest initial reaction.',
      'Loser buys extra spicy red chutney for the group.'
    ],
    creatorName: 'Aarav_Chd',
    creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    isFeatured: true,
    tryCount: 142,
    ratingPercentage: 96,
    steps: [
      {
        id: 's1-1',
        stepNumber: 1,
        title: 'ROUND 01: Pick Spot #1',
        description: 'Head to Sector 15 night market or booth market. Order 1 full plate of Steamed Veg/Chicken Momos.',
        durationMinutes: 30,
        locationHint: 'Sector 15 Market, Chandigarh'
      },
      {
        id: 's1-2',
        stepNumber: 2,
        title: 'ROUND 02: Taste & Rate Spot #1',
        description: 'Rate taste (1-10), wrapper thickness, and chutney spice level.',
        durationMinutes: 20
      },
      {
        id: 's1-3',
        stepNumber: 3,
        title: 'ROUND 03: Hunt Spot #2',
        description: 'Walk or ride to Sector 34 food street. Find a rival stall and order Kurkure or Gravy Momos.',
        durationMinutes: 40,
        locationHint: 'Sector 34 Food Street, Chandigarh'
      },
      {
        id: 's1-4',
        stepNumber: 4,
        title: 'FINAL ROUND: Declare Champion',
        description: 'Crown the Chandigarh Momo King. Total damage under ₹200.',
        durationMinutes: 30
      }
    ],
    attempts: [
      {
        id: 'att-1',
        planId: 'plan-1',
        username: 'simran_vibe',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        actualCost: 180,
        actualDurationMinutes: 110,
        review: 'Started at 7 PM in Sec 15. The Kurkure momos in Sec 34 destroyed our expectations. Total spent ₹180 each!',
        ratingType: 'WOULD_DO_AGAIN',
        completedAt: '2 days ago'
      },
      {
        id: 'att-2',
        planId: 'plan-1',
        username: 'karan_c',
        actualCost: 200,
        actualDurationMinutes: 90,
        review: 'Super fun low effort date plan. Highly recommended!',
        ratingType: 'ACTUALLY_FUN',
        completedAt: 'Yesterday'
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 88,
      NEVER_AGAIN: 3,
      ACTUALLY_FUN: 42,
      TERRIBLE_IDEA: 1,
      SAVED: 110,
      NEED_TO_TRY: 65
    },
    createdAt: '2026-08-01'
  },
  {
    id: 'plan-2',
    slug: 'sunset-chai-sukhna',
    title: '🌅 SUNSET + CHAI MISSION',
    description: 'Grab kulhad chai near Sector 8, walk down to Sukhna Lake rear promenade before sunset, and sit on the stairs doing absolutely nothing.',
    budget: 100,
    budgetLabel: '₹100 MAX',
    durationMinutes: 90,
    durationLabel: '~1.5 HOURS',
    groupSizeMin: 1,
    groupSizeMax: 3,
    groupSizeLabel: '1-3 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'NORMAL_HUMAN',
    category: 'DATE',
    tags: ['🌅 SUNSET', '☕ CHAI', '🍃 OUTDOORS', '✨ RELAX'],
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sukhna Lake & Sector 8',
    rules: [
      'No checking work emails or talking about exams/deadlines.',
      'Must arrive 30 mins before official sunset time.',
      'Chai must be served hot.'
    ],
    creatorName: 'Rohan_P',
    isFeatured: true,
    tryCount: 230,
    ratingPercentage: 98,
    steps: [
      {
        id: 's2-1',
        stepNumber: 1,
        title: 'STEP 01: Fuel Up',
        description: 'Stop by Sector 8 or Sector 9 inner market for a fresh ginger chai & maska bun.',
        durationMinutes: 25,
        locationHint: 'Sector 8 Market, Chandigarh'
      },
      {
        id: 's2-2',
        stepNumber: 2,
        title: 'STEP 02: The Promenade Walk',
        description: 'Walk towards Sukhna Lake. Avoid the main crowded entry, head towards the quieter tree path.',
        durationMinutes: 25,
        locationHint: 'Sukhna Lake, Chandigarh'
      },
      {
        id: 's2-3',
        stepNumber: 3,
        title: 'STEP 03: Golden Hour Sit',
        description: 'Watch the sun dip behind the Shivalik hills.',
        durationMinutes: 40
      }
    ],
    attempts: [
      {
        id: 'att-3',
        planId: 'plan-2',
        username: 'diya_m',
        actualCost: 70,
        actualDurationMinutes: 85,
        review: 'Best ₹70 spent this week. The weather was perfect.',
        ratingType: 'WOULD_DO_AGAIN',
        completedAt: '3 hours ago'
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 145,
      NEVER_AGAIN: 1,
      ACTUALLY_FUN: 60,
      TERRIBLE_IDEA: 0,
      SAVED: 190,
      NEED_TO_TRY: 80
    },
    createdAt: '2026-08-02'
  },
  {
    id: 'plan-3',
    slug: 'street-food-battle-300',
    title: '⚔️ ₹300 STREET FOOD BATTLE',
    description: 'Three friends. ₹300 budget each. You have 60 minutes to buy 3 distinct street food dishes. Group votes on best item. Loser pays for ice cream.',
    budget: 300,
    budgetLabel: '₹300 MAX',
    durationMinutes: 90,
    durationLabel: '~1.5 HOURS',
    groupSizeMin: 3,
    groupSizeMax: 5,
    groupSizeLabel: '3-5 PEOPLE',
    groupSizeType: '3_5_PEOPLE',
    energyLevel: 'LETS_GO',
    category: 'WITH_FRIENDS',
    tags: ['⚔️ BATTLE', '🥟 FOOD', '🔥 COMPETITIVE'],
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 22 Shastri Market',
    rules: [
      'Exactly ₹300 per person max.',
      'Must buy 3 unique food items from different vendors.',
      'No repeat dishes among friends.'
    ],
    creatorName: 'TheGroupChat_Boss',
    isFeatured: true,
    tryCount: 89,
    ratingPercentage: 92,
    steps: [
      {
        id: 's3-1',
        stepNumber: 1,
        title: 'ROUND 01: Set Timer',
        description: 'Meet at Sector 22 main gate. Start a 45-minute countdown on your phones.',
        durationMinutes: 10
      },
      {
        id: 's3-2',
        stepNumber: 2,
        title: 'ROUND 02: Hunt & Gather',
        description: 'Split up! Find Golgappe, Pav Bhaji, Ram Ladoo, or Spring Rolls within your ₹300 allotment.',
        durationMinutes: 45,
        locationHint: 'Sector 22 Market, Chandigarh'
      },
      {
        id: 's3-3',
        stepNumber: 3,
        title: 'ROUND 03: The Tasting Table',
        description: 'Reconvene at the bench. Score each entry out of 10 for Taste, Value, & Chaos.',
        durationMinutes: 35
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 65,
      NEVER_AGAIN: 4,
      ACTUALLY_FUN: 55,
      TERRIBLE_IDEA: 8,
      SAVED: 72,
      NEED_TO_TRY: 40
    },
    createdAt: '2026-08-03'
  },
  {
    id: 'plan-4',
    slug: 'sector-17-photo-scavenger',
    title: '📸 SECTOR 17 PHOTO SCAVENGER HUNT',
    description: 'Explore the iconic brutalist plaza of Sector 17 with 5 specific photo missions. Whoever gets all 5 photos first wins a free cold coffee.',
    budget: 100,
    budgetLabel: '₹100 MAX',
    durationMinutes: 90,
    durationLabel: '~1.5 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 6,
    groupSizeLabel: '2-6 PEOPLE',
    groupSizeType: '3_5_PEOPLE',
    energyLevel: 'LETS_GO',
    category: 'WITH_FRIENDS',
    tags: ['📸 PHOTO', '🏛️ ARCHITECTURE', '🏃 GAME'],
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 17 Plaza',
    rules: [
      'Photos must be taken live during the hunt (no camera roll cheats!).',
      'Target 1: A stranger wearing yellow.',
      'Target 2: Brutalist concrete geometric stairs.',
      'Target 3: Vintage shop sign unchanged since 1980.',
      'Target 4: A street dog sleeping peacefully.',
      'Target 5: A funny group selfie with the fountain.'
    ],
    creatorName: 'Cam_Nerd',
    isFeatured: false,
    tryCount: 67,
    ratingPercentage: 90,
    steps: [
      {
        id: 's4-1',
        stepNumber: 1,
        title: 'STEP 01: Briefing',
        description: 'Meet near the Neelam Cinema plaza. Share the 5 photo targets in group chat.',
        durationMinutes: 10
      },
      {
        id: 's4-2',
        stepNumber: 2,
        title: 'STEP 02: 45-Minute Sprint',
        description: 'Scatter around Sector 17 corridors and open square to snap all 5 targets.',
        durationMinutes: 45,
        locationHint: 'Sector 17 Plaza, Chandigarh'
      },
      {
        id: 's4-3',
        stepNumber: 3,
        title: 'STEP 03: Coffee Verdict',
        description: 'Gather at Indian Coffee House, review photos, and crown the photo master.',
        durationMinutes: 35
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 40,
      NEVER_AGAIN: 2,
      ACTUALLY_FUN: 48,
      TERRIBLE_IDEA: 1,
      SAVED: 55,
      NEED_TO_TRY: 33
    },
    createdAt: '2026-08-04'
  },
  {
    id: 'plan-5',
    slug: 'random-bus-adventure',
    title: '🚌 RANDOM BUS ADVENTURE',
    description: 'Go to the bus stop, board the very next bus that arrives regardless of route, ride for exactly 7 stops, get off, and find something cool.',
    budget: 150,
    budgetLabel: '₹150 MAX',
    durationMinutes: 120,
    durationLabel: '~2 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 4,
    groupSizeLabel: '2-4 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'BAD_DECISIONS',
    category: 'CHAOS',
    tags: ['🚌 SPONTANEOUS', '🎲 CHAOS', '🗺️ EXPLORE'],
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'ISBT Sector 17 / 43',
    rules: [
      'You cannot skip the first bus that arrives.',
      'Must get off at stop #7.',
      'Once off the bus, walk 10 minutes in the direction of the nearest tall building.',
      'Find food or a spot within ₹150.'
    ],
    creatorName: 'ChaosGremlin',
    isFeatured: true,
    tryCount: 112,
    ratingPercentage: 88,
    steps: [
      {
        id: 's5-1',
        stepNumber: 1,
        title: 'STEP 01: Catch the Bus',
        description: 'Stand at any CTU local bus stop. Pay your ticket for whatever route comes first.',
        durationMinutes: 20
      },
      {
        id: 's5-2',
        stepNumber: 2,
        title: 'STEP 02: Count 7 Stops',
        description: 'Enjoy the window view. Exactly at stop 7, hit the exit door.',
        durationMinutes: 30
      },
      {
        id: 's5-3',
        stepNumber: 3,
        title: 'STEP 03: Explore New Territory',
        description: 'Walk around the new sector/neighborhood, buy chai or snacks, and document the vibe.',
        durationMinutes: 70
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 78,
      NEVER_AGAIN: 12,
      ACTUALLY_FUN: 92,
      TERRIBLE_IDEA: 15,
      SAVED: 64,
      NEED_TO_TRY: 88
    },
    createdAt: '2026-08-04'
  },
  {
    id: 'plan-6',
    slug: 'midnight-maggi-mission',
    title: '🍜 MIDNIGHT MAGGI MISSION',
    description: 'It is 11 PM, you are starving. Ride to the 24/7 food spots near PU (Panjab University) or Mohali 3B2 for spicy cheese Maggi.',
    budget: 150,
    budgetLabel: '₹150 MAX',
    durationMinutes: 60,
    durationLabel: '~1 HOUR',
    groupSizeMin: 2,
    groupSizeMax: 5,
    groupSizeLabel: '2-5 PEOPLE',
    groupSizeType: '3_5_PEOPLE',
    energyLevel: 'LETS_GO',
    category: 'WITH_FRIENDS',
    tags: ['🌙 LATE NIGHT', '🍜 MAGGI', '🛵 RIDE'],
    coverImage: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh / Mohali',
    locationArea: 'PU StuC / Phase 3B2',
    rules: [
      'Must take place after 10:00 PM.',
      'Must order Butter Cheese Maggi or Butter Double Masala.',
      'Play late night music on the drive.'
    ],
    creatorName: 'NightOwl_PU',
    isFeatured: true,
    tryCount: 310,
    ratingPercentage: 97,
    steps: [
      {
        id: 's6-1',
        stepNumber: 1,
        title: 'STEP 01: Rally the Troops',
        description: 'Send "Maggi now?" to group chat. Assemble in 15 mins.',
        durationMinutes: 15
      },
      {
        id: 's6-2',
        stepNumber: 2,
        title: 'STEP 02: Drive & Order',
        description: 'Head to StuC or 3B2 lights. Order piping hot Maggi & hot tea.',
        durationMinutes: 30,
        locationHint: 'Panjab University StuC / Phase 3B2 Mohali'
      },
      {
        id: 's6-3',
        stepNumber: 3,
        title: 'STEP 03: Car Chat Session',
        description: 'Eat on the bonnet or plastic stool while talking about deep life topics.',
        durationMinutes: 15
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 210,
      NEVER_AGAIN: 2,
      ACTUALLY_FUN: 95,
      TERRIBLE_IDEA: 1,
      SAVED: 140,
      NEED_TO_TRY: 70
    },
    createdAt: '2026-08-05'
  },
  {
    id: 'plan-7',
    slug: 'thrift-hunt-sec-19',
    title: '👕 ₹500 THRIFT & OUTFIT HUNT',
    description: 'Head to Sector 19 Palika Bazaar. Find the weirdest, coolest graphic tee or jacket under ₹500. Model it for the group.',
    budget: 500,
    budgetLabel: '₹500 MAX',
    durationMinutes: 120,
    durationLabel: '~2 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 4,
    groupSizeLabel: '2-4 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'LETS_GO',
    category: 'WITH_FRIENDS',
    tags: ['👕 THRIFT', '🛍️ SHOPPING', '✨ VINTAGE'],
    coverImage: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 19 Palika Bazaar',
    rules: [
      'Maximum spend ₹500.',
      'Must bargain aggressively.',
      'Must wear the item immediately for a photo shoot.'
    ],
    creatorName: 'StyleGenZ',
    isFeatured: false,
    tryCount: 95,
    ratingPercentage: 91,
    steps: [
      {
        id: 's7-1',
        stepNumber: 1,
        title: 'STEP 01: Dive into Palika',
        description: 'Explore the narrow lanes of Sector 19 C underground and street stalls.',
        durationMinutes: 45,
        locationHint: 'Palika Bazaar, Sector 19, Chandigarh'
      },
      {
        id: 's7-2',
        stepNumber: 2,
        title: 'STEP 02: Bargain Battle',
        description: 'Negotiate down from ₹800 to ₹350 like a pro.',
        durationMinutes: 35
      },
      {
        id: 's7-3',
        stepNumber: 3,
        title: 'STEP 03: Street Runway',
        description: 'Wear the fit, take 3 aesthetic film photos, and post to story.',
        durationMinutes: 40
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 60,
      NEVER_AGAIN: 3,
      ACTUALLY_FUN: 50,
      TERRIBLE_IDEA: 0,
      SAVED: 85,
      NEED_TO_TRY: 45
    },
    createdAt: '2026-08-05'
  },
  {
    id: 'plan-8',
    slug: '3-cafes-in-2-hours',
    title: '☕ 3 CAFES IN 2 HOURS',
    description: 'Why stick to one cafe? Order 1 item at 3 different specialty cafes in Sector 7 / 10 within 120 minutes.',
    budget: 500,
    budgetLabel: '₹500 MAX',
    durationMinutes: 120,
    durationLabel: '~2 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 3,
    groupSizeLabel: '2-3 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'NORMAL_HUMAN',
    category: 'DATE',
    tags: ['☕ CAFE', '🍰 DESSERT', '✨ VIBES'],
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 7 / 10 Cafe Belt',
    rules: [
      'Cafe 1: Espresso / Iced Latte only.',
      'Cafe 2: Croissant / Savory snack only.',
      'Cafe 3: Dessert / Cheesecake only.',
      'Stay max 35 mins per spot.'
    ],
    creatorName: 'CoffeeAddict_Chd',
    isFeatured: true,
    tryCount: 154,
    ratingPercentage: 94,
    steps: [
      {
        id: 's8-1',
        stepNumber: 1,
        title: 'SPOT 01: Coffee Kickoff',
        description: 'Grab a manual brew or cold brew at Sector 7.',
        durationMinutes: 35,
        locationHint: 'Sector 7, Chandigarh'
      },
      {
        id: 's8-2',
        stepNumber: 2,
        title: 'SPOT 02: Savory Snack',
        description: 'Walk 5 mins to Cafe #2 for sourdough toast or fries.',
        durationMinutes: 40
      },
      {
        id: 's8-3',
        stepNumber: 3,
        title: 'SPOT 03: Sweet Finale',
        description: 'Finish with tiramisu or gelato at Cafe #3.',
        durationMinutes: 45
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 110,
      NEVER_AGAIN: 5,
      ACTUALLY_FUN: 70,
      TERRIBLE_IDEA: 2,
      SAVED: 130,
      NEED_TO_TRY: 75
    },
    createdAt: '2026-08-06'
  },
  {
    id: 'plan-9',
    slug: 'coin-flip-adventure',
    title: '🪙 COIN FLIP CITY ADVENTURE',
    description: 'At every street intersection, flip a coin. Heads = turn right, Tails = turn left. Stop after 6 flips and explore whatever you land on.',
    budget: 200,
    budgetLabel: '₹200 MAX',
    durationMinutes: 90,
    durationLabel: '~1.5 HOURS',
    groupSizeMin: 1,
    groupSizeMax: 4,
    groupSizeLabel: '1-4 PEOPLE',
    groupSizeType: 'ITS_COMPLICATED',
    energyLevel: 'BAD_DECISIONS',
    category: 'CHAOS',
    tags: ['🪙 COIN FLIP', '🎲 CHAOS', '🚶 WALK'],
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 35 / 36',
    rules: [
      'No cheating the coin. What the coin says is final.',
      '6 flips total.',
      'Wherever flip #6 lands, you must spend at least 30 minutes there.'
    ],
    creatorName: 'FatePicker',
    isFeatured: true,
    tryCount: 175,
    ratingPercentage: 89,
    steps: [
      {
        id: 's9-1',
        stepNumber: 1,
        title: 'STEP 01: The Starting Point',
        description: 'Stand at any busy sector corner with a 10 rupee coin ready.',
        durationMinutes: 10
      },
      {
        id: 's9-2',
        stepNumber: 2,
        title: 'STEP 02: 6 Flips Journey',
        description: 'Flip at each turn. Walk down the resulting lane.',
        durationMinutes: 45
      },
      {
        id: 's9-3',
        stepNumber: 3,
        title: 'STEP 03: Final Destination Mission',
        description: 'Find a local tea vendor or park at the final destination and take a victory selfie.',
        durationMinutes: 35
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 120,
      NEVER_AGAIN: 8,
      ACTUALLY_FUN: 130,
      TERRIBLE_IDEA: 20,
      SAVED: 95,
      NEED_TO_TRY: 110
    },
    createdAt: '2026-08-06'
  },
  {
    id: 'plan-10',
    slug: 'solo-cafe-bookstore-mission',
    title: '📚 SOLO BOOKSTORE + COFFEE',
    description: 'Turn off phone notifications for 2 hours. Go to a quiet bookstore, pick a book based purely on cover art, and read chapter 1 over black coffee.',
    budget: 300,
    budgetLabel: '₹300 MAX',
    durationMinutes: 120,
    durationLabel: '~2 HOURS',
    groupSizeMin: 1,
    groupSizeMax: 1,
    groupSizeLabel: 'JUST ME',
    groupSizeType: 'JUST_ME',
    energyLevel: 'BASICALLY_DEAD',
    category: 'SOLO',
    tags: ['📚 BOOKS', '☕ SOLO', '🤫 QUIET', '✨ CHILL'],
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 17 / Sector 8',
    rules: [
      'Put phone on Do Not Disturb mode.',
      'Pick a book genre you have never read before.',
      'No scrolling social media during reading.'
    ],
    creatorName: 'IntrovertClub',
    isFeatured: false,
    tryCount: 160,
    ratingPercentage: 97,
    steps: [
      {
        id: 's10-1',
        stepNumber: 1,
        title: 'STEP 01: Browse the Shelves',
        description: 'Visit Capital Book Depot or English Book Shop in Sec 17.',
        durationMinutes: 30,
        locationHint: 'Capital Book Depot, Sector 17'
      },
      {
        id: 's10-2',
        stepNumber: 2,
        title: 'STEP 02: Coffee & Corner Table',
        description: 'Walk to a calm nearby coffee corner. Order coffee or matcha.',
        durationMinutes: 60
      },
      {
        id: 's10-3',
        stepNumber: 3,
        title: 'STEP 03: Write a 1-Line Review',
        description: 'Write down how you feel in the notes app before re-engaging with the world.',
        durationMinutes: 30
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 140,
      NEVER_AGAIN: 1,
      ACTUALLY_FUN: 50,
      TERRIBLE_IDEA: 0,
      SAVED: 165,
      NEED_TO_TRY: 90
    },
    createdAt: '2026-08-07'
  },
  {
    id: 'plan-11',
    slug: '500-date-challenge',
    title: '❤️ ₹500 TOTAL DATE CHALLENGE',
    description: 'Take your date out with a total combined budget of ₹500. Split into snacks, street drinks, and a small game.',
    budget: 500,
    budgetLabel: '₹500 MAX',
    durationMinutes: 150,
    durationLabel: '~2.5 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 2,
    groupSizeLabel: '2 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'NORMAL_HUMAN',
    category: 'DATE',
    tags: ['❤️ DATE', '💸 CHEAP', '🎨 FUN'],
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 10 Art Gallery & Leisure Valley',
    rules: [
      'Combined budget for both people is ₹500 flat.',
      'Must include 1 free cultural activity (e.g. Art Gallery walk).'
    ],
    creatorName: 'CouplesOnABudget',
    isFeatured: true,
    tryCount: 205,
    ratingPercentage: 95,
    steps: [
      {
        id: 's11-1',
        stepNumber: 1,
        title: 'STEP 01: Free Art Walk',
        description: 'Stroll through the Chandigarh Museum & Art Gallery in Sector 10.',
        durationMinutes: 45,
        locationHint: 'Sector 10 Museum, Chandigarh'
      },
      {
        id: 's11-2',
        stepNumber: 2,
        title: 'STEP 02: Leisure Valley Picnic',
        description: 'Grab cold coffee & grilled sandwiches from Sector 10 street stalls.',
        durationMinutes: 60,
        locationHint: 'Leisure Valley, Chandigarh'
      },
      {
        id: 's11-3',
        stepNumber: 3,
        title: 'STEP 03: Soft Serve Finish',
        description: 'End with ₹40 soft serve ice cream cones.',
        durationMinutes: 45
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 160,
      NEVER_AGAIN: 3,
      ACTUALLY_FUN: 85,
      TERRIBLE_IDEA: 1,
      SAVED: 180,
      NEED_TO_TRY: 95
    },
    createdAt: '2026-08-07'
  },
  {
    id: 'plan-12',
    slug: 'badminton-plus-chai',
    title: '🏸 PARK BADMINTON + CHAI',
    description: 'Grab 2 cheap wooden badminton rackets, find any neighborhood park, play a chaotic 21-point match, winner gets free chai.',
    budget: 100,
    budgetLabel: '₹100 MAX',
    durationMinutes: 75,
    durationLabel: '~1.2 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 4,
    groupSizeLabel: '2-4 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'LETS_GO',
    category: 'WITH_FRIENDS',
    tags: ['🏸 SPORTS', '🍃 OUTDOORS', '☕ CHAI'],
    coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh',
    locationArea: 'Sector 15 / 16 Park',
    rules: [
      'Must play outside in wind conditions for extra chaos.',
      'Serving underhand only.'
    ],
    creatorName: 'ActiveSquad',
    isFeatured: false,
    tryCount: 78,
    ratingPercentage: 93,
    steps: [
      {
        id: 's12-1',
        stepNumber: 1,
        title: 'STEP 01: Set Up Court',
        description: 'Mark court lines using water bottles in park grass.',
        durationMinutes: 15
      },
      {
        id: 's12-2',
        stepNumber: 2,
        title: 'STEP 02: Match to 21',
        description: 'Play a fierce match. Shouting "OUT!" is compulsory.',
        durationMinutes: 40
      },
      {
        id: 's12-3',
        stepNumber: 3,
        title: 'STEP 03: Victory Tea',
        description: 'Head to nearest corner tea stall to celebrate/grieve.',
        durationMinutes: 20
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 55,
      NEVER_AGAIN: 1,
      ACTUALLY_FUN: 42,
      TERRIBLE_IDEA: 0,
      SAVED: 50,
      NEED_TO_TRY: 38
    },
    createdAt: '2026-08-08'
  },
  {
    id: 'plan-13',
    slug: 'pick-each-others-food',
    title: '🍕 PICK EACH OTHER\'S FOOD',
    description: 'Go to a food court or market with a partner. You order for them, they order for you. No revealing until the food arrives!',
    budget: 350,
    budgetLabel: '₹350 MAX',
    durationMinutes: 90,
    durationLabel: '~1.5 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 2,
    groupSizeLabel: '2 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'NORMAL_HUMAN',
    category: 'DATE',
    tags: ['🍕 FOOD', '🎁 SURPRISE', '❤️ DATE'],
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh / Mohali',
    locationArea: 'Elante Mall / Sector 35',
    rules: [
      'Cannot order something the other person is allergic to.',
      'Must pick at least 1 weird/unusual item on the menu.'
    ],
    creatorName: 'FoodiePair',
    isFeatured: true,
    tryCount: 188,
    ratingPercentage: 94,
    steps: [
      {
        id: 's13-1',
        stepNumber: 1,
        title: 'STEP 01: Secret Ordering',
        description: 'One person stays at table, the other goes to counter to order secretly.',
        durationMinutes: 20
      },
      {
        id: 's13-2',
        stepNumber: 2,
        title: 'STEP 02: Swap Roles',
        description: 'Second person orders secretly.',
        durationMinutes: 20
      },
      {
        id: 's13-3',
        stepNumber: 3,
        title: 'STEP 03: The Unveiling',
        description: 'Taste test both meals and rate who chose better.',
        durationMinutes: 50
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 130,
      NEVER_AGAIN: 4,
      ACTUALLY_FUN: 88,
      TERRIBLE_IDEA: 2,
      SAVED: 140,
      NEED_TO_TRY: 80
    },
    createdAt: '2026-08-08'
  },
  {
    id: 'plan-14',
    slug: '500-home-feast',
    title: '🍲 ₹500 CHAOTIC HOME FEAST',
    description: 'Stay home. Order 5 completely different budget snacks on Instamart/Blinkit under ₹500 total. Build a tapas platter on the floor.',
    budget: 500,
    budgetLabel: '₹500 MAX',
    durationMinutes: 60,
    durationLabel: '~1 HOUR',
    groupSizeMin: 2,
    groupSizeMax: 4,
    groupSizeLabel: '2-4 PEOPLE',
    groupSizeType: '3_5_PEOPLE',
    energyLevel: 'BASICALLY_DEAD',
    category: 'AT_HOME',
    tags: ['🛋️ AT HOME', '🍕 SNACKS', '🎬 MOVIE'],
    coverImage: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Anywhere',
    rules: [
      'Must order in 10 minutes flat.',
      'Must lay out snacks aesthetically on a bedsheet or carpet floor.'
    ],
    creatorName: 'CouchPotato',
    isFeatured: false,
    tryCount: 140,
    ratingPercentage: 95,
    steps: [
      {
        id: 's14-1',
        stepNumber: 1,
        title: 'STEP 01: 10-Min Cart Race',
        description: 'Add chips, dips, instant ramen, drinks, & chocolate up to ₹500 limit.',
        durationMinutes: 10
      },
      {
        id: 's14-2',
        stepNumber: 2,
        title: 'STEP 02: Platter Setup',
        description: 'Arrange everything in bowls like a fancy restaurant board.',
        durationMinutes: 15
      },
      {
        id: 's14-3',
        stepNumber: 3,
        title: 'STEP 03: Feast & Stream',
        description: 'Put on YouTube / Netflix bad movies.',
        durationMinutes: 35
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 115,
      NEVER_AGAIN: 1,
      ACTUALLY_FUN: 65,
      TERRIBLE_IDEA: 0,
      SAVED: 120,
      NEED_TO_TRY: 50
    },
    createdAt: '2026-08-09'
  },
  {
    id: 'plan-15',
    slug: 'arcade-night-challenge',
    title: '🕹️ ₹300 ARCADE SHOWDOWN',
    description: 'Go to the nearest bowling/arcade center. Get ₹300 in game credits. Compete in air hockey and basketball shootout.',
    budget: 300,
    budgetLabel: '₹300 MAX',
    durationMinutes: 90,
    durationLabel: '~1.5 HOURS',
    groupSizeMin: 2,
    groupSizeMax: 4,
    groupSizeLabel: '2-4 PEOPLE',
    groupSizeType: '2_PEOPLE',
    energyLevel: 'LETS_GO',
    category: 'WITH_FRIENDS',
    tags: ['🕹️ ARCADE', '🏀 GAMES', '🔥 FUN'],
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    locationCity: 'Chandigarh / Mohali',
    locationArea: 'Elante Mall / CP 67',
    rules: [
      'Best of 3 rounds in Air Hockey.',
      'Loser carries the ticket rewards.'
    ],
    creatorName: 'RetroGamer',
    isFeatured: false,
    tryCount: 98,
    ratingPercentage: 92,
    steps: [
      {
        id: 's15-1',
        stepNumber: 1,
        title: 'STEP 01: Load Credits',
        description: 'Charge game card with ₹300.',
        durationMinutes: 10
      },
      {
        id: 's15-2',
        stepNumber: 2,
        title: 'STEP 02: Air Hockey Battle',
        description: 'Play intense Air Hockey match.',
        durationMinutes: 35
      },
      {
        id: 's15-3',
        stepNumber: 3,
        title: 'STEP 03: Hoops Shootout',
        description: 'Compete for highest score on basketball machine.',
        durationMinutes: 45
      }
    ],
    reactions: {
      WOULD_DO_AGAIN: 70,
      NEVER_AGAIN: 2,
      ACTUALLY_FUN: 55,
      TERRIBLE_IDEA: 1,
      SAVED: 75,
      NEED_TO_TRY: 40
    },
    createdAt: '2026-08-09'
  }
];
