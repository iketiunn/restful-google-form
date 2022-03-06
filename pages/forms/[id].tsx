import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import {
  getFormRestfulMetaFromNet,
  FormRestfulMeta,
  getProtocol,
} from "../../lib";

interface Props {
  data: FormRestfulMeta | null;
  error: string;
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
      // FIXME Hack, maybe (property) IncomingMessage.connection: Socket should contains https types
      const protocol = getProtocol(context.req) + "://";
      data.endpoint = protocol + context.req.headers.host + "/api/forms/" + id;
      // Assign fetched data
      props = {
        ...props,
        data,
      };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : JSON.stringify(error)
      props = {
        ...props,
        error: errMsg
      };
    }
  }

  return {
    props,
  };
};

import { InferGetServerSidePropsType } from "next";
import CodeBlock from "../../components/CodeBlock";
import TestForm from "../../components/TestForm";
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
    if (q.name.endsWith("_year")) val = String(new Date().getFullYear());
    if (q.name.endsWith("_month"))
      val = String(new Date().getMonth() + 1);
    if (q.name.endsWith("_day")) val = String(new Date().getDate());
    if (q.name.endsWith("_hour")) val = String(new Date().getHours());
    if (q.name.endsWith("_minute")) val = String(new Date().getMinutes());

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

      <h4>
        html example
        <a
          href="https://github.com/iketiunn/restful-google-form/blob/master/components/TestForm.tsx"
          target="blank"
        >
          {" "}
          source
        </a>
      </h4>
      <TestForm meta={data} />

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
