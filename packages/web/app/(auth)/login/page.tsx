import Button from "@/components/button";
import Input from "@/components/input";
import { routes } from "@/routes";
import Link from "next/link";

const Index = () => {
  return (
    <div className="flex flex-col justify-center h-full gap-3">
      <p className="text-xl text-center mb-4">Login to EcoSync</p>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Link href={routes.auth.resetPassword.initiate()}>
        <p className="text-sm text-right">Forgot your password?</p>
      </Link>
      <Button to={routes.main.monitor()} className="w-full">
        Login
      </Button>
    </div>
  );
};

export default Index;
