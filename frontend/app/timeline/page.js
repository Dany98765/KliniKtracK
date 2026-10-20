import { auth } from "@/auth";
import TimelinePage from "@/components/pages/timeline/page";
import { ROUTES } from "@/routes";
import { redirect } from "next/navigation";

export default async function Timeline() {
  const session = await auth()
  if (!session?.user) {
    redirect(ROUTES.SIGNIN);
  }
  return (
    <div>
      <TimelinePage />
    </div>
  );
}
