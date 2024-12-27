import { getEntries } from "@/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContentSkeleton } from "@/components/ui/content-skeleton";
import { TypographyH1 } from "@/components/ui/typography";
import { SRS_STAGE } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const { data: entries = [], isPending: isPending } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });

  const {
    [SRS_STAGE.APPRENTICE_1]: apprentice1 = [],
    [SRS_STAGE.APPRENTICE_2]: apprentice2 = [],
    [SRS_STAGE.APPRENTICE_3]: apprentice3 = [],
    [SRS_STAGE.APPRENTICE_4]: apprentice4 = [],
    [SRS_STAGE.GURU_1]: guru1 = [],
    [SRS_STAGE.GURU_2]: guru2 = [],
    [SRS_STAGE.MASTER]: master = [],
    [SRS_STAGE.ENLIGHTENED]: enlightened = [],
    [SRS_STAGE.BURNED]: burned = [],
  } = entries;

  const apprentice = [
    apprentice1,
    apprentice2,
    apprentice3,
    apprentice4,
  ].flat();
  const guru = [guru1, guru2].flat();

  return isPending ? (
    <ContentSkeleton />
  ) : (
    <>
      <TypographyH1>Overview</TypographyH1>
      <div className="mt-6 flex gap-2 flex-wrap">
        <Card className="min-w-[140px] bg-rose-300">
          <CardHeader>
            <CardTitle>Apprentice</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {apprentice.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-fuchsia-300">
          <CardHeader>
            <CardTitle>Guru</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {guru.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-sky-300">
          <CardHeader>
            <CardTitle>Master</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {master.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-green-300">
          <CardHeader>
            <CardTitle>Enlightened</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {enlightened.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-slate-300">
          <CardHeader>
            <CardTitle>Burned</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {burned.length}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};
