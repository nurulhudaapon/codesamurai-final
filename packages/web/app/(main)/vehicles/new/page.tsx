import React from "react";
import { getServerAuthSession } from "@/utils/auth";
import NewVehicleEntry from "./main-new";
const now = new Date();

const Index = async () => {
  const session = await getServerAuthSession();

  return <NewVehicleEntry currentUserId={session.id} />;
};

export default Index;
