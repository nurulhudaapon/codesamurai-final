import { cubeClient } from "@/client";
import { getServerAuthSession } from "@/utils/auth";

const Index = async () => {
  const session = await getServerAuthSession();
  const response = await cubeClient.getTotalWaste();

  return <pre>{
    JSON.stringify(response, null, 2)
  }</pre>;
};

export default Index;
