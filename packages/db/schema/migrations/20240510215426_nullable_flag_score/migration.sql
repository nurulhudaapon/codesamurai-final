-- AlterTable
ALTER TABLE "post" ALTER COLUMN "flag_score" DROP NOT NULL,
ALTER COLUMN "flag_score" SET DEFAULT 0;
