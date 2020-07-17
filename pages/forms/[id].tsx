import { GetServerSideProps } from "next";
import { getFormRestfulMeta, FormRestfulMeta, getId } from "../../lib";
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
    const data = await getFormRestfulMeta(id);
    data.endpoint = context.req.headers.host + "/api/forms/" + id;
    return {
      props: {
        data,
      },
    };
  }
};

import { InferGetServerSidePropsType } from "next";
function Forms({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!data) {
    // Fail to parse somehow
    return <h2>Fail to parse :(</h2>;
  }

  let examplePayload: { [key: string]: string } = {};
  data.questions.forEach((q) => {
    examplePayload[q.key] = "example " + q.name;
  });

  return (
    <>
      <p> Form title: {data.title} </p>
      <p> Form endpoint: {data.endpoint} </p>
      <ul>
        {data.questions.map((q) => (
          <li key={q.key}>
            {q.name}: {q.key}
          </li>
        ))}
      </ul>

      <p>example:</p>
      <div style={{ width: "100%" }}>
        <pre style={{ whiteSpace: "pre-line" }}>
          curl -X POST -H 'content-type: application/json' {data.endpoint} -d '
          {JSON.stringify(examplePayload)}'
        </pre>
      </div>
    </>
  );

  /** Form api indicator */
  console.log(data);
  return <>{JSON.stringify(data, null, 2)}</>;
}
export default Forms;
