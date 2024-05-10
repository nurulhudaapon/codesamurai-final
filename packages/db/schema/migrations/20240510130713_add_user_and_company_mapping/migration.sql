-- CreateTable
CREATE TABLE "user_contractor_company" (
    "user_id" UUID NOT NULL,
    "contractor_company_id" UUID NOT NULL,

    CONSTRAINT "user_contractor_company_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "user_contractor_company" ADD CONSTRAINT "user_contractor_company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_contractor_company" ADD CONSTRAINT "user_contractor_company_contractor_company_id_fkey" FOREIGN KEY ("contractor_company_id") REFERENCES "contractor_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
