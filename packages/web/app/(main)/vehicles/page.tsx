import { getServerAuthSession } from "@/utils/auth";
import VehiclesPage from "./vehicle";

const IndexPage = async () => {
  const session = await getServerAuthSession();
  return <VehiclesPage currentUserId={session.id} />;
};

export default IndexPage;
