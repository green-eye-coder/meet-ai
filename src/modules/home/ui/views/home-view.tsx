"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

export const HomeView = () => {
  // const router = useRouter();
  // const { data: session } = authClient.useSession();

  // if (!session) {
  //   return <p>Loading...</p>;
  // }

  // return (
  //   <div className="flex flex-col p-4 gap-y-4">
  //     <p className="text-2xl font-bold">Welcome {session.user.name}</p>
  //     <Button
  //       className=" priary"
  //       onClick={async () => {
  //         await authClient.signOut();
  //         router.push("/sign-in");
  //       }}
  //     >
  //       Sign out
  //     </Button>
  //   </div>
  // );

  // 
    const trpc=useTRPC();
    const {data}=useQuery(trpc.hello.queryOptions({
      text:"i'm hru"
    }))

    return(
      <div className="flex flex-column p-4 gap-y-4">
        {data?.greeting}
      </div>
    )
};
