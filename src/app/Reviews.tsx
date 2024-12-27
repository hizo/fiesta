import { Review } from "@/components/Review";
import { Stats } from "@/components/Stats";
import { ContentSkeleton } from "@/components/ui/content-skeleton";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { useReviews } from "@/hooks/useReviews";
import { Entry, EntryUpdate } from "@/types";
import { useEffect, useRef, useState } from "react";
import { shuffle } from "es-toolkit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntry } from "@/api";
import { calculateNewStage } from "@/lib/utils";
import { useSession } from "@/hooks/useSession";

export const Reviews = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const { data: { count = 0, data } = {}, isPending } = useReviews();
  const [reviews, setReviews] = useState<Entry[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [reset, setReset] = useState(false);
  const lookup = useRef<Record<number, number>>({});

  useEffect(() => {
    setReviews(
      data
        ? data.reduce((acc, stage) => {
            acc = acc.concat(stage.data ?? []);
            return acc;
          }, [] as Entry[])
        : [],
    );
  }, [data]);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const { mutateAsync: progressEntry } = useMutation<
    unknown,
    unknown,
    EntryUpdate
  >({
    mutationFn: updateEntry,
  });

  const saveAnswer = (entry: Entry, correct: boolean, fix: boolean = false) => {
    const previousAnswerCount = lookup.current[entry.id] || 0;
    const answerPenalty = correct ? (fix ? -1 : 0) : 1;
    const newAnswerCount = previousAnswerCount + answerPenalty;
    const statsDelta = correct ? 1 : fix ? -1 : 0;

    setCorrectAnswers((correctAnswers) => correctAnswers + statsDelta);
    lookup.current = {
      ...lookup.current,
      [entry.id]: newAnswerCount,
    };
    if (correct) handleCorrectAnswer(entry);
  };

  const handleCorrectAnswer = (entry: Entry) =>
    progressEntry({
      id: entry.id,
      srs_stage: calculateNewStage(entry.srs_stage, lookup.current[entry.id]),
      updated_at: new Date().toISOString(),
      user_id: session?.user.id ?? "",
    });

  const handleNext = (correct: boolean) => {
    if (reviews.length === 1 && correct) {
      queryClient.setQueryData(["reviews"], () => []);
      setCorrectAnswers(0);
    }
    setReviews((reviews) => (correct ? reviews.slice(1) : shuffle(reviews)));
    setReset(true);
  };

  const entry = reviews[0];
  return isPending ? (
    <ContentSkeleton />
  ) : (
    <>
      <TypographyH1>Reviews</TypographyH1>
      <div className="mt-6">
        <Stats total={count} correct={correctAnswers} />
      </div>
      {reviews.length > 0 ? (
        <div className="mt-4">
          <Review
            entry={entry}
            reset={reset}
            onFormSubmit={saveAnswer}
            onNext={handleNext}
          />
        </div>
      ) : (
        <TypographyP className="mt-4">
          You don't have any pending reviews, try again later.
        </TypographyP>
      )}
    </>
  );
};
