import React from "react";
import { getServerAuthSession } from "@/utils/auth";
import NewVehicleEntry from "./main-new";
import { getUserByEmail, getStss } from "../server";

const Index = async () => {
  const session = await getServerAuthSession();
  const Sts = await getStss();
  const currentUser = await getUserByEmail(session.user.email);
  return (
    <NewVehicleEntry
      currentUserId={currentUser ? currentUser.id : session.id}
      Sts={Sts}
    />
  );
};

export default Index;
