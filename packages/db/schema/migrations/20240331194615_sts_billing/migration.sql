/*
  Warnings:

  - Added the required column `distance` to the `transportation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `padding` to the `transportation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transportation" ADD COLUMN     "distance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "padding" BOOLEAN NOT NULL,
ALTER COLUMN "arrival_time" DROP NOT NULL,
ALTER COLUMN "departure_time" DROP NOT NULL,
ALTER COLUMN "location_type" DROP NOT NULL;
