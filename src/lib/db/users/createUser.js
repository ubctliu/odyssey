import { PrismaClient } from '@prisma/client';

// Check if user already exists in the database before creating a new user
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
        // checks if primary email address is set, if not - use the first email address on file else null
        email:  user.primaryEmailAddress ? user.emailAddresses[0]?.emailAddress : null,
        phoneNumber:  user.primaryPhoneNumber,
      }
    });

    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.log("Error occurred while creating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}