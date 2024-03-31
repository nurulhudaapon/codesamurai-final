import { getUserByEmail } from "../server";
import { getUsers } from "../../users/server";
import { getServerAuthSession } from "@/utils/auth";
import NewStsMain from "./main-new";

const Index = async () => {
  const session = await getServerAuthSession();
  const users = await getUsers();
  const currentUser = await getUserByEmail(session.user.email);

  return (
    <NewStsMain
      currentUserId={currentUser ? currentUser.id : session.id}
      managers={users}
    />
  );
};

export default Index;
