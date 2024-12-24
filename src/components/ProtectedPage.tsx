import { supabase } from "@/lib/supabase";
import { Navigate, Outlet } from "react-router";
import { Progress } from "./ui/progress";
import { useQuery } from "@tanstack/react-query";

export const ProtectedPage = () => {
  const { data: { data: { session } = {} } = {}, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: () => supabase.auth.getSession(),
  });

  return isPending ? (
    <div className="flex h-full items-center justify-center">
      <Progress indeterminate className="w-[20em]" />
    </div>
  ) : session ? (
    <Outlet />
  ) : (
    <Navigate to="login" />
  );
};
