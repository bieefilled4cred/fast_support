import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get("fast_support-tok")?.value;

  if (encryptedToken) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
