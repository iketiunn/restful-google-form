import { QuestionTypes } from "./types";

export function parseType(rawQuestion: any) {
  const type = QuestionTypes[rawQuestion[3]];

  return type;
}

export function parseByType(rawQuestion: any) {
  // I only care about these now
  const type = parseType(rawQuestion);
  switch (type) {
    case "shortAnswer":
    case "paragraph":
      return parseByText(rawQuestion);
    case "date":
      return parseByDate(rawQuestion);
    default:
      return [];
  }
}

export function parseByText(rawQuestion: any) {
  return [
    {
      name: rawQuestion[1],
      desc: rawQuestion[2] || "",
      required: Boolean(rawQuestion[4][0][2]),
      key: "entry." + rawQuestion[4][0][0],
      options: [],
    },
  ];
}

export function parseByDate(rawQuestion: any) {
  const base = {
    name: rawQuestion[1],
    desc: rawQuestion[2] || "",
    required: Boolean(rawQuestion[4][0][2]),
    key: "entry." + rawQuestion[4][0][0],
    options: [],
  };
  return [
    { ...base, name: base.name + "_year", key: base.key + "_year" },
    { ...base, name: base.name + "_month", key: base.key + "_month" },
    { ...base, name: base.name + "_day", key: base.key + "_day" },
  ];
}
