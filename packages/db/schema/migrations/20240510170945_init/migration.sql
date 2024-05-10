-- AlterEnum
ALTER TYPE "workforce_log_type" ADD VALUE 'track';

-- AlterTable
ALTER TABLE "transportation" ADD COLUMN     "contractor_id" UUID;

-- AlterTable
ALTER TABLE "workforce_log" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "transportation" ADD CONSTRAINT "transportation_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor_company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
