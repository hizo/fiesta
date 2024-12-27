import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const { data: { data: { session } = {} } = {}, isPending } = useQuery<
    Awaited<ReturnType<typeof supabase.auth.getSession>>
  >({
    queryKey: ["auth"],
    queryFn: () => supabase.auth.getSession(),
  });

  return { session, isPending };
};
