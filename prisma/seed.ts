import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' });
const prisma = new PrismaClient({ adapter });

async function seedDatabase() {
  console.log('🌱 SEEDING CHANDIGARH DATABASE...');

  // 1. Create Default Demo User & Profile
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@lastminuteplans.com' },
    update: {},
    create: {
      name: 'Simran Sharma',
      username: 'simran_chd',
      email: 'demo@lastminuteplans.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
      profile: {
        create: {
          bio: 'Chandigarh local • Always down for chai & spontaneous bad decisions.',
          city: 'Chandigarh',
          totalPlansCompleted: 4,
          totalMoneySpent: 900,
          currentStreak: 3,
          longestStreak: 5,
        },
      },
    },
  });

  // 2. Create Achievements
  const achievements = [
    { code: 'MOMO_MASTER', title: '🥟 MOMO MASTER', description: 'Complete 3 food crawls in a single week.', badgeIcon: '🥟' },
    { code: 'NIGHT_OWL', title: '🌙 NIGHT OWL', description: 'Complete a plan past 11:00 PM.', badgeIcon: '🌙' },
    { code: 'CHAOTIC_GOOD', title: '💀 CHAOTIC GOOD', description: 'Complete a plan with CHAOTIC energy level.', badgeIcon: '💀' },
    { code: 'CHAI_CONNOISSEUR', title: '☕ CHAI CONNOISSEUR', description: 'Log 5 chai missions in Sector 15/35.', badgeIcon: '☕' },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { code: ach.code },
      update: {},
      create: ach,
    });
  }

  // 3. Create Categories
  const categories = [
    { name: 'FOOD & DRINK', slug: 'FOOD' },
    { name: 'DATE NIGHT', slug: 'DATE' },
    { name: 'SOLO MISSIONS', slug: 'SOLO' },
    { name: 'OUTDOOR & NATURE', slug: 'OUTDOORS' },
    { name: 'CHAOTIC & FUN', slug: 'CHAOS' },
    { name: 'FRIENDS & SQUAD', slug: 'FRIENDS' },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
  }

  // 4. Create Tags
  const tags = [
    'CHEAP', 'TONIGHT', 'SUNSET', 'FOOD', 'CHILL', 'HYPE',
    'ROMANTIC', 'ADVENTURE', 'COMPETITIVE', 'CREATIVE', 'NIGHT', 'SOLO', 'GROUP', 'OUTDOORS'
  ];

  for (const t of tags) {
    await prisma.tag.upsert({
      where: { slug: t.toLowerCase() },
      update: {},
      create: { name: t, slug: t.toLowerCase() },
    });
  }

  // 5. Create Playlists
  const playlists = [
    {
      id: 'pl-1',
      title: 'MOMO HUNT BANGERS 🎧',
      description: 'Bass-heavy hip-hop & Punjabi indie for street food raids.',
      provider: 'SPOTIFY',
      externalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLTEweZ4qN8',
      coverImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80',
      songCount: 16,
      durationMinutes: 54,
      mood: 'HYPE',
    },
    {
      id: 'pl-2',
      title: 'SUNSET & CHAI VIBES 🌅',
      description: 'Chill indie folk, lo-fi beats, and warm sunset acoustics.',
      provider: 'SPOTIFY',
      externalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdU2TsFV',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
      songCount: 20,
      durationMinutes: 65,
      mood: 'CHILL',
    },
    {
      id: 'pl-3',
      title: 'LATE NIGHT DRIVE 🌌',
      description: 'Synthwave & midnight ambient tracks for silent city streets.',
      provider: 'SPOTIFY',
      externalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80',
      songCount: 14,
      durationMinutes: 48,
      mood: 'EMOTIONAL',
    },
  ];

  for (const pl of playlists) {
    await prisma.playlist.upsert({
      where: { id: pl.id },
      update: {},
      create: pl,
    });
  }

  // 6. Seed 20 Chandigarh Plans
  const rawPlans = [
    {
      title: 'Momo Hunt',
      slug: 'momo-hunt',
      description: 'Hit 3 legendary momo stalls in Sector 15 & 35 and rate their chutney.',
      categorySlug: 'FOOD',
      budgetMin: 150,
      budgetMax: 300,
      durationMin: 60,
      durationMax: 120,
      groupSizeMin: 2,
      groupSizeMax: 5,
      energyLevel: 'HIGH',
      bestTime: 'EVENING',
      indoorOutdoor: 'OUTDOOR',
      city: 'Chandigarh',
      latitude: 30.7333,
      longitude: 76.7794,
      coverImage: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=800&q=80',
      tags: ['FOOD', 'CHEAP', 'GROUP'],
      steps: [
        { order: 1, title: 'Sector 15 Market Meeting', description: 'Assemble squad at Sector 15 market center.', durationMinutes: 15 },
        { order: 2, title: 'Steam vs Fried Battle', description: 'Try steamed paneer momos vs fried chicken momos.', durationMinutes: 45 },
        { order: 3, title: 'Chutney Rating Ceremony', description: 'Score the red garlic chutney on a scale of 1-10.', durationMinutes: 30 },
      ],
      playlistId: 'pl-1',
    },
    {
      title: 'Sunset + Chai at Sukhna Lake',
      slug: 'sunset-chai-sukhna',
      description: 'Grab hot kulhad chai, walk the Sukhna trail, and watch the sun dip below the hills.',
      categorySlug: 'OUTDOORS',
      budgetMin: 50,
      budgetMax: 150,
      durationMin: 60,
      durationMax: 90,
      groupSizeMin: 1,
      groupSizeMax: 4,
      energyLevel: 'MEDIUM',
      bestTime: 'EVENING',
      indoorOutdoor: 'OUTDOOR',
      city: 'Chandigarh',
      latitude: 30.7421,
      longitude: 76.8188,
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      tags: ['SUNSET', 'CHILL', 'CHEAP'],
      steps: [
        { order: 1, title: 'Chai Procurement', description: 'Buy hot kulhad chai near the lake entrance.', durationMinutes: 15 },
        { order: 2, title: 'Lake Promenade Walk', description: 'Walk towards the quiet end of the promenade.', durationMinutes: 45 },
      ],
      playlistId: 'pl-2',
    },
    {
      title: 'Sector 17 Photo Scavenger Hunt',
      slug: 'sector-17-photo-hunt',
      description: 'Explore retro brutalist plazas in Sector 17 and photograph 5 hidden vintage signs.',
      categorySlug: 'CHAOS',
      budgetMin: 0,
      budgetMax: 100,
      durationMin: 90,
      durationMax: 150,
      groupSizeMin: 2,
      groupSizeMax: 6,
      energyLevel: 'HIGH',
      bestTime: 'AFTERNOON',
      indoorOutdoor: 'OUTDOOR',
      city: 'Chandigarh',
      latitude: 30.7398,
      longitude: 76.7827,
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
      tags: ['ADVENTURE', 'CREATIVE', 'GROUP'],
      steps: [
        { order: 1, title: 'Central Plaza Rendezvous', description: 'Meet under the main fountain square.', durationMinutes: 15 },
        { order: 2, title: 'Brutalist Architecture Hunt', description: 'Find 5 vintage neon shop signs built before 1990.', durationMinutes: 60 },
      ],
      playlistId: 'pl-1',
    },
    {
      title: 'Midnight Maggi Mission',
      slug: 'midnight-maggi-mission',
      description: 'Drive up to Night Food Street near Panjab University for steaming butter cheese Maggi at 1 AM.',
      categorySlug: 'FOOD',
      budgetMin: 100,
      budgetMax: 250,
      durationMin: 45,
      durationMax: 90,
      groupSizeMin: 2,
      groupSizeMax: 5,
      energyLevel: 'CHAOTIC',
      bestTime: 'NIGHT',
      indoorOutdoor: 'OUTDOOR',
      city: 'Chandigarh',
      latitude: 30.7592,
      longitude: 76.7686,
      coverImage: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&q=80',
      tags: ['NIGHT', 'FOOD', 'CHEAP', 'TONIGHT'],
      steps: [
        { order: 1, title: 'Late Night Assembly', description: 'Gather at Night Food Street near PGI gate.', durationMinutes: 15 },
        { order: 2, title: 'Cheese Maggi Order', description: 'Order 2 plates of double-cheese butter Maggi.', durationMinutes: 30 },
      ],
      playlistId: 'pl-3',
    },
    {
      title: 'Sector 34 Thrift Crawl',
      slug: 'sector-34-thrift-crawl',
      description: 'Hunt for rare vintage jackets, Y2K graphic tees, and streetwear steals under ₹500.',
      categorySlug: 'SOLO',
      budgetMin: 200,
      budgetMax: 500,
      durationMin: 90,
      durationMax: 150,
      groupSizeMin: 1,
      groupSizeMax: 3,
      energyLevel: 'MEDIUM',
      bestTime: 'AFTERNOON',
      indoorOutdoor: 'BOTH',
      city: 'Chandigarh',
      latitude: 30.7228,
      longitude: 76.7681,
      coverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
      tags: ['CREATIVE', 'CHEAP', 'SOLO'],
      steps: [
        { order: 1, title: 'Racks Digging', description: 'Scan through vintage fleece jackets and oversized tees.', durationMinutes: 60 },
      ],
      playlistId: 'pl-1',
    },
    {
      title: '3 Cafes in 2 Hours',
      slug: '3-cafes-in-2-hours',
      description: 'Speedrun coffee tasting in Sector 7 & 8: 1 espresso shot per cafe.',
      categorySlug: 'FRIENDS',
      budgetMin: 300,
      budgetMax: 600,
      durationMin: 90,
      durationMax: 120,
      groupSizeMin: 2,
      groupSizeMax: 4,
      energyLevel: 'HIGH',
      bestTime: 'AFTERNOON',
      indoorOutdoor: 'INDOOR',
      city: 'Chandigarh',
      latitude: 30.7350,
      longitude: 76.7900,
      coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      tags: ['FOOD', 'HYPE', 'GROUP'],
      steps: [
        { order: 1, title: 'Cafe #1 Espresso Shot', description: 'Hit Cafe 1 for a quick iced americano.', durationMinutes: 30 },
        { order: 2, title: 'Cafe #2 Cold Brew', description: 'Walk across the block for nitrogen cold brew.', durationMinutes: 30 },
      ],
      playlistId: 'pl-2',
    },
    {
      title: 'Badminton & Cold Coffee',
      slug: 'badminton-and-coffee',
      description: 'Casual outdoor badminton match in Sector 10 park followed by thick cold coffee.',
      categorySlug: 'OUTDOORS',
      budgetMin: 100,
      budgetMax: 200,
      durationMin: 60,
      durationMax: 90,
      groupSizeMin: 2,
      groupSizeMax: 4,
      energyLevel: 'HIGH',
      bestTime: 'MORNING',
      indoorOutdoor: 'OUTDOOR',
      city: 'Chandigarh',
      latitude: 30.7500,
      longitude: 76.7800,
      coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
      tags: ['COMPETITIVE', 'CHILL', 'OUTDOORS'],
      steps: [
        { order: 1, title: 'Park Match to 21 Points', description: 'Rally till 21 points in the shade.', durationMinutes: 45 },
      ],
      playlistId: 'pl-2',
    },
    {
      title: 'Random Bus Route Adventure',
      slug: 'random-bus-adventure',
      description: 'Hop on the next CTU bus at ISBT 17 without checking the destination. Get off at the 5th stop.',
      categorySlug: 'CHAOS',
      budgetMin: 20,
      budgetMax: 100,
      durationMin: 60,
      durationMax: 120,
      groupSizeMin: 1,
      groupSizeMax: 3,
      energyLevel: 'CHAOTIC',
      bestTime: 'AFTERNOON',
      indoorOutdoor: 'OUTDOOR',
      city: 'Chandigarh',
      latitude: 30.7390,
      longitude: 76.7810,
      coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      tags: ['ADVENTURE', 'CHEAP', 'SOLO'],
      steps: [
        { order: 1, title: 'Bus Platform Roulette', description: 'Board whatever bus arrives next.', durationMinutes: 20 },
      ],
      playlistId: 'pl-3',
    },
    {
      title: 'Solo Bookstore & Espresso',
      slug: 'solo-bookstore-espresso',
      description: 'Spend 2 distraction-free hours browsing indie paperbacks in Sector 17.',
      categorySlug: 'SOLO',
      budgetMin: 100,
      budgetMax: 300,
      durationMin: 90,
      durationMax: 120,
      groupSizeMin: 1,
      groupSizeMax: 1,
      energyLevel: 'LOW',
      bestTime: 'AFTERNOON',
      indoorOutdoor: 'INDOOR',
      city: 'Chandigarh',
      latitude: 30.7380,
      longitude: 76.7820,
      coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
      tags: ['CHILL', 'SOLO', 'CREATIVE'],
      steps: [
        { order: 1, title: 'Unplugged Reading', description: 'Turn off mobile data and pick a new paperback.', durationMinutes: 90 },
      ],
      playlistId: 'pl-2',
    },
    {
      title: '₹500 Sunset Date Challenge',
      slug: '500-sunset-date-challenge',
      description: 'Take your date to Rose Garden, get fresh lemon sodas, and stay within ₹500 total.',
      categorySlug: 'DATE',
      budgetMin: 200,
      budgetMax: 500,
      durationMin: 90,
      durationMax: 150,
      groupSizeMin: 2,
      groupSizeMax: 2,
      energyLevel: 'MEDIUM',
      bestTime: 'EVENING',
      indoorOutdoor: 'OUTDOOR',
      city: 'Chandigarh',
      latitude: 30.7480,
      longitude: 76.7770,
      coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
      tags: ['ROMANTIC', 'CHEAP', 'SUNSET'],
      steps: [
        { order: 1, title: 'Rose Garden Stroll', description: 'Walk through the flower lanes before sunset.', durationMinutes: 60 },
      ],
      playlistId: 'pl-2',
    },
  ];

  for (const planData of rawPlans) {
    const categoryId = categoryMap[planData.categorySlug];
    if (!categoryId) continue;

    const plan = await prisma.plan.upsert({
      where: { slug: planData.slug },
      update: {},
      create: {
        title: planData.title,
        slug: planData.slug,
        description: planData.description,
        creatorId: demoUser.id,
        categoryId: categoryId,
        budgetMin: planData.budgetMin,
        budgetMax: planData.budgetMax,
        durationMin: planData.durationMin,
        durationMax: planData.durationMax,
        groupSizeMin: planData.groupSizeMin,
        groupSizeMax: planData.groupSizeMax,
        energyLevel: planData.energyLevel,
        bestTime: planData.bestTime,
        indoorOutdoor: planData.indoorOutdoor,
        city: planData.city,
        latitude: planData.latitude,
        longitude: planData.longitude,
        coverImage: planData.coverImage,
        completionCount: Math.floor(Math.random() * 40) + 10,
        steps: {
          create: planData.steps.map((s) => ({
            order: s.order,
            title: s.title,
            description: s.description,
            durationMinutes: s.durationMinutes,
          })),
        },
        tags: {
          create: planData.tags.map((t) => ({
            tag: { connect: { slug: t.toLowerCase() } },
          })),
        },
        playlists: {
          create: [
            { playlist: { connect: { id: planData.playlistId } }, relevanceScore: 100 },
          ],
        },
      },
    });

    // Create a demo attempt
    await prisma.planAttempt.create({
      data: {
        planId: plan.id,
        userId: demoUser.id,
        actualCost: plan.budgetMax,
        actualDuration: plan.durationMax,
        rating: 5,
        review: '10/10 spontaneous mission! Would definitely do again.',
      },
    });
  }

  console.log('🎉 SEEDED DATABASE WITH REAL CHANDIGARH PLANS & METADATA!');
}

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
