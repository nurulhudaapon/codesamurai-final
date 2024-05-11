/*
  Warnings:

  - You are about to drop the `activity_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "contractor_company" ADD COLUMN     "collection_id" UUID;

-- DropTable
DROP TABLE "activity_log";

-- CreateTable
CREATE TABLE "collection_plan" (
    "id" UUID NOT NULL,
    "area_of_collection" TEXT NOT NULL,
    "collection_start_time" TEXT NOT NULL,
    "collection_duration" DOUBLE PRECISION NOT NULL,
    "num_laborers" INTEGER NOT NULL,
    "num_vans" INTEGER NOT NULL,
    "expected_weight_per_day" DOUBLE PRECISION NOT NULL,
    "sts_id" UUID NOT NULL,
    "contractor_company_id" UUID,

    CONSTRAINT "collection_plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contractor_company" ADD CONSTRAINT "contractor_company_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection_plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_plan" ADD CONSTRAINT "collection_plan_sts_id_fkey" FOREIGN KEY ("sts_id") REFERENCES "sts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
