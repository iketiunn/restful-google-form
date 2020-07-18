import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { getId } from "../lib";

const IndexPage = () => {
  const router = useRouter();
  const [url, setUrl] = React.useState("");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/forms/${getId(url)}`);
  };
  return (
    <Layout>
      <h1>Google Form ❤️ Restful</h1>
      <p>Enter your form link like:</p>
      <pre>
        https://docs.google.com/forms/d/e/1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA/viewform
      </pre>
      <p>or</p>
      <pre>1FAIpQLSfVRcg4Oou6J05mOpmrwgdfdyfG15n4GkNFOwY3idLlRPYfGA</pre>
      <p>for short</p>

      <form onSubmit={submit}>
        <input value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
        <button> Send </button>
      </form>
    </Layout>
  );
};

export default IndexPage;
