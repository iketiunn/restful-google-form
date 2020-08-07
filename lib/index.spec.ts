import test from "tape";
import { getFormRestfulMeta } from "./index";
import { readFileSync } from "fs";

test("Get meta form html", (t) => {
  const expect = {
    title: "form-collect-simple-text",
    endpoint:
      "https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/formResponse",
    questions: [
      {
        name: "name",
        desc: "",
        required: true,
        key: "entry.1858780561",
        options: [],
      },
      {
        name: "comment",
        desc: "",
        required: false,
        key: "entry.865870095",
        options: [],
      },
      {
        name: "user-agent",
        desc: "",
        required: false,
        key: "entry.1651263044",
        options: [],
      },
      {
        name: "date_year",
        desc: "",
        required: false,
        key: "entry.1567916097_year",
        options: [],
      },
      {
        name: "date_month",
        desc: "",
        required: false,
        key: "entry.1567916097_month",
        options: [],
      },
      {
        name: "date_day",
        desc: "",
        required: false,
        key: "entry.1567916097_day",
        options: [],
      },
      {
        name: "time_hour",
        desc: "",
        required: false,
        key: "entry.12082434_hour",
        options: [],
      },
      {
        name: "time_minute",
        desc: "",
        required: false,
        key: "entry.12082434_minute",
        options: [],
      },
    ],
  };

  const html = readFileSync("./test/test.html").toString();
  const meta = getFormRestfulMeta(html);

  t.deepEqual(meta, expect);
  t.end();
});
