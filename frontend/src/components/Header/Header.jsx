import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <Navbar
      expand="md"
      style={{
        background: "linear-gradient(90deg, #004080 0%, #0657a3 100%)",
        borderRadius: "0 0 1.5rem 1.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
      className="mb-4 py-3 px-2"
      variant="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: 800,
            letterSpacing: "2px",
            fontSize: "2rem",
            fontFamily: "Segoe UI, Arial, sans-serif",
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <i className="bi bi-envelope-fill me-2" style={{ fontSize: "2rem", color: "#ffe07a" }} />
          MailBox
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto fw-semibold" style={{ fontSize: "1.07rem" }}>
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              style={{
                color: "#ffe07a",
                transition: "color 0.2s",
              }}
            >
              <i className="bi bi-house-door me-1" /> Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className={location.pathname === "/products" ? "active" : ""}
              style={{
                color: "#f7fafc",
                transition: "color 0.2s",
              }}
            >
              <i className="bi bi-box-seam me-1" /> Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/aboutus"
              className={location.pathname === "/aboutus" ? "active" : ""}
              style={{
                color: "#f7fafc",
                transition: "color 0.2s",
              }}
            >
              <i className="bi bi-info-circle me-1" /> AboutUs
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
