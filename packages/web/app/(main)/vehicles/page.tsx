import { getServerAuthSession } from "@/utils/auth";
import VehiclesPage from "./vehicle";

export default async function IndexPage () {
  const session = await getServerAuthSession();
  return <VehiclesPage currentUserId={session.id} />;
};

