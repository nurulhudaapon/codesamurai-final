import { getServerAuthSession } from "@/utils/auth";
import {
  getAllLandfills,
  getAllTransportationStats,
  getLandByCreatedUser,
} from "../server";
import LandFill from "../landfill";

export default async function Index() {
  const session = await getServerAuthSession();
  const landfills = await getLandByCreatedUser(session.id || "");
  const transportations = await getAllTransportationStats();

  return (
    <LandFill
      currentUserId={session.id}
      landfills={landfills}
      transportations={transportations}
    />
  );
}
