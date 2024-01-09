-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_dayId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "lodging" VARCHAR(255);

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "description" VARCHAR(255);

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "imageUrl" VARCHAR(255),
ADD COLUMN     "title" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
