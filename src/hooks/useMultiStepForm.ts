import { ReactElement, useState } from "react";
export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((curr) => {
      if (curr >= steps.length - 1) return curr;
      return curr + 1;
    });
  }
  function back() {
    setCurrentStepIndex((curr) => {
      if (curr <= 0) return curr;
      return curr - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
