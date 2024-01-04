import { PrismaClient } from '@prisma/client';

// Try to update existing user
export default async function updateUser(user) {
  const prisma = new PrismaClient();

  try {

    const updatedUser = await prisma.user.update({
      where: {
        clerkId: user.id
      },
      data: {
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });

    console.log("User updated:", updatedUser);
    return updateUser;
  } catch (error) {
    console.log("Error occurred while updating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}