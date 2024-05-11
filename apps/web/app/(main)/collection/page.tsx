import React, { FormEventHandler, useState } from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { notify } from "@/components/toast";
import { getServerAuthSession } from "@/utils/auth";
import { CollectionDetailsForm } from "./form";
import { getAllSts } from "../sts/server";
const now = new Date();

const Index = async () => {
  const session = await getServerAuthSession();
  const sts = await getAllSts();

  return <CollectionDetailsForm Sts={sts} />;
};

export default Index;
