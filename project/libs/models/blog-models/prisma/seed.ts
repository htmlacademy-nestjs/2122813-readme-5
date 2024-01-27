import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { postId: 1 },
    update: {},
    create: {
      type: 'video',
      title: 'Видео',
      link: 'https://www.youtube.com/watch?v=piqdKWNnqBo',
      userId: '1'
    }
  });

  await prisma.post.upsert({
    where: { postId: 2 },
    update: {},
    create: {
      type: 'text',
      title: 'Текст',
      announce: 'Анонс публикации',
      description: 'Текст публикации',
      userId: '2',
      comments: {
        create: [
          {
            message: 'Вау!',
            userId: '2',
          }
        ]
      }
    }
  });

  await prisma.post.upsert({
    where: { postId: 3 },
    update: {},
    create: {
      type: 'quote',
      author: 'Автор цитаты',
      description: 'Цитата',
      userId: '3'
    }
  });

  await prisma.post.upsert({
    where: { postId: 4 },
    update: {},
    create: {
      type: 'photo',
      photo: 'https://loremflickr.com/640/360',
      userId: '4'
    }
  });

  await prisma.post.upsert({
    where: { postId: 5 },
    update: {},
    create: {
      type: 'link',
      link: 'https://www.youtube.com/watch?v=piqdKWNnqBo',
      description: 'Описание ссылки',
      userId: '5'
    }
  });

  console.info('🤘️ Database was filled')
}
fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()
    // process.exit(1);
  })
