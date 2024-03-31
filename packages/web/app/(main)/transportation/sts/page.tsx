import { getServerAuthSession } from "@/utils/auth";
import Transportations from "../transportations";
import { getAllLandfills, getAllSts, getAllVehicles, getUsers } from "../server";
import { cubeClient } from "@/client";

export default async function Index() {
    const session = await getServerAuthSession();
    const stss = await getAllSts();
    const landfills = await getAllLandfills();
    const vehicles = await getAllVehicles();

    return (
        <Transportations
            currentUserId={session.id}
            stss={stss}
            landfills={landfills}
            vehicles={vehicles}
            user={"sts"}
        />
    )
}
