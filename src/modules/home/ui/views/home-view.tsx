"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p className="text-2xl font-bold">Welcome {session.user.name}</p>
      <Button
        className=" priary"
        onClick={async () => {
          await authClient.signOut();
          router.push("/sign-in");
        }}
      >
        Sign out
      </Button>
    </div>
  );
};
