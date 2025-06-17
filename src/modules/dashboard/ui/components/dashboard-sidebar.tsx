"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon,Crown  } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
import React from "react";
import Router from "next/router";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: Crown ,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathName = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground ">
        <Link
          href="/"
          className="flex item-center justify-center gap-3 px-6 pt-2"
        >
          <Image
            src="logo/logo_light.svg"
            height={120}
            width={130}
            alt="logo"
          />
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-30 text-[#8a6f6f]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} className="block">
                    <SidebarMenuButton
                      className={cn(
                        "h-11 hover:bg-linear-to-r/oklch border-transparent transition ease-linear hover:border-[#9e2a2b]/10 from-sidebar-accent/30 from-5% via-50% via-sidebar/30 to-sidebar/50",
                        pathName === item.href &&
                          "bg-linear-to-r/oklch border-[#9e2a2b]/10 from-sidebar-accent from-5% via-55% via-sidebar/30 to-sidebar/70"
                      )}
                      isActive={pathName === item.href}
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        {item.icon && (
                          <item.icon className="size-5 font-bold" />
                        )}
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <Separator className="opacity-50 text-[#8a6f6f]/30" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} className="block">
                    <SidebarMenuButton
                      className={cn(
                        "h-11 hover:bg-linear-to-r/oklch border-transparent transition ease-linear hover:border-[#9e2a2b]/10 from-sidebar-accent/30 from-5% via-50% via-sidebar/30 to-sidebar/50",
                        pathName === item.href &&
                          "bg-linear-to-r/oklch border-[#9e2a2b]/10 from-sidebar-accent from-5% via-55% via-sidebar/30 to-sidebar/70"
                      )}
                      isActive={pathName === item.href}
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        {item.icon && (
                          <item.icon className="size-5 font-bold" />
                        )}
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton></DashboardUserButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
