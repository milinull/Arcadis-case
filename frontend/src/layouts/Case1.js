import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "reactstrap";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";

const Case1Layout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      // Filtra apenas as rotas que pertencem ao layout do case1
      if (prop.layout === "/case1") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/case1/index",
          imgSrc: require("../assets/img/brand/Arcadis-Color-Case-Study.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/case1/index" replace />} />
        </Routes>
        <Container fluid></Container>
      </div>
    </>
  );
};

export default Case1Layout;
