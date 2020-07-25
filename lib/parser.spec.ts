import test from "tape";
import { parseByType } from "./parser";
import { readFileSync } from "fs";
import { getLoadData } from "./";

test("Get meta from short answer", (t) => {
  const html = readFileSync("./test/test.html").toString();
  const loadData = getLoadData(html);
  const [name] = loadData.filter((data) => data.includes("name"));

  t.deepEqual(parseByType(name), [
    {
      name: "name",
      desc: "",
      required: true,
      key: "entry.1858780561",
      options: [],
    },
  ]);
  t.end();
});
test("Get meta from paragraph", (t) => {
  const html = readFileSync("./test/test.html").toString();
  const loadData = getLoadData(html);
  const [q] = loadData.filter((data) => data.includes("comment"));

  t.deepEqual(parseByType(q), [
    {
      name: "comment",
      desc: "",
      required: false,
      key: "entry.865870095",
      options: [],
    },
  ]);
  t.end();
});
test("Get meta from date", (t) => {
  const html = readFileSync("./test/test.html").toString();
  const loadData = getLoadData(html);
  const [q] = loadData.filter((data) => data.includes("date"));

  t.deepEqual(parseByType(q), [
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
  ]);
  t.end();
});
