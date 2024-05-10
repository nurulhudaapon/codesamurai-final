/*
  Warnings:

  - The values [in_progress] on the enum `issue_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "issue_status_new" AS ENUM ('reported', 'reviwed', 'resolved', 'flagged');
ALTER TABLE "issue" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "issue" ALTER COLUMN "status" TYPE "issue_status_new" USING ("status"::text::"issue_status_new");
ALTER TYPE "issue_status" RENAME TO "issue_status_old";
ALTER TYPE "issue_status_new" RENAME TO "issue_status";
DROP TYPE "issue_status_old";
ALTER TABLE "issue" ALTER COLUMN "status" SET DEFAULT 'reported';
COMMIT;
