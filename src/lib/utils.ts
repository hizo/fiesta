import { SRS_STAGE } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateNewStage = (
  currentStage: number,
  incorrectAnswers: number,
) => {
  const adjustedIncorrectCount = Math.ceil(incorrectAnswers / 2);
  const srsPenaltyFactor = currentStage >= SRS_STAGE.GURU_1 ? 2 : 1;
  const newStage =
    incorrectAnswers > 0
      ? Math.max(currentStage - adjustedIncorrectCount * srsPenaltyFactor, 1)
      : // burned or normal increment
        currentStage === SRS_STAGE.ENLIGHTENED
        ? -1
        : currentStage + 1;
  return newStage;
};
