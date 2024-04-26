import { getServerAuthSession } from "@/utils/auth";
import Transportations from "../transportations";
import {
  getAllLandfills,
  getAllSts,
  getAllTransportationStats,
  getAllVehicles,
  getUsers,
} from "../server";

export default async function Index() {
  const session = await getServerAuthSession();
  const stss = await getAllSts();
  const landfills = await getAllLandfills();
  const vehicles = await getAllVehicles();
  const transportations = await getAllTransportationStats();

  return (
    <Transportations
      currentUserId={session.id}
      transportations={transportations}
      stss={stss}
      landfills={landfills}
      vehicles={vehicles}
    />
  );
}