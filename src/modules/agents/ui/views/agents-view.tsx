"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";


export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div className="flex-1 pb-4 px-4  md:px-8 flex flex-col gap-y-4">
            {/* {JSON.stringify(data, null, 2)} */}
            <DataTable columns={columns} data={data}/>
            {
                data.length===0 && (
                    <EmptyState
                    title="No Agents Created Yet"
                    description="Create your first agent to get started"/>
                )
            }

        </div>
    )
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState title="Loading Agents" description="Wait for few seconds" />
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState title="Error Loading Agents" description="Something went wrong" />
    )
}