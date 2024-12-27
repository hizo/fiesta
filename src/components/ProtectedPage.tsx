import { Navigate, Outlet } from "react-router";
import { Progress } from "./ui/progress";
import { useSession } from "@/hooks/useSession";

export const ProtectedPage = () => {
  const { isPending, session } = useSession();

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
