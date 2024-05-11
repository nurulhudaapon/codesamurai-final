/*
  Warnings:

  - You are about to drop the `activity_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "user_id" UUID;

-- DropTable
DROP TABLE "activity_log";

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
