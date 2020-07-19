import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { getFormRestfulMetaFromNet, FormRestfulMeta } from "../../lib";
export const getServerSideProps: GetServerSideProps<{
  data: FormRestfulMeta | null;
}> = async (context) => {
  const formId = context.params?.id;
  const id = Array.isArray(formId) ? formId[0] : formId;
  if (!id) {
    return {
      props: {
        data: null,
      },
    };
  } else {
    const data = await getFormRestfulMetaFromNet(id);
    // FIXME Hard code https for now
    data.endpoint = "https://" + context.req.headers.host + "/api/forms/" + id;
    return {
      props: {
        data,
      },
    };
  }
};

import { InferGetServerSidePropsType } from "next";
import CodeBlock from "../../components/CodeBlock";
function Forms({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!data) {
    // Fail to parse somehow
    return <h2>Fail to parse :(</h2>;
  }

  let examplePayload: { [key: string]: string } = {};
  data.questions.forEach((q) => {
    let val = "example " + q.name;
    if (q.name === "user-agent") {
      val = ":user-agent";
    }
    examplePayload[q.key] = val;
  });
  const example = `curl -X POST -H 'content-type: application/json' {data.endpoint} -d '
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
