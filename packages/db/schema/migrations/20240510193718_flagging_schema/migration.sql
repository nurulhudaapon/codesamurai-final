/*
  Warnings:

  - Added the required column `flag_score` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "flag_score" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "blocked_words" (
    "id" UUID NOT NULL,
    "word" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocked_words_pkey" PRIMARY KEY ("id")
);
