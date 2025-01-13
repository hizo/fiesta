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

  return isPending ? (
    <ContentSkeleton />
  ) : (
    <>
      <TypographyH1>Overview</TypographyH1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:max-w-4xl">
        <Card className="min-w-[140px] bg-rose-300">
          <CardHeader>
            <CardTitle>Apprentice 1</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {apprentice1.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-rose-300">
          <CardHeader>
            <CardTitle>Apprentice 2</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {apprentice2.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-rose-300">
          <CardHeader>
            <CardTitle>Apprentice 3</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {apprentice3.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-rose-300">
          <CardHeader>
            <CardTitle>Apprentice 4</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {apprentice4.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-fuchsia-300">
          <CardHeader>
            <CardTitle>Guru 1</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {guru1.length}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-[140px] bg-fuchsia-300">
          <CardHeader>
            <CardTitle>Guru 2</CardTitle>
            <CardDescription className="font-semibold text-lg text-white">
              {guru2.length}
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
