"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView = () => {
    const trpc = useTRPC();
    const {data}=useSuspenseQuery(trpc.meetings.getMany.queryOptions({

    }));
  return (
    <div className="flex flex-column p-4 gap-y-4">
      {JSON.stringify(data, null, 2)}
    </div>

  );
}

export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="Wait for few seconds" />
    )
}

export const MeetingsViewError = () => {
    return (
        <ErrorState title="Error Loading Meetings" description="Something went wrong" />
    )
}

