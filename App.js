import React from "react";
import AppLoading from "expo-app-loading";
import { AppNavigatior } from "./src/navigations";

export default function App() {
  const [isAppReady, setAppReady] = React.useState(false);

  React.useEffect(() => {
    console.log("useEffect Called ===>");
    setTimeout(() => {
      setAppReady(true);
    }, 1000);
  }, []);

  return isAppReady ? (
    <AppNavigatior screen={isAppReady ? "Home" : "Register"} />
  ) : (
    <AppLoading />
  );
}
