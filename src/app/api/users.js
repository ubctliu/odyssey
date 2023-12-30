import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// SAMPLE API ROUTE FOR REFERENCE - CURRENTLY DOES NOTHING
export default async (req, res) => {
  const user = await prisma.user.findFirst();
  return user;
}

async()
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

