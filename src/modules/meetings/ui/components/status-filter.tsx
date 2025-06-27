import {
    CircleXIcon,
    CircleCheckIcon,
    ClockArrowUpIcon,
    LoaderIcon,
    VideoIcon
} from "lucide-react"
import { MeetingStatus } from "../../types"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { CommandSelect } from "@/components/command-select";


const options = [

  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon className="size-4 text-yellow-500" />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon className="size-4 text-blue-500" />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon className="size-4 text-green-500" />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon className="size-4 text-gray-500" />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon className="size-4 text-red-500" />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

export const StatusFilter = () =>{
    const [filters,setFilters]=useMeetingsFilters();

    return (
      <CommandSelect
        placeholder="Filter by status"
        className="h-9"
        options={options}
        onSelect={(value) => setFilters({ status: value as MeetingStatus })}
        value={filters.status ?? ""}
      />
    );
}