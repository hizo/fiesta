import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useReviews } from "@/hooks/useReviews";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const client = useQueryClient();
  const handleLogout = () => {
    supabase.auth.signOut();
    client.invalidateQueries({
      queryKey: ["auth"],
    });
  };

  const { data, isPending } = useReviews();

  const items = [
    { path: "/", label: "Home" },
    { path: "/add", label: "Add entry" },
    {
      path: "/reviews",
      label: "Reviews",
      badge: isPending ? (
        <Skeleton
          className="animate-pulse size-6 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      ) : (
        <Badge>{data?.count}</Badge>
      ),
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Fiesta</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <NavLink to={item.path}>
                    {({ isActive }) => (
                      <>
                        <SidebarMenuButton isActive={isActive}>
                          {item.label}
                        </SidebarMenuButton>
                        {item.badge && (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        )}
                      </>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  Log out
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
