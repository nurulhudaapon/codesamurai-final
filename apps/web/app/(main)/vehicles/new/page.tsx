import React from "react";
import { getServerAuthSession } from "@/utils/auth";
import NewVehicleEntry from "./form";
import { getAllSts } from "../../sts/server";
const now = new Date();

const Index = async () => {
  const session = await getServerAuthSession();
  const Sts = await getAllSts();
  return <NewVehicleEntry currentUserId={session.id} Sts={Sts} />;
};

export default Index;
