import test from "tape";
import { getFormRestfulMeta } from "./index";
import { readFileSync } from "fs";

test("Get text form meta", (t) => {
  const expect = {
    title: "form-collect-simple-text",
    endpoint:
      "https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/formResponse",
    questions: [
      {
        name: "必要的問題",
        desc: "dis_is_des",
        required: true,
        key: "entry.45991121",
      },
      {
        name: "name",
        desc: "",
        required: false,
        key: "entry.1858780561",
      },
      {
        name: "content",
        desc: "",
        required: false,
        key: "entry.865870095",
      },
    ],
  };

  const html = readFileSync("./test/text.html").toString();
  const meta = getFormRestfulMeta(html);

  t.deepEqual(meta, expect);
  t.end();
});
