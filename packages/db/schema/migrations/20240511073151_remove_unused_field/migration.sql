/*
  Warnings:

  - You are about to drop the column `sts_id` on the `collection_plan` table. All the data in the column will be lost.
  - You are about to drop the `activity_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "collection_plan" DROP CONSTRAINT "collection_plan_sts_id_fkey";

-- AlterTable
ALTER TABLE "collection_plan" DROP COLUMN "sts_id";

-- DropTable
