/** Generate a test form using form meta */

import React from "react";
import { FormRestfulMeta } from "../lib";

interface Props {
  meta: FormRestfulMeta;
}
export default ({ meta }: Props) => {
  const [disable, setDisable] = React.useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    const body: { [k: string]: string } = {};
    new FormData(e.currentTarget).forEach((v, k) => {
      body[k] = v.toString();
    });
    fetch(meta.endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      console.log(res.status);
      setDisable(false);
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "80%",
          border: "thin solid silver",
          padding: "1rem",
          display: "flex",
          margin: "auto",
          flexDirection: "column",
        }}
      >
        <h5 style={{ margin: "auto" }}>{meta.title}</h5>
        {meta.questions.map((q) => {
          let val = "example value";
          if (q.name === "user-agent") val = ":user-agent";
          if (q.name.endsWith("_year")) val = String(new Date().getFullYear());
          if (q.name.endsWith("_month"))
            val = String(new Date().getMonth() + 1);
          if (q.name.endsWith("_day")) val = String(new Date().getDate());
          if (q.name.endsWith("_hour")) val = String(new Date().getHours());
          if (q.name.endsWith("_minute")) val = String(new Date().getMinutes());

          return (
            <div key={q.key}>
              <p style={{ textAlign: "center" }}>
                {q.name + (q.required ? "*" : "")}
              </p>
              <input
                style={{ display: "block", margin: "auto" }}
                defaultValue={val}
                required={q.required}
                name={q.key}
                id={q.name}
              />
            </div>
          );
        })}
        <button
          disabled={disable}
          style={{ width: "20%", margin: "auto", marginTop: "20px" }}
          type="submit"
        >
          send
        </button>
      </form>
    </>
  );
};
