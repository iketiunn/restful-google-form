import React from "react";
import Layout from "../components/Layout";
import CodeBlock from "../components/CodeBlock";

const IndexPage = () => {
  return (
    <Layout>
      <h4>Usage</h4>
      <p>Enter your form link like:</p>
      <CodeBlock>
        https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/viewform
      </CodeBlock>
      <p>or form id for short:</p>
      <CodeBlock>
        1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA
      </CodeBlock>
      <p>
        You can create your own form{" "}
        <a href="https://docs.google.com/forms" target="_blank">
          here
        </a>
      </p>

      <h4>Supported question type:</h4>
      <p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <input readOnly type="checkbox" checked />
            <label>Short Answer</label>
          </li>
          <li>
            <input onClick={() => false} type="checkbox" checked />
            <label>Paragraph</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>Multiple choice</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>Checkboxes</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>Dropdown</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>File upload</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>Linear scale</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>Multiple choice grid</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>Checkbox grid</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked />
            <label>Date</label>
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} />
            <label>Time</label>
          </li>
        </ul>
      </p>
    </Layout>
  );
};

export default IndexPage;
