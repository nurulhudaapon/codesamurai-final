"use server";

import { dbApiClient } from "@/client";

export async function StsSelector() {
  const { data: stss } = await dbApiClient.from("sts").select("*");

  if (!stss) return null;

  return (
    <select name="sts_id">
      {stss.map((sts, idx) => (
        <option key={idx} value={sts.id}>
          {sts.ward_number} ({sts.capacity_tonnes} Ton)
        </option>
      ))}
    </select>
  );
}
