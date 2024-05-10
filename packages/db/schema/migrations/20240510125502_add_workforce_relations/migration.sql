/*
  Warnings:

  - Added the required column `contractor_id` to the `workforce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workforce_id` to the `workforce_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workforce" ADD COLUMN     "contractor_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "workforce_log" ADD COLUMN     "workforce_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "workforce_log" ADD CONSTRAINT "workforce_log_workforce_id_fkey" FOREIGN KEY ("workforce_id") REFERENCES "workforce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workforce" ADD CONSTRAINT "workforce_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
