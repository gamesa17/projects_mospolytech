import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "@client/app";

import "antd/dist/antd.css";
import "@localization/localization.init";

render(
  // TODO: Add loader for pages
  // Disable, because we cant use translations here. And it will be replaced later
  // eslint-disable-next-line react/jsx-no-literals
  <React.Suspense fallback="Loading...">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Suspense>,
  document.querySelector("main#root")
);
