import { authClient } from "@/lib/auth-client";

// Import UI components for dropdown menu and drawer (mobile)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  ChevronUp,
  CreditCard,
  LogOutIcon,
  LucideSettings,
  SettingsIcon,
  UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

// DashboardUserButton component displays user info and menu actions
export const DashboardUserButton = () => {
  // Get user session data and loading state
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  // Logout handler: signs out and redirects to sign-in page
  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  // Show loading state if session is pending or missing
  if (isPending || !data) {
    return "Loading...";
  }

  // Render mobile drawer menu if on mobile
  if (isMobile) {
    return (
      <Drawer>
        {/* Button to open drawer */}
        <DrawerTrigger className="rounded-lg border border-border/20 p-3 w-full  flex items-center gap-2 justify-between bg-white/20 hover:bg-white/30 overflow-hidden">
          {/* Show user avatar or generated initials */}
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

          {/* User name and email */}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <span className="text-[13px] font-medium text-fuchsia-50">
              {data.user.name}
            </span>
            <span className="text-[11px] text-fuchsia-100">
              {data.user.email}
            </span>
          </div>
          <ChevronUp className="text-fuchsia-100 size-4" />
        </DrawerTrigger>
        {/* Drawer content with user actions */}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex flex-col gap-1">
              <span className="font-medium truncate">{data.user.name}</span>
              <span className="text-sm text-muted-foreground truncate">
                {data.user.email}
              </span>
            </DrawerTitle>
            <DrawerClose />
          </DrawerHeader>

          <div className="flex flex-col gap-2 p-4">
            {/* Profile settings button */}
            <button
              onClick={() => router.push("/dashboard/settings")}
              className="cursor-pointer flex items-center justify-between"
            >
              Profile Settings
              <UserCog className="size-4" />
            </button>

            {/* Billing button */}
            <button
              onClick={() => router.push("/dashboard/billing")}
              className="cursor-pointer flex items-center justify-between"
            >
              Billing
              <CreditCard className="size-4" />
            </button>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="cursor-pointer flex items-center justify-between hover:bg-red-500/10"
            >
              Logout
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Render desktop dropdown menu
  return (
    <DropdownMenu>
      {/* Button to open dropdown */}
      <DropdownMenuTrigger className="rounded-lg border border-border/20 p-3 w-full  flex items-center gap-2 justify-between bg-white/20 hover:bg-white/30 overflow-hidden">
        {/* Show user avatar or generated initials */}
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

        {/* User name and email */}
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
      {/* Dropdown content with user actions */}
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
        {/* Profile settings item */}
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Profile Settings
          <UserCog className="size-4" />
        </DropdownMenuItem>

        {/* Billing item */}
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCard className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Logout item */}
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
