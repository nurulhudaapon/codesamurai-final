/*
  Warnings:

  - Added the required column `location_type` to the `transportation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "transportation_location_type" AS ENUM ('sts', 'landfill');

-- AlterTable
ALTER TABLE "transportation" ADD COLUMN     "location_type" "transportation_location_type" NOT NULL;
