import { BookCheck, BookText } from "lucide-react";
import { TypographyP } from "./ui/typography";

export const Stats = ({
  total,
  correct,
}: {
  total: number;
  correct: number;
}) => (
  <div className="flex w-[180px]">
    <TypographyP className="flex items-center gap-2 w-[50%]">
      <BookText />
      {total - correct}
    </TypographyP>

    <TypographyP className="flex items-center gap-2 w-[50%]">
      <BookCheck />
      {correct}
    </TypographyP>
  </div>
);
