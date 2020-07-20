import fetch from "isomorphic-fetch";
import cheerio from "cheerio";

export function getId(url: string) {
  return url.replace("https://docs.google.com/forms/d/e/", "").split("/")[0];
}
export function getFormEndpoint(id: string) {
  return `https://docs.google.com/forms/d/e/${id}/formResponse`;
}
/** util for inject user-agent */
export function getUserAgentInputKey(obj: { [k: string]: string }) {
  return Object.keys(obj).find((k) => obj[k] === ":user-agent");
}

interface Question {
  name: string;
  key: string;
  desc: string;
  required: boolean;
}
export interface FormRestfulMeta {
  title: string;
  endpoint: string;
  questions: Question[];
}

export async function getFormRestfulMetaFromNet(id: string) {
  const res = await fetch(`https://docs.google.com/forms/d/e/${id}/viewform`);
  if (res.status === 404) throw new Error(`Form: [${id}] not found!`);
  if (!res.ok) {
    throw new Error(`Fail to get form: [${id}]`);
  }
  const html = await res.text();

  return getFormRestfulMeta(html);
}
/**
 * TODO:
 *   - Get description
 */
export function getFormRestfulMeta(html: string): FormRestfulMeta {
  const $ = cheerio.load(html);
  // Endpoint
  const endpoint = $("form").attr("action");
  if (!endpoint) {
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
    .filter((text) => (text ? text.includes("FB_PUBLIC_LOAD_DATA_") : ""))[0];
  if (!script) throw new Error("viewform Parse Failed!");
  const arr = JSON.parse(
    script.replace("var FB_PUBLIC_LOAD_DATA_ = ", "").replace(";", "")
  );
  const rawQuestions = arr[1][1];
  if (!Array.isArray(rawQuestions)) {
    throw new Error("Fail to parse script");
  }
  const questions = rawQuestions.map((q) => {
    return {
      name: q[1],
      desc: q[2] || "",
      required: Boolean(q[4][0][2]), // It's simple text..
      key: "entry." + q[4][0][0], // It's simple text..
    };
  });
  if (questionNames.length !== questions.length) {
    throw new Error("Miss match with questions name and key!");
  }

  return {
    title,
    endpoint,
    questions,
  };
}
