import { getServerAuthSession } from "@/utils/auth";

const Index = async () => {
  const session = await getServerAuthSession();
  return <pre>{
    JSON.stringify(session)
  }</pre>;
};

export default Index;
