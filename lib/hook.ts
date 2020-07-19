import { useRouter } from "next/router";
import React from "react";
import { getId } from ".";

export function useRouteToFormMeta() {
  const router = useRouter();
  const [url, setUrl] = React.useState("");
  const routeToFormMeta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/forms/${getId(url)}`);
  };

  return {
    url,
    setUrl,
    routeToFormMeta,
  };
}
