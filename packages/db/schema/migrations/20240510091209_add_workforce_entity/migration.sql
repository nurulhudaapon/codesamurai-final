-- CreateEnum
CREATE TYPE "workforce_log_type" AS ENUM ('start', 'end');

-- CreateTable
CREATE TABLE "workforce_log" (
    "id" UUID NOT NULL,
    "type" "workforce_log_type" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workforce_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workforce" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "hired_at" TIMESTAMP(3) NOT NULL,
    "job_title" TEXT NOT NULL,
    "payment_rate" DOUBLE PRECISION NOT NULL,
    "contact_information" TEXT NOT NULL,
    "assigned_collection_route" TEXT NOT NULL,

    CONSTRAINT "workforce_pkey" PRIMARY KEY ("id")
);
