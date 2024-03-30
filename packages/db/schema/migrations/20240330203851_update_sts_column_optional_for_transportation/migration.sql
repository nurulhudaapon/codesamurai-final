-- DropForeignKey
ALTER TABLE "transportation" DROP CONSTRAINT "transportation_sts_id_fkey";

-- AlterTable
ALTER TABLE "transportation" ALTER COLUMN "sts_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transportation" ADD CONSTRAINT "transportation_sts_id_fkey" FOREIGN KEY ("sts_id") REFERENCES "sts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
