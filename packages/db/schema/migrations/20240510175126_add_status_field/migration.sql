-- CreateEnum
CREATE TYPE "issue_status" AS ENUM ('reported', 'in_progress', 'resolved');

-- AlterTable
ALTER TABLE "issue" ADD COLUMN     "status" "issue_status" DEFAULT 'reported',
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
