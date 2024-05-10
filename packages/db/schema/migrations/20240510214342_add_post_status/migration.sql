-- CreateEnum
CREATE TYPE "post_status" AS ENUM ('published', 'draft', 'spam', 'inappropriate');

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "status" "post_status" DEFAULT 'published';
