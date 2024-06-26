import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Create a new User
  const alice = await prisma.user.upsert({
    where: { email: 'alice@razano.dev' },
    update: {},
    create: {
      email: 'alice@razano.dev',
      name: 'Alice',
      password: '$2b$10$.dFQJwcsfeIxk.xpawSBTuJJtZCQI//r3uvyboJufcUXD68WwqHZm',
      topics: {},
      posts: {},
    },
  });
  const tom = await prisma.user.upsert({
    where: { email: 'tom@razano.dev' },
    update: {},
    create: {
      email: 'tom@razano.dev',
      name: 'Tom',
      password: '$2b$10$.dFQJwcsfeIxk.xpawSBTuJJtZCQI//r3uvyboJufcUXD68WwqHZm',
      topics: {},
      posts: {},
    },
  });
  // Create a new Topic
  const movie = await prisma.topic.upsert({
    where: { title: 'Movie' },
    update: {},
    create: {
      title: 'Movie',
      user: {
        connect: { email: 'alice@razano.dev' },
      },
    },
  });

  const fishing = await prisma.topic.upsert({
    where: { title: 'Fishing' },
    update: {},
    create: {
      title: 'Fishing',
      user: {
        connect: { email: 'tom@razano.dev' },
      },
    },
  });

  // Create a new Post
  const cars = await prisma.post.upsert({
    where: { title: 'Cars' },
    update: {},
    create: {
      title: 'Cars',
      content: 'I love cars',
      user: {
        connect: { email: 'tom@razano.dev' },
      },
      topic: {
        connect: { title: 'Movie' },
      },
    },
  });

  const Aladin = await prisma.post.upsert({
    where: { title: 'Aladin' },
    update: {},
    create: {
      title: 'Aladin',
      content: 'I love Aladin',
      user: {
        connect: { email: 'alice@razano.dev' },
      },
      topic: {
        connect: { title: 'Movie' },
      },
    },
  });

  const ocean = await prisma.post.upsert({
    where: { title: 'Ocean' },
    update: {},
    create: {
      title: 'Ocean',
      content: 'I love ocean',
      user: {
        connect: { email: 'tom@razano.dev' },
      },
      topic: {
        connect: { title: 'Fishing' },
      },
    },
  });

  const river = await prisma.post.upsert({
    where: { title: 'River' },
    update: {},
    create: {
      title: 'River',
      content: 'I love river',
      user: {
        connect: { email: 'alice@razano.dev' },
      },
      topic: {
        connect: { title: 'Fishing' },
      },
    },
  });

  console.log({ alice, tom, movie, fishing, cars, Aladin, ocean, river });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
