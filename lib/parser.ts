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
    case "time":
      return parserByTime(rawQuestion);
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

/**
 * Origin form was using format like "2:00 PM", will be transformed into 24 hour send as { 123_hour: 14, 123_minute: 00 }
 */
export function parserByTime(rawQuestion: any) {
  const base = {
    name: rawQuestion[1],
    desc: rawQuestion[2] || "",
    required: Boolean(rawQuestion[4][0][2]),
    key: "entry." + rawQuestion[4][0][0],
    options: [],
  };
  return [
    { ...base, name: base.name + "_hour", key: base.key + "_hour" },
    { ...base, name: base.name + "_minute", key: base.key + "_minute" },
  ];
}
