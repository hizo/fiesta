import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContentSkeleton } from "@/components/ui/content-skeleton";
import { useReviews } from "@/hooks/useReviews";

export const Home = () => {
  const { data: { data } = {}, isPending } = useReviews();
  const apprenticeCount = data
    ?.slice(0, 4)
    .reduce((acc, stage) => acc + (stage.count ?? 0), 0);
  const guruCount = data
    ?.slice(4, 6)
    .reduce((acc, stage) => acc + (stage.count ?? 0), 0);
  const masterCount = data?.[6].count;
  const enlightenedCount = data?.[7].count;

  return isPending ? (
    <ContentSkeleton />
  ) : (
    <div className="flex gap-2 flex-wrap">
      <Card className="min-w-[140px] bg-rose-300">
        <CardHeader>
          <CardTitle>Apprentice</CardTitle>
          <CardDescription className="font-semibold text-lg text-white">
            {apprenticeCount}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="min-w-[140px] bg-fuchsia-300">
        <CardHeader>
          <CardTitle>Guru</CardTitle>
          <CardDescription className="font-semibold text-lg text-white">
            {guruCount}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="min-w-[140px] bg-sky-300">
        <CardHeader>
          <CardTitle>Master</CardTitle>
          <CardDescription className="font-semibold text-lg text-white">
            {masterCount}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="min-w-[140px] bg-green-300">
        <CardHeader>
          <CardTitle>Enlightened</CardTitle>
          <CardDescription className="font-semibold text-lg text-white">
            {enlightenedCount}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="min-w-[140px] bg-slate-300">
        <CardHeader>
          <CardTitle>Burned</CardTitle>
          <CardDescription className="font-semibold text-lg text-white">
            {0}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
