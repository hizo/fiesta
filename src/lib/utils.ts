import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateNewStage = (
  currentStage: number,
  incorrectAnswers: number,
) => {
  const srsPenaltyFactor = currentStage >= 5 ? 2 : 1;
  const newStage = Math.max(
    incorrectAnswers > 0
      ? currentStage - incorrectAnswers * srsPenaltyFactor
      : // burned or normal increment
        currentStage === 8
        ? -1
        : currentStage + 1,
    1,
  );
  return newStage;
};
