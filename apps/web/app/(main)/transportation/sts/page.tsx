import { getServerAuthSession } from "@/utils/auth";
import Transportations from "../transportations";
import {
  getAllLandfills,
  getAllSts,
  getAllTransportationStats,
  getAllVehicles,
  getUsers,
  getAllContractors,
} from "../server";
import { Entity } from "@/types/prisma";

export default async function Index() {
  const session = await getServerAuthSession();
  const stss = await getAllSts();
  const landfills = await getAllLandfills();
  const vehicles = await getAllVehicles();
  const transportations = await getAllTransportationStats();
  const contractors_company = await getAllContractors();

  return (
    <Transportations
      currentUserId={session.id}
      transportations={transportations}
      stss={stss}
      landfills={landfills}
      vehicles={vehicles}
      contractors_company={
        contractors_company.data as unknown as Entity.contractor_company[]
      }
    />
  );
}
