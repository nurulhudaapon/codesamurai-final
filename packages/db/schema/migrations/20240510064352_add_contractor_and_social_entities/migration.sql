-- CreateEnum
CREATE TYPE "post_type" AS ENUM ('event', 'announcement', 'post');

-- CreateTable
CREATE TABLE "issue" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "attachments" TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "type" "post_type" NOT NULL,
    "attachments" TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "contract_id" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL,
    "tin" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "workforce_size" INTEGER NOT NULL,
    "payment_per_tonnage" DOUBLE PRECISION NOT NULL,
    "required_amount_per_day" DOUBLE PRECISION NOT NULL,
    "contract_duration" TEXT NOT NULL,
    "area_of_collection" TEXT NOT NULL,
    "sts_id" UUID NOT NULL,

    CONSTRAINT "contractor_company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_company" ADD CONSTRAINT "contractor_company_sts_id_fkey" FOREIGN KEY ("sts_id") REFERENCES "sts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
