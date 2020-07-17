# Road map

- [x] Short answer
- [x] Paragraph
- [ ] Multiple choice
- [ ] Checkboxes
- [ ] Dropdown
- [ ] File upload
- [ ] Linear scale
- [ ] Multiple choice grid
- [ ] Checkbox grid
- [ ] Date
- [ ] Time

# How to

1. Create a google form https://docs.google.com/forms

2. Copy the form links like https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/viewform

3. Generated result like

```json
{
  "title": "form-collect",
  "endpoint": "https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/formResponse",
  "questions": [
    {
      "name": "name",
      "key": "entry.1858780561"
    },
    {
      "name": "content",
      "key": "entry.865870095"
    },
    {
      "name": "whatthefuck",
      "key": "entry.93735570"
    }
  ]
}
```

4. Implement your post form using these data like

```js
// Nodejs
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

// Browser with form post
<form action="https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/formResponse">
  name<input name="entry.1858780561"></input>
  content<input name="entry.865870095"></input>
  wth<input name="entry.93735570"></input>
  <button type="submit">Submit</button>
</form>;

// Browser with
```
