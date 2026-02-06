import React from "react";
import { Container, Row, Col } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import PageVisitsTable from "components/PageVisitsTable.js";

const Index = (props) => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <PageVisitsTable />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
