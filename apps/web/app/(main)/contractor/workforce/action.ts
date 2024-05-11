"use server";
import { dbApiClient } from "@/client";
import { Entity } from "@/types/prisma";
import { Schema } from "@ecosync/db";
import { Objects } from "@ecosync/utils";

export async function createWorkforceRegistration(prev: any, form: FormData) {
  const formData = Object.fromEntries(form.entries());
  const parsedData = Schema.workforceSchema.safeParse(
    Objects.coerceNumbers(formData, ['payment_rate'] satisfies Array<keyof Entity.workforce>)
  );

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const res = await dbApiClient
    .from("workforce")
    .insert({
      ...parsedData.data,
      dob: parsedData.data.dob.toISOString(),      
      hired_at: parsedData.data.hired_at.toISOString(),
    })
    .select("*")
    .maybeSingle();


  return {
    message: "Workforce created successfully",
    errors: null,
    id: res.data?.id,
  };
}
