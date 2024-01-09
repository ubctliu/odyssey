import { PrismaClient } from '@prisma/client';

// Fetches user from DB else return
export default async function fetchUser(userId) {
  const prisma = new PrismaClient();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    if (!existingUser) {
      console.log("User doesn't exist");
      return;
    }

    console.log("User fetched:", existingUser);
    return existingUser;
  } catch (error) {
    console.log("Error occurred while fetching user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}