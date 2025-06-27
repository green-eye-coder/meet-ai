"use client";
import { Button } from "@/components/ui/button";
import { Plus, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const isAnyFilterActive =!!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      search: "",
      status: null,
      agentId: "",
      page:DEFAULT_PAGE,
    });
  }

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8  flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className="flex items-center gap-x-2"
          >
            <Plus />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
        <div className="flex items-center gap-x-2 p-1">
          <MeetingsSearchFilter />
          <StatusFilter />
          <AgentIdFilter />
          {isAnyFilterActive && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              
            >
              <XCircleIcon className="size-4 text-red-500" />
              Clear
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};
