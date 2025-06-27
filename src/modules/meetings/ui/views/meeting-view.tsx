"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";

export const MeetingView = () => {
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ ...filters, page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No Meeting Found"
          description="Create Meeting to get started"
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState title="Loading Meetings" description="Wait for few seconds" />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong"
    />
  );
};
