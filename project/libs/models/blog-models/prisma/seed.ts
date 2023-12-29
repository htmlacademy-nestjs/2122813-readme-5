import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.type.upsert({
    where: { typeId: 1 },
    update: {},
    create: {
      title: 'Видео',
      posts: {
        create: [
          {
            title: 'Видео',
            link: 'https://www.youtube.com/watch?v=piqdKWNnqBo',
            userId: '1'
          },
        ]
      },
    }
  });

  await prisma.type.upsert({
    where: { typeId: 2 },
    update: {},
    create: {
      title: 'Текст',
      posts: {
        create: [
          {
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
          },
        ]
      },
    }
  });

  await prisma.type.upsert({
    where: { typeId: 3 },
    update: {},
    create: {
      title: 'Цитата',
      posts: {
        create: [
          {
            author: 'Автор цитаты',
            description: 'Цитата',
            userId: '3'
          },
        ]
      },
    }
  });

  await prisma.type.upsert({
    where: { typeId: 4 },
    update: {},
    create: {
      title: 'Фото',
      posts: {
        create: [
          {
            photo: 'https://loremflickr.com/640/360',
            userId: '4'
          },
        ]
      },
    }
  });

  await prisma.type.upsert({
    where: { typeId: 5 },
    update: {},
    create: {
      title: 'Ссылка',
      posts: {
        create: [
          {
            link: 'https://www.youtube.com/watch?v=piqdKWNnqBo',
            description: 'Описание ссылки',
            userId: '5'
          },
        ]
      },
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
  })
