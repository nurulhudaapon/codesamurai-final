-- CreateEnum
CREATE TYPE "users_role" AS ENUM ('admin', 'sts');

-- CreateEnum
CREATE TYPE "users_state" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "email" VARCHAR(320) NOT NULL,
    "phone" VARCHAR(80) NOT NULL,
    "last_login_at" TIMESTAMPTZ(6),
    "password" VARCHAR(255),
    "role" "users_role" NOT NULL DEFAULT 'admin',
    "state" "users_state" NOT NULL DEFAULT 'active',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_email_password_idx" ON "users"("email", "password");
