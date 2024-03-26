import { routes } from "@/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(routes.main.monitor());
}
