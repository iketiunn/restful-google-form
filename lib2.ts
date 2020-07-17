// @ts-nocheck
const fetch = require("isomorphic-fetch");
const qs = require("querystring");
fetch(
  "https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/formResponse",
  {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      "entry.1858780561": "ike-test",
      "entry.865870095": "content-yo",
      "entry.93735570": "idk",
    }),
  }
).then((res) => console.log(res.status));
