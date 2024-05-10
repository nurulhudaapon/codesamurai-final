"use server";
import { dbApiClient } from "@/client";
import { Schema } from "@ecosync/db";

export async function createContractorCompany(prev: any, form: FormData) {
  const formData = Object.fromEntries(form.entries());
  const parsedData = Schema.contractor_companySchema.safeParse(formData);

  console.log({parsedData, formData});
  
  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const res = await dbApiClient
    .from("contractor_company")
    .insert({
      ...parsedData.data,
      registration_date: parsedData.data.registration_date.toISOString(),
    })
    .select("*")
    .maybeSingle();

  return {
    message: "Company created successfully",
    errors: null,
    id: res.data?.id,
  };
}
