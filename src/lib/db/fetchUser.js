import { PrismaClient } from '@prisma/client';

// Check if user already exists in the database before creating a new user
export default async function fetchUser(userId) {
  const prisma = new PrismaClient();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    if (!existingUser) {
      console.log("User doesn't exist yet");
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