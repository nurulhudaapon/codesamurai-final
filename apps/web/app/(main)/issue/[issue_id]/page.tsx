import { getServerAuthSession } from "@/utils/auth";
import { getUsers } from "../../users/server";
import NewStsMain from "./data";
const now = new Date();

const Index = async () => {
  const session = await getServerAuthSession();
  const users = await getUsers();

  return <NewStsMain currentUserId={session.id} managers={users} />;
};

export default Index;
