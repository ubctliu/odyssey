import { PrismaClient } from '@prisma/client';

async function createUser(user) {
  const prisma = new PrismaClient();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.clerkId
      }
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.clerkId,
        email: user.primaryEmailAddress,
        phoneNumber: primaryPhoneNumber,
        trips: []
      }
    });

    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.log("Error occured while creating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = createUser;