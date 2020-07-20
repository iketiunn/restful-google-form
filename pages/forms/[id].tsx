import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { getFormRestfulMetaFromNet, FormRestfulMeta } from "../../lib";

interface Props {
  data: FormRestfulMeta | null;
  error: "";
}
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const formId = context.params?.id;
  const id = Array.isArray(formId) ? formId[0] : formId;
  let props: Props = {
    data: null,
    error: "",
  };
  if (id) {
    try {
      const data = await getFormRestfulMetaFromNet(id);
      // FIXME Hard code https for now
      data.endpoint =
        "https://" + context.req.headers.host + "/api/forms/" + id;
      // Assign fetched data
      props = {
        ...props,
        data,
      };
    } catch (error) {
      props = {
        ...props,
        error: error.message,
      };
    }
  }

  return {
    props,
  };
};

import { InferGetServerSidePropsType } from "next";
import CodeBlock from "../../components/CodeBlock";
function Forms({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (error) {
    return (
      <Layout>
        <h2>{error} :(</h2>
      </Layout>
    );
  }
  if (!data) {
    // Fail to parse somehow
    return (
      <Layout>
        <h2>Fail to parse :(</h2>
      </Layout>
    );
  }

  let examplePayload: { [key: string]: string } = {};
  data.questions.forEach((q) => {
    let val = "example " + q.name;
    if (q.name === "user-agent") {
      val = ":user-agent";
    }
    examplePayload[q.key] = val;
  });
  const example = `curl -X POST -H 'content-type: application/json' ${
    data.endpoint
  } -d '
  ${JSON.stringify(examplePayload)}'`;
  const meta = JSON.stringify(data, null, 2);

  return (
    <Layout>
      <h4>Form title: </h4>
      <p>{data.title}</p>

      <h4>Form meta:</h4>
      <CodeBlock copyButton>{meta}</CodeBlock>

      <h4>curl example:</h4>
      <CodeBlock copyButton>{example}</CodeBlock>

      <h4>util:</h4>
      <p>
        When you have a question named <strong>user-agent</strong>, you could
        either send your custom string or leave the value to{" "}
        <strong>:user-agent</strong> it will automatically fill for you if you
        POST it to restful-google-form
      </p>
    </Layout>
  );
}
export default Forms;
