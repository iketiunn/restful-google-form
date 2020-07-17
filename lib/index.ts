import fetch from "isomorphic-fetch";
import cheerio from "cheerio";

export function getId(url: string) {
  return url.replace("https://docs.google.com/forms/d/e/", "").split("/")[0];
}
export function getFormEndpoint(id: string) {
  return `https://docs.google.com/forms/d/e/${id}/formResponse`;
}

export interface FormRestfulMeta {
  title: string;
  endpoint: string;
  questions: { name: string; key: string }[];
}
export async function getFormRestfulMeta(id: string): Promise<FormRestfulMeta> {
  const html = await fetch(
    `https://docs.google.com/forms/d/e/${id}/viewform`
  ).then((res) => res.text());

  const $ = cheerio.load(html);
  // Endpoint
  const endpoint = $("form").attr("action");
  if (!endpoint) {
    console.error(`https://docs.google.com/forms/d/e/${id}/viewform`);
    console.error(endpoint);
    throw new Error("endpoint Prase Failed!");
  }
  // Names
  const [title, ...questionNames] = $('form div[role="heading"]')
    .toArray()
    .map((ele) =>
      $(ele)
        .text()
        .replace(/[\n|\s]/g, "")
    );
  // Keys
  const script = $("script:not([src])")
    .toArray()
    .map((s) => $(s)[0].children[0].data)
    .filter((text) => text?.includes("FB_PUBLIC_LOAD_DATA_"))[0];
  if (!script) throw new Error("viewform Parse Failed!");
  const matchedQuestionKeys = script.replace(" ", "").match(/\[\[\d{2,},null/g);
  if (!matchedQuestionKeys) throw new Error("question keys Parse Failed!");
  const questionKeys = matchedQuestionKeys.map(
    (k) => "entry." + k.replace(/\D/g, "")
  );
  if (questionNames.length !== questionKeys.length) {
    throw new Error("Miss match with questions name and key!");
  }

  const questions = [];
  for (const key in questionNames) {
    const question = {
      name: questionNames[key],
      key: questionKeys[key],
    };
    questions.push(question);
  }

  return {
    title,
    endpoint,
    questions,
  };
}
