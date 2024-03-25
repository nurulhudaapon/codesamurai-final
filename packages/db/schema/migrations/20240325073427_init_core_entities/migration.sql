-- CreateEnum
CREATE TYPE "vehicles_type" AS ENUM ('open_truck', 'dump_truck', 'compactor', 'container_carrier');

-- CreateEnum
CREATE TYPE "vehicles_capacity" AS ENUM ('three_ton', 'five_ton', 'seven_ton');

-- CreateTable
CREATE TABLE "vehicles" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "type" "vehicles_type" NOT NULL,
    "capacity" "vehicles_capacity" NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stss" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "ward_number" VARCHAR(100) NOT NULL,
    "capacity_tonnes" DOUBLE PRECISION NOT NULL,
    "gps_coordinates" TEXT NOT NULL,
    "manager_id" UUID NOT NULL,

    CONSTRAINT "stss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sts_dumpings" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "sts_id" UUID NOT NULL,
    "vehicle_id" UUID NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sts_dumpings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landfill_dumpings" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" UUID NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landfill_dumpings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicles_number_idx" ON "vehicles"("number");

-- CreateIndex
CREATE INDEX "stss_ward_number_idx" ON "stss"("ward_number");

-- CreateIndex
CREATE INDEX "sts_dumpings_sts_id_idx" ON "sts_dumpings"("sts_id");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stss" ADD CONSTRAINT "stss_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stss" ADD CONSTRAINT "stss_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_dumpings" ADD CONSTRAINT "sts_dumpings_sts_id_fkey" FOREIGN KEY ("sts_id") REFERENCES "stss"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_dumpings" ADD CONSTRAINT "sts_dumpings_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_dumpings" ADD CONSTRAINT "sts_dumpings_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landfill_dumpings" ADD CONSTRAINT "landfill_dumpings_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
