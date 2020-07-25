export type QuestionType =
  | "shortAnswer"
  | "paragraph"
  | "multipleChoice"
  | "checkBoxes"
  | "dropdown"
  | "fileUpload"
  | "linearScale"
  | "multipleChoiceGrid"
  | "checkboxGrid"
  | "date"
  | "time";
export const QuestionTypes: QuestionType[] = [
  "shortAnswer",
  "paragraph",
  "multipleChoice",
  "dropdown", // Different sequence from form editor option
  "checkBoxes", // Different sequence from form editor option
  "fileUpload",
  "linearScale",
  "multipleChoiceGrid",
  "checkboxGrid",
  "date",
  "time",
];
