import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      username: 'admin',
      fullName: 'Admin',
      password: await hash('P@ssw0rd', 10),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      profileUrl:
        'https://cdn.pixabay.com/photo/2024/02/15/13/55/ai-generated-8575453_1280.png',
      role: {
        create: {
          name: 'Admin',
          permissions: {
            createMany: {
              data: [
                {
                  action: 'create',
                  module: 'User',
                },
                {
                  action: 'list',
                  module: 'User',
                },
                {
                  action: 'detail',
                  module: 'User',
                },
                {
                  action: 'update',
                  module: 'User',
                },
                {
                  action: 'delete',
                  module: 'User',
                },
              ],
            },
          },
        },
      },
    },
  });
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
