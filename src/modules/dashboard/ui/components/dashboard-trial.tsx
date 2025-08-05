import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constans";

export const DashboardTrial = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  if (!data) {
    return null;
  }
};
