-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "timeStart" DROP NOT NULL,
ALTER COLUMN "timeEnd" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "placeId" VARCHAR(255);
