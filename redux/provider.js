"use client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import packageJson from "../package.json";
import { PersistGate } from "redux-persist/integration/react";
import CacheBuster from "react-cache-buster";

export function Providers({ children }) {
  const isProduction =
    process.env.NEXT_PUBLIC_SITE_URL === "https://aaa.be.inventam.com";

  return (
    <CacheBuster
      currentVersion={packageJson.version}
      isEnabled={isProduction}
      isVerboseMode={false}
      loadingComponent={<>loading...</>}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </CacheBuster>
  );
}
