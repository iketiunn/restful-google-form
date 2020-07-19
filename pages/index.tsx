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

      <h4>Caution</h4>
      <p>
        ** Limited question type with <strong>Short answer</strong> and{" "}
        <strong>Paragraph</strong> for now **
      </p>
    </Layout>
  );
};

export default IndexPage;
