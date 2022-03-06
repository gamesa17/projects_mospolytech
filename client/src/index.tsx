import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "@client/app";
import { Loader } from "@components/loader";
import { store } from "./store";

import "antd/dist/antd.css";
import "@localization/localization.init";

render(
  <React.Suspense fallback={<Loader />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Suspense>,
  document.querySelector("main#root")
);
