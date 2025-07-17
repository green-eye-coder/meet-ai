import { useState } from "react";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";

import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId })
  );
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = (data ?? []).filter((item) => {
    return item.text.toString().toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
      <p className="text-sm font-medium">Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-7 h-9 w-[240px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>
      <ScrollArea className="h-[400px] w-full">
        <div className="flex flex-col gap-y-4 pr-4">
          {filteredData.map((item) => {
            return (
              <div
                key={item.start_ts}
                className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border"
              >
                <div className="flex gap-x-2 items-center">
                  <Avatar className="size-6">
                    <AvatarImage
                      src={
                        item.user?.image ??
                        generateAvatarUri({
                          seed: item.user?.name ?? "",
                          variant: "initials",
                        })
                      }
                      alt="User Avatar"
                    />
                  </Avatar>

                  <p className="text-sm font-medium">{item.user.name} </p>
                  <p className="text-xs font-semibold text-primary/80">
                    {format(new Date(0, 0, 0, 0, 0, 0, item.start_ts), "mm:ss")}
                  </p>
                </div>
                <div className="ml-8">
                  <Highlighter
                    highlightClassName="bg-pink-100 text-pink-900 px-0.2"
                    searchWords={searchQuery ? [searchQuery] : []}
                    autoEscape={true}
                    textToHighlight={item.text}
                    className="text-sm text-gray-700 "
                  />
                 
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
