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

          return (
            <div key={q.key} style={{ margin: "auto" }}>
              <label>
                <p>{q.name + (q.required ? "*" : "")}</p>
                <input
                  defaultValue={val}
                  required={q.required}
                  name={q.key}
                  id={q.name}
                />
              </label>
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
