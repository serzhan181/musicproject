import { useState } from "react";

interface UseMultiStepFrom<T> {
  stepsCount: number;
  defaultState?: T;
}

export const useMultiStepFrom = <T,>({
  stepsCount,
  defaultState,
}: UseMultiStepFrom<T>) => {
  if (stepsCount < 2) {
    throw new Error(
      "You don't need multistep since stepsCount is " + stepsCount
    );
  }

  const [steps, setSteps] = useState(0);
  const [formState, setFormState] = useState<T | undefined>(defaultState);

  const nextPage = () => {
    if (steps > stepsCount) return;

    setSteps((steps) => steps++);
  };

  const prevPage = () => {
    if (steps <= 0) return;

    setSteps((steps) => steps--);
  };

  return {
    steps,
    formState,
    setFormState,
    nextPage,
    prevPage,
    hasNextPage: steps !== stepsCount,
    hasPrevPage: steps >= 0,
  };
};
