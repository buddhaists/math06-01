export enum Step {
  SELECT_BASE,
  LABEL_VALUE,
  CALCULATE,
  SUMMARY,
}

export interface Problem {
  id: number;
  text: string;
  unit: string;
  baseKey: string; 
  baseOptions: { [key: string]: string };
  baseCorrectFeedback: string;
  baseIncorrectFeedback: string;
  
  baseDescription: string;
  comparisonDescription: string;
  totalParts: number;
  comparisonParts: number;
  
  knownValue: number;

  calculationSteps: Array<{
    promptHTML: string;
    formulaPrefix: string;
    answer: string;
    correctFeedback: string;
  }>;

  summary: {
    title: string;
    stepsHTML: string[];
    finalAnswer: (val: string) => string;
  }
}
