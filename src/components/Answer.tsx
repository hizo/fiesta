import { Check, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { TypographyLead, TypographyP } from "./ui/typography";
import { cn } from "@/lib/utils";
import { Entry } from "@/types";

export const Answer = ({
  answer,
  entry,
  correct,
  onNext,
  // onToggleCorrect,
}: {
  answer: string;
  entry: Entry;
  correct: boolean;
  onNext: () => void;
  // onToggleCorrect: () => void;
}) => {
  return (
    <div>
      <TypographyLead
        className={cn(
          "flex gap-2 items-center",
          correct && "text-green-600",
          !correct && "text-red-600",
        )}
      >
        {answer} {correct ? <Check /> : <X />}
      </TypographyLead>

      {!correct && (
        <>
          <TypographyP className="mt-2 font-medium">Correct:</TypographyP>
          <TypographyLead>{entry.entry}</TypographyLead>
        </>
      )}
      {entry.notes && (
        <>
          <TypographyP className="mt-2 font-medium">Notes:</TypographyP>
          <TypographyP>{entry.notes}</TypographyP>
        </>
      )}

      <div className="mt-4 flex gap-2">
        <Button autoFocus onClick={() => onNext()}>
          Next <ChevronRight />
        </Button>

        {/* <Button onClick={() => onToggleCorrect()}>
          Ignore answer <X />
        </Button> */}
      </div>
    </div>
  );
};
