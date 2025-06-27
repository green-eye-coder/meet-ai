import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronUpIcon,ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";
import { useIsMobile } from "@/hooks/use-mobile";


interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
  isSearchable?: boolean;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className = "",
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectOption = options.find((option) => option.value === value);
  const isMobile = useIsMobile();

  const handleOpenChange=(open:boolean)=>{
    onSearch?.("");
    setOpen(open);
  }

  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        className={cn(
          "h-9 justify-between font-normalpx-2",
          !selectOption && "text-muted-foreground",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <div className="">{selectOption?.children ?? placeholder}</div>
        
        {!isMobile ? (
          <ChevronsUpDownIcon className="size-4" />
        ) : (
          <ChevronUpIcon className="size-4" />
        )}
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput placeholder="search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found.
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
