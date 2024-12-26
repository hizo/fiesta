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
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import {
  GalleryVerticalEnd,
  Home,
  LogOut,
  SquarePlus,
  Target,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useReviews } from "@/hooks/useReviews";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const client = useQueryClient();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  const { data: { data: { session } = {} } = {} } = useQuery<
    Awaited<ReturnType<typeof supabase.auth.getSession>>
  >({
    queryKey: ["auth"],
  });

  const handleLogout = () => {
    supabase.auth.signOut();
    client.invalidateQueries({
      queryKey: ["auth"],
    });
  };

  const { data, isPending } = useReviews();

  const items = [
    { path: "/", label: "Home", icon: <Home /> },
    { path: "/add", label: "Add entry", icon: <SquarePlus /> },
    {
      path: "/reviews",
      label: "Reviews",
      icon: <Target />,
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <div>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Fiesta</span>
            </div>
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
                  <NavLink
                    to={item.path}
                    onClick={() => isMobile && toggleSidebar()}
                  >
                    {({ isActive }) => (
                      <>
                        <SidebarMenuButton isActive={isActive}>
                          {item.icon}
                          <span>{item.label}</span>
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
          {/* <SidebarGroupLabel>{session?.user.email}</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <div>
                    <Avatar className="rounded-lg size-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="truncate font-semibold">
                        {session?.user.user_metadata.full_name}
                      </span>
                      <span className="truncate text-xs">
                        {session?.user.email}
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Log out</span>
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
