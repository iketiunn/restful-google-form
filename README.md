## 📝 Restful Google Form

link: https://restful-google-form.vercel.app/

Turn your google form into restful api with ease.

#### Usage

Step1. Input your form id or url for paring the question parameters
Step2. Implement your own ui/logic with the form meta (you could test itwith curl example)

#### Pages

`[GET] /form/:formId`
Get the form meta for `:formId`

#### API

`[POST] /api/forms/:formId`
will only return text 200/400, just check it with the http status and the form meta

#### Supported Question type

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
