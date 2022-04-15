import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "@client/app";
import { store } from "@client/store";

import { Loader } from "@components/loader";

import "antd/dist/antd.css";
import "@localization/localization.init";

const rootElement = document.querySelector("main#root");

if (!rootElement) {
  throw Error("App root container was not found");
}

const root = createRoot(rootElement);

root.render(
  <React.Suspense fallback={<Loader />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Suspense>
);
