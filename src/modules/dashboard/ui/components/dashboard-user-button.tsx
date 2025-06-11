import { authClient } from "@/lib/auth-client";
// import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronUp, CreditCard, LogOutIcon, LucideSettings, SettingsIcon,UserCog  } from "lucide-react";
import { useRouter } from "next/navigation";
export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
const onLogout=()=>{
     authClient.signOut({
        fetchOptions:{
            onSuccess:()=>{
    router.push("/sign-in");

            }
        }
    })
}

  if (isPending || !data) {
    return "Loading...";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/20 p-3 w-full  flex items-center gap-2 justify-between bg-white/20 hover:bg-white/30 overflow-hidden">
        {data.user?.image ? (
          <Avatar>
            <AvatarImage
              src={data.user.image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}

        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <span className="text-[13px] font-medium text-fuchsia-50">
            {data.user.name}
          </span>
          <span className="text-[11px] text-fuchsia-100">
            {data.user.email}
          </span>
        </div>
        <ChevronUp className="text-fuchsia-100 size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        className="cursor-pointer flex items-center justify-between">
            Profile Settings
            <UserCog className="size-4"/>
        </DropdownMenuItem>
        
        
        <DropdownMenuItem
        className="cursor-pointer flex items-center justify-between">
            Billing
            <CreditCard className="size-4"/>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
         <DropdownMenuItem onClick={onLogout}
         className="cursor-pointer flex items-center justify-between">
            Logout
            <LogOutIcon className="size-4"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
