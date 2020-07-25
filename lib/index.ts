import fetch from "isomorphic-fetch";
import cheerio from "cheerio";
import { parseByType } from "./parser";

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
export function getProtocol(req: any) {
  if (req.connection.encrypted) {
    return "https";
  }
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (forwardedProto) {
    return forwardedProto.split(/\s*,\s*/)[0];
  }
  return "http";
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

export function getLoadData(html: string): any[] {
  const $ = cheerio.load(html);
  const script = $("script:not([src])")
    .toArray()
    .map((s) => $(s)[0].children[0].data)
    .filter((text) => (text ? text.includes("FB_PUBLIC_LOAD_DATA_") : ""))[0];
  if (!script) throw new Error("viewform Parse Failed!");
  const _arr = script
    .replace("var FB_PUBLIC_LOAD_DATA_ = ", "")
    .replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") // Remove trailing comma
    .replace(";", "");
  const arr = JSON.parse(_arr);
  const rawQuestions = arr[1][1];
  if (!Array.isArray(rawQuestions)) {
    throw new Error("Fail to parse script");
  }

  return rawQuestions.filter((q) => q);
}

export function getFormRestfulMeta(html: string): FormRestfulMeta {
  const $ = cheerio.load(html);
  // Endpoint
  const endpoint = $("form").attr("action");
  if (!endpoint) {
    throw new Error("endpoint Prase Failed!");
  }
  // Names
  const [title, ..._questionNames] = $('form div[role="heading"]')
    .toArray()
    .map((ele) =>
      $(ele)
        .text()
        .replace(/[\n|\s]/g, "")
    );
  // Keys
  const loadData = getLoadData(html);
  const questions: Question[] = [];
  loadData.forEach((q) => {
    questions.push(...parseByType(q));
  });

  return {
    title,
    endpoint,
    questions,
  };
}
