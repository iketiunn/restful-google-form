import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Restful Google Form" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav></nav>
    </header>
    {children}
    <footer style={{ textAlign: "center" }}>
      <hr />
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

export default Layout;
