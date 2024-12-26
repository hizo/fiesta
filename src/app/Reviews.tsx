import { Review } from "@/components/Review";
import { Stats } from "@/components/Stats";
import { ContentSkeleton } from "@/components/ui/content-skeleton";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { useReviews } from "@/hooks/useReviews";
import { Entry } from "@/types";
import { useEffect, useState } from "react";
import { shuffle } from "es-toolkit";

export const Reviews = () => {
  const { data: { count, data } = {}, isPending } = useReviews();
  const [reviews, setReviews] = useState<Entry[]>([]);
  const [lookup, setLookup] = useState<Record<string, number>>({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [reset, setReset] = useState(false);

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

  const saveAnswer = (entry: Entry, correct: boolean, fix: boolean = false) => {
    const previousAnswerCount = lookup[entry.id] || 0;
    const answerPenalty = correct ? (fix ? -1 : 0) : 1;
    const newAnswerCount = previousAnswerCount + answerPenalty;
    const statsDelta = correct ? 1 : fix ? -1 : 0;

    setCorrectAnswers((correctAnswers) => correctAnswers + statsDelta);
    setLookup((lookup) => ({
      ...lookup,
      [entry.id]: newAnswerCount,
    }));
  };

  const shuffleReviews = () => setReviews(shuffle);

  const handleCorrectAnswer = (entry: Entry) => {
    // api.progress(entry, lookup[entry.id])
    setReviews((reviews) => reviews.slice(1));
  };

  const handleNext = (entry: Entry, correct: boolean) => {
    if (correct) {
      handleCorrectAnswer(entry);
    } else {
      shuffleReviews();
    }
    setReset(true);
  };

  const entry = reviews[0];
  return isPending ? (
    <ContentSkeleton />
  ) : (
    <>
      <TypographyH1>Reviews</TypographyH1>
      <div className="mt-6">
        <Stats total={count ?? 0} correct={correctAnswers} />
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
