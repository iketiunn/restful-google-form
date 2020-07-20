## 📝 Restful Google Form

link: https://restful-google-form.vercel.app/

Turn your google form into restful api with ease.

#### Why

When you quick prototyping a form with Google Forms and you also want customizations with the form.

You can have the powers with:

- [x] Google Forms UI to edit your questions
- [x] Google Forms/Sheets to view your responses
- [x] Custom UI implement in your app

#### Usage

Enter your form link like:

```
https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/viewform
```

or form id for short:

```
1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA
```

You can create your own form [here](https://docs.google.com/forms)

#### Pages

`[GET] /form/:formId`
Get the form meta for `:formId`

#### API

`[POST] /api/forms/:formId`
will only return texted http status code, just check it with the http status and the form meta

#### Supported Question type

unchecked are not tested.

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
