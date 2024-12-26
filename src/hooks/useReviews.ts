import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { subHours, subDays, subWeeks, subMonths } from "date-fns";
import { useMemo } from "react";

export const useReviews = () => {
  const now = new Date();
  const apprentice1Date = subHours(now, 4).toISOString();
  const apprentice2Date = subHours(now, 8).toISOString();
  const apprentice3Date = subDays(now, 1).toISOString();
  const apprentice4Date = subDays(now, 2).toISOString();
  const guru1Date = subDays(now, 4).toISOString();
  const guru2Date = subWeeks(now, 2).toISOString();
  const masterDate = subMonths(now, 1).toISOString();
  const enlightenedDate = subMonths(now, 4).toISOString();

  const { data, isPending } = useQuery({
    queryKey: ["reviews"],
    staleTime: 60 * 60 * 1000, // 1 hour
    queryFn: () =>
      Promise.all([
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 1)
          .lt("updated_at", apprentice1Date),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 2)
          .lt("updated_at", apprentice2Date),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 3)
          .lt("updated_at", apprentice3Date),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 4)
          .lt("updated_at", apprentice4Date),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 5)
          .lt("updated_at", guru1Date),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 6)
          .lt("updated_at", guru2Date),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 7)
          .lt("updated_at", masterDate),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", 8)
          .lt("updated_at", enlightenedDate),
        supabase
          .from("entries")
          .select("*", { count: "exact" })
          .eq("srs_stage", -1),
      ]).then((results) =>
        results.map((res) => ({ data: res.data, count: res.count })),
      ),
  });

  return useMemo(
    () => ({
      data: isPending
        ? undefined
        : {
            count: data?.reduce((acc, stage) => acc + (stage.count ?? 0), 0),
            data,
          },
      isPending,
    }),
    [data, isPending],
  );
};
