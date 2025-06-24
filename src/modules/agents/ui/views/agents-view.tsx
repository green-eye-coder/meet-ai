"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "@/components/data-table";


export const AgentsView = () => {
    const router=useRouter();
    const [filters,setFilters]= useAgentsFilters();    

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="flex-1 pb-4 px-4  md:px-8 flex flex-col gap-y-4">
            {/* {JSON.stringify(data, null, 2)} */}
            <DataTable columns={columns} data={data.items} onRowClick={(row)=>router.push(`/agents/${row.id}`)}/>
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page)=>setFilters({page})}
            />
            {
                data.items.length===0 && (
                    <EmptyState
                    title="No Agents Found"
                    description="Create your agent to get started"/>
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