import { PrismaClient } from '@prisma/client';

export default async function createUser(user) {
  const prisma = new PrismaClient();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id
      }
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email:  user.primaryEmailAddress,
        phoneNumber:  user.primaryPhoneNumber,
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