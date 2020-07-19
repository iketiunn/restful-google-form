/** ref: http://web.simmons.edu/~grabiner/comm244/weekfour/code-test.html */

import React from "react";

interface Props {
  children: string;
  copyButton?: boolean;
}
export default ({ children, copyButton }: Props) => {
  const [btnText, setBtnText] = React.useState("Click to copy");
  const copy = () => {
    const hiddenInput = document.createElement("input");
    hiddenInput.value = children;
    document.body.append(hiddenInput);
    hiddenInput.select();
    document.execCommand("copy");
    hiddenInput.remove();
    // Show copied
    setBtnText("Copied");
    setTimeout(() => setBtnText("Click to copy"), 500);
  };
  return (
    <>
      <pre style={{ wordBreak: "break-all", whiteSpace: "normal" }}>
        <code
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#eee",
            border: "1px solid #999",
            display: "block",
            padding: "20px",
          }}
        >
          {children}
        </code>
      </pre>

      {copyButton && <button onClick={copy}>{btnText}</button>}
    </>
  );
};
