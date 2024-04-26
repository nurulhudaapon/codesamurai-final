import { AppLayout } from "@/layout/app";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
