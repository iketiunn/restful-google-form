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
import Link from "next/link";
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

  return (
    <Layout>
      <Link href="/">
        <a>Back</a>
      </Link>

      <h4> Form title: </h4>
      <p>{data.title}</p>
      <h4>
        Form endpoint:
        <pre>{data.endpoint}</pre>
      </h4>
      <h4> Questions: </h4>
      <ul>
        {data.questions.map((q) => (
          <li key={q.key}>
            {q.name}{" "}
            {q.required && <span style={{ color: "red" }}>required</span>}
            <ul>
              <li> key: {q.key} </li>
              {q.desc && <li> description: {q.desc} </li>}
            </ul>
          </li>
        ))}
      </ul>

      <h4>example:</h4>
      <div style={{ width: "100%" }}>
        <pre style={{ whiteSpace: "pre-line" }}>
          curl -X POST -H 'content-type: application/json' {data.endpoint} -d '
          {JSON.stringify(examplePayload)}'
        </pre>
      </div>

      <h4>util:</h4>
      <p>
        When you have a question named <strong>user-agent</strong>, you could
        either send your custom string or leave the value to{" "}
        <strong>:user-agent</strong> it will automatically filled if you POST it
        to restful-google-form
      </p>
    </Layout>
  );
}
export default Forms;
