import { AppProps } from "next/app";
import "./app.css";

// This default export is required in a new `pages/_app.js` file.
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default App;
