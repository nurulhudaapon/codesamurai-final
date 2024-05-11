import React from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { notify } from "@/components/toast";
import { CollectionDetailsForm } from "./new/form";
import { getAllSts } from "../sts/server";
import { dbApiClient } from "@/client";
import { CollectionPlanCardList } from "./listing";
const now = new Date();

const Index = async () => {
  const res = await dbApiClient.from("collection_plan").select("*");

  return <CollectionPlanCardList data={res.data || []} />;
};

export default Index;
