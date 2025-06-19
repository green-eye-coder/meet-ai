"use client";
import { Button } from "@/components/ui/button";
import { Plus, XCircleIcon } from 'lucide-react';
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

export const AgentsListHeader = () => {
    const [filters,setFilters]=useAgentsFilters();
    const [isDialogOpen,setIsDialogOpen] = useState(false);

    const isAnyFilterModified=!!filters.search;
    const onClearFilters=()=>{
      setFilters({
        search: "",
        page:DEFAULT_PAGE,
      })
    }
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8  flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-x-2"
          >
            <Plus />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {
            isAnyFilterModified && (
              <Button variant={"outline"} size="sm" className="flex items-center gap-x-2" onClick={onClearFilters}>
                <XCircleIcon className="text-primary/80" />
                Clear
              </Button>
            )
          }
        </div>
      </div>
    </>
  );
}