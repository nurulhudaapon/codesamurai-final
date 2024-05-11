import React from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { notify } from "@/components/toast";
import { CollectionDetailsForm } from "./form";
import { getAllSts } from "../sts/server";
import { dbApiClient } from "@/client";
const now = new Date();

const Index = async () => {
  const sts = await getAllSts();
  const { data } = await dbApiClient
    .from("contractor_company")
    .select("*")
    .maybeSingle();

  return (
    <CollectionDetailsForm
      Sts={sts}
      contractor_cp={data as unknown as Entity.contractor_company}
    />
  );
};

export default Index;
