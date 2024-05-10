"use server";
import { dbApiClient } from "@/client";
import { Entity } from "@/types/prisma";
import { Schema } from "@ecosync/db";
import { Objects } from "@ecosync/utils";

export async function createContractorManager(prev: any, form: FormData) {
  const formData = Object.fromEntries(form.entries());
  const parsedData = Schema.userSchema.omit({last_login_at: true}).safeParse(
    Objects.coerceNumbers(formData, [] satisfies Array<keyof Entity.user>)
  );

  // console.log({ parsedData, formData, t: parsedData?.error?.errors });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const res = await dbApiClient
    .from("user")
    .insert({
      ...parsedData.data,
      created_at: parsedData.data.created_at.toISOString(),
      updated_at: parsedData.data.updated_at.toISOString(),
    })
    .select("*")
    .maybeSingle();

    console.log({ parsedData, res });

  return {
    message: "Contractor Manager User Created Successfully",
    errors: null,
  };
}
