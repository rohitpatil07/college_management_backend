import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  await prisma.students.create({
    data: {
      roll_no: '19IT1058',
      email: 'sohamtalekar7@gmail.com',
      password: '$2a$10$1WJvN3XJpAh2519VQK/05uOKZp7sTTFcVWx1sUAgc1mnU6Cd5AX/y',
    },
  });

  await prisma.admins.create({
    data: {
      email: 'tpc@gmail.com',
      password: '$2a$10$1WJvN3XJpAh2519VQK/05uOKZp7sTTFcVWx1sUAgc1mnU6Cd5AX/y',
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
