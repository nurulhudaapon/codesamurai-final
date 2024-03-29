-- CreateEnum
CREATE TYPE "user_state" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "vehicle_type" AS ENUM ('open_truck', 'dump_truck', 'compactor', 'container_carrier');

-- CreateEnum
CREATE TYPE "vehicle_capacity" AS ENUM ('three_ton', 'five_ton', 'seven_ton');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "email" VARCHAR(320) NOT NULL,
    "phone" VARCHAR(80) NOT NULL,
    "last_login_at" TIMESTAMPTZ(6),
    "password" VARCHAR(255),
    "role_id" UUID,
    "state" "user_state" NOT NULL DEFAULT 'active',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" VARCHAR(100) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" VARCHAR(100) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "sts_id" UUID NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "type" "vehicle_type" NOT NULL,
    "capacity" "vehicle_capacity" NOT NULL,
    "loaded_cost" DOUBLE PRECISION,
    "unloaded_cost" DOUBLE PRECISION,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sts" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "ward_number" VARCHAR(100) NOT NULL,
    "capacity_tonnes" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "manager_id" UUID NOT NULL,

    CONSTRAINT "sts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sts_entry" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "sts_id" UUID NOT NULL,
    "vehicle_id" UUID NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sts_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landfill_entry" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landfill_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_stsTouser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "user_email_password_idx" ON "user"("email", "password");

-- CreateIndex
CREATE INDEX "role_slug_idx" ON "role"("slug");

-- CreateIndex
CREATE INDEX "permission_slug_idx" ON "permission"("slug");

-- CreateIndex
CREATE INDEX "role_permission_role_id_permission_id_idx" ON "role_permission"("role_id", "permission_id");

-- CreateIndex
CREATE INDEX "vehicle_number_idx" ON "vehicle"("number");

-- CreateIndex
CREATE INDEX "sts_ward_number_idx" ON "sts"("ward_number");

-- CreateIndex
CREATE INDEX "sts_entry_sts_id_idx" ON "sts_entry"("sts_id");

-- CreateIndex
CREATE UNIQUE INDEX "_stsTouser_AB_unique" ON "_stsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_stsTouser_B_index" ON "_stsTouser"("B");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_sts_id_fkey" FOREIGN KEY ("sts_id") REFERENCES "sts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts" ADD CONSTRAINT "sts_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_entry" ADD CONSTRAINT "sts_entry_sts_id_fkey" FOREIGN KEY ("sts_id") REFERENCES "sts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_entry" ADD CONSTRAINT "sts_entry_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_entry" ADD CONSTRAINT "sts_entry_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landfill_entry" ADD CONSTRAINT "landfill_entry_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_stsTouser" ADD CONSTRAINT "_stsTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "sts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_stsTouser" ADD CONSTRAINT "_stsTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
