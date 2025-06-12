import { CommandDialog, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

// Define the props for the DashboardCommand component
interface Props {
    open: boolean; // Controls whether the dialog is open
    setOpen: Dispatch<SetStateAction<boolean>>; // Function to update the open state
}

// DashboardCommand component displays a command dialog with a list of items
export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        // CommandDialog is the main dialog component, controlled by 'open' prop
        <CommandDialog open={open} onOpenChange={setOpen}>
            {/* Input field for searching meetings or agents */}
            <CommandInput
                placeholder="Find a meeting or agents"
            />
            {/* List of command items */}
            <CommandList>
                <CommandItem>
                    test 1
                </CommandItem>
                <CommandItem>
                    test 2
                </CommandItem>
                <CommandItem>
                    test 3
                </CommandItem>
            </CommandList>
        </CommandDialog>
    );
}