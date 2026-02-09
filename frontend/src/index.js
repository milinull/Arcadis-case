import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/arcadis-case.scss";

import Case2Layout from "layouts/Case2.js";
import Case3Layout from "layouts/Case3.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/case2/*" element={<Case2Layout />} />
      <Route path="/case3/*" element={<Case3Layout />} />
      <Route path="*" element={<Navigate to="/case2/index" replace />} />
    </Routes>
  </BrowserRouter>,
);
