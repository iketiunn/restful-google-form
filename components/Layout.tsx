import React, { ReactNode } from "react";
import Head from "next/head";
import { useRouteToFormMeta } from "../lib/hook";
import Link from "next/link";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Restful Google Form" }: Props) => {
  const { url, setUrl, routeToFormMeta } = useRouteToFormMeta();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <a style={{ color: "black", textDecoration: "none" }}>
              <h3 style={{ marginRight: "10px" }}>Google Form ❤️ Restful</h3>
            </a>
          </Link>
          <form onSubmit={routeToFormMeta}>
            <input
              value={url}
              placeholder="Form link or id"
              onChange={(e) => setUrl(e.currentTarget.value)}
            />
            <button> Get Form Meta </button>
          </form>
        </div>
      </header>
      <hr />
      <div style={{ width: "80%", margin: "0 auto" }}>{children}</div>
      <hr />
      <footer style={{ textAlign: "center" }}>
        <span>
          <a
            href="https://github.com/iketiunn/restful-google-form"
            target="_blank"
          >
            Github
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Layout;
