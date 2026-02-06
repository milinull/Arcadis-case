import { Container } from "reactstrap";

const Header = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-md-8"
        style={{
          background: "linear-gradient(87deg,#ea8e56 0, #e6722a 100%)",
        }}
      >
        <Container fluid>
          <div className="header-body"></div>
        </Container>
      </div>
    </>
  );
};

export default Header;
