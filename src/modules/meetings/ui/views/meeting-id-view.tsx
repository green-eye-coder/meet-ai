"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
    meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }
    )
);
    return (
      <>
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-2xl font-bold">Meeting ID: {meetingId}</h1>
          {JSON.stringify(data, null, 2)}
        </div>
      </>
    );
}

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState title="Loading Agent" description="Wait for few seconds" />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something went wrong"
    />
  );
};
