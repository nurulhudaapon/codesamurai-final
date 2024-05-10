import React, { FormEventHandler, useState } from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
// import { createSts } from "../server";
import { notify } from "@/components/toast";
import { getUsers } from "../../users/server";
import { getServerAuthSession } from "@/utils/auth";
import { NewWork } from "./form";
const now = new Date();

const Index = async () => {
  const session = await getServerAuthSession();
  const users = await getUsers();

  return <NewWork currentUserId={session.id} managers={users} />;
};

export default Index;
