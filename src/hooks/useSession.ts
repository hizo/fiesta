import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const { data: { data: { session } = {} } = {} } = useQuery<
    Awaited<ReturnType<typeof supabase.auth.getSession>>
  >({
    queryKey: ["auth"],
  });
  return session;
};
