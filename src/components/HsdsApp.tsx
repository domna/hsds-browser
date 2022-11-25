import "@h5web/app/dist/styles.css";
import { App, assertEnvVar, HsdsProvider } from "@h5web/app";

const URL = process.env.REACT_APP_HSDS_URL;
const USERNAME = process.env.REACT_APP_HSDS_USERNAME;
const PASSWORD = process.env.REACT_APP_HSDS_PASSWORD;

function HsdsApp({ filepath }: { filepath: string }) {
  assertEnvVar(URL, "REACT_APP_HSDS_URL");
  assertEnvVar(USERNAME, "REACT_APP_HSDS_USERNAME");
  assertEnvVar(PASSWORD, "REACT_APP_HSDS_PASSWORD");

  return (
    <HsdsProvider
      url={URL}
      username={USERNAME}
      password={PASSWORD}
      filepath={filepath}
    >
      <App />
    </HsdsProvider>
  );
}

export default HsdsApp;
