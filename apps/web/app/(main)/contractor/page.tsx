import { getServerAuthSession } from "@/utils/auth";
import { getAllSts } from "../sts/server";
import { ContractorForm } from "./form";

const Page = async () => {
  const session = await getServerAuthSession();
  const Sts = await getAllSts();
  return (
    <>
      <ContractorForm currentUserId={session.id} Sts={Sts} />
    </>
  );
};
export default Page;
