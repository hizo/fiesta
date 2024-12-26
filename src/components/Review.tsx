import { Entry } from "@/types";
import { useEffect, useState } from "react";
import { TypographyLarge } from "./ui/typography";
import { ReviewForm, ReviewFormProps } from "./ReviewForm";
import { Answer } from "./Answer";

export const Review = ({
  entry,
  onFormSubmit,
  onNext,
  reset,
}: {
  entry: Entry;
  reset: boolean;
  onFormSubmit: (entry: Entry, correct: boolean, fix?: boolean) => void;
  onNext: (entry: Entry, correct: boolean) => void;
}) => {
  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (reset) {
      setCorrect(false);
      setAnswer("");
    }
  }, [reset]);

  const handleFormSubmit: ReviewFormProps["onFormSubmit"] = (values) => {
    const correct = values.entry === entry.entry;
    setCorrect(correct);
    setAnswer(values.entry);
    onFormSubmit(entry, correct);
  };

  return (
    <>
      <TypographyLarge>{entry.meaning}</TypographyLarge>

      {!answer && <ReviewForm onFormSubmit={handleFormSubmit} />}

      {answer && (
        <Answer
          answer={answer}
          entry={entry}
          correct={correct}
          onNext={() => onNext(entry, correct)}
        />
      )}
    </>
  );
};
