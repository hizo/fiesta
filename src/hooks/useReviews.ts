import { getReviews } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useReviews = () => {
  const { data, isPending } = useQuery({
    queryKey: ["reviews"],
    staleTime: 60 * 60 * 1000, // 1 hour
    queryFn: getReviews,
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
