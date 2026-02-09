import React from "react";
import { Container, Row, Col } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import UploadExcelComponent from "components/UploadExcel.js";

const Case3 = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <UploadExcelComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Case3;
