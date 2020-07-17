const fetch = require("isomorphic-fetch");
const cheerio = require("cheerio");
// const { readFileSync } = require("fs");
// const html = readFileSync("./example.html");
// const $ = cheerio.load(html);

// @ts-ignore
fetch(
  "https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/viewform"
)
  .then((res) => res.text())
  .then((text) => {
    const $ = cheerio.load(text);
    // Endpoint
    const endpoint = $("form").attr("action");
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
      .filter((text) => text.includes("FB_PUBLIC_LOAD_DATA_"))[0];
    const matchedQuestionKeys = script
      .replace(" ", "")
      .match(/\[\[\d{2,},null/g);
    const questionKeys = matchedQuestionKeys.map(
      (k) => "entry." + k.replace(/\D/g, "")
    );

    if (questionNames.length !== questionKeys.length) {
      throw new Error("Miss match with questions name and key!");
    }

    // merge
    const result = {
      title,
      endpoint,
      questions: [],
    };
    for (const key in questionNames) {
      const question = {
        name: questionNames[key],
        key: questionKeys[key],
      };
      result.questions.push(question);
    }

    console.log(JSON.stringify(result, null, 2));
  })
  .catch(console.error);
