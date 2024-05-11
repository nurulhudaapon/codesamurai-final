import { dbApiClient } from "@/client";
import { Schema } from "@ecosync/db";
import { Objects } from "@ecosync/utils";
import { Entity } from "@/types/prisma";

export async function createCollectionDetails(prev: any, form: FormData) {
  const formData = Object.fromEntries(form.entries());

  const parsedData = Schema.collection_planSchema.safeParse(
    Objects.coerceNumbers(formData, [
      "expected_weight_per_day",
      "num_laborers",
      "num_vans",
      "collection_duration",
    ] satisfies Array<keyof Entity.collection_plan>)
  );

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const res = await dbApiClient
    .from("collection_plan")
    .insert({
      ...parsedData.data,
    })
    .select("*")
    .maybeSingle();

  if (!res.data) {
    return {
      message:null,
      errors: "An error occurred while creating plan",
    };
  }

  return {
    message: "Plan created successfully",
    errors: null,
    data: res.data,
  };
}
