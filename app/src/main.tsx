import React, { StrictMode } from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client"
import Root from './views/Root'

import "./styles/global.scss"
import "./misc/i18n"

const root = createRoot(
  document.getElementById("root")!
)

root.render(
  // <React.StrictMode>
  <Root />
  // </React.StrictMode>
)

